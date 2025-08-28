'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { sendEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'

const inviteAdminSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  invitedBy: z.string(), // User ID of the admin doing the inviting
})

export async function inviteAdmin(data: z.infer<typeof inviteAdminSchema>) {
  try {
    console.log('🚀 Starting admin invitation process for:', data.email)
    const validatedData = inviteAdminSchema.parse(data)

    // Verify the inviter is an admin using direct SQL
    console.log('🔍 Verifying inviter admin status...')
    const inviterResult = await sql`
      SELECT role FROM users 
      WHERE id = ${validatedData.invitedBy}
    `
    
    if (inviterResult.rows.length === 0 || inviterResult.rows[0].role !== 'ADMIN') {
      console.log('❌ Inviter not found or not admin:', { inviterId: validatedData.invitedBy, role: inviterResult.rows[0]?.role })
      return { success: false, error: 'Only admins can invite other admins' }
    }

    console.log('✅ Inviter verified as admin:', inviterResult.rows[0].role)

    // Check if user already exists using direct SQL
    console.log('🔍 Checking for existing user...')
    const existingUserResult = await sql`
      SELECT id FROM users 
      WHERE email = ${validatedData.email}
    `

    if (existingUserResult.rows.length > 0) {
      console.log('❌ User already exists:', validatedData.email)
      return { success: false, error: 'A user with this email already exists' }
    }

    console.log('✅ No existing user found, proceeding with creation')

    // Create admin user with temporary password using direct SQL
    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    console.log('🔑 Generated temporary password for:', validatedData.email)
    
    const hashedPassword = await bcrypt.hash(tempPassword, 12)
    console.log('🔐 Password hashed successfully')

    // Insert the new admin user
    console.log('👤 Creating admin user in database...')
    const insertUserResult = await sql`
      INSERT INTO users (email, hashed_password, role, created_at, updated_at)
      VALUES (${validatedData.email}, ${hashedPassword}, 'ADMIN', NOW(), NOW())
      RETURNING id
    `
    
    const adminUserId = insertUserResult.rows[0].id
    console.log('✅ Admin user created successfully:', adminUserId)

    // Insert the volunteer profile
    console.log('👤 Creating volunteer profile...')
    await sql`
      INSERT INTO volunteer_profiles (id, user_id, first_name, last_name, created_at, updated_at)
      VALUES (gen_random_uuid(), ${adminUserId}, ${validatedData.firstName}, ${validatedData.lastName}, NOW(), NOW())
    `
    console.log('✅ Volunteer profile created successfully')

    // Send invitation email with credentials
    console.log('📧 Sending invitation email...')
    const emailResult = await sendEmail({
      to: validatedData.email,
      subject: 'Admin Access Invitation - Hands of St. Luke Pantry',
      html: `
        <h2>Welcome to the Admin Team!</h2>
        <p>Hi ${validatedData.firstName},</p>
        <p>You've been invited to join the admin team for Hands of St. Luke Pantry's volunteer management system.</p>
        <p><strong>Your temporary login credentials:</strong></p>
        <p>Email: ${validatedData.email}<br>
        Password: ${tempPassword}</p>
        <p><strong>Important:</strong> Please change your password after your first login.</p>
        <p>You can now:</p>
        <ul>
          <li>Create and manage volunteer opportunities</li>
          <li>View detailed reports and analytics</li>
          <li>Manage volunteer profiles and permissions</li>
          <li>Invite other admin users</li>
        </ul>
        <p>Login at: <a href="${process.env.NEXT_PUBLIC_APP_URL}/login">${process.env.NEXT_PUBLIC_APP_URL}/login</a></p>
        <p>Best regards,<br>The Hands of St. Luke Team</p>
      `
    })

    if (emailResult.success) {
      console.log('✅ Invitation email sent successfully')
    } else {
      console.log('❌ Failed to send invitation email:', emailResult.error)
      // Still return success since user was created, but log the email failure
    }

    return { success: true, adminId: adminUserId }
  } catch (error) {
    console.error('❌ Admin invitation failed:', error)
    return { success: false, error: 'Failed to send admin invitation' }
  }
}

'use server'

import { z } from 'zod'
import { db as prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'

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

    // Verify the inviter is an admin
    const inviter = await prisma.user.findUnique({
      where: { id: validatedData.invitedBy },
      select: { role: true }
    })

    if (!inviter || inviter.role !== 'ADMIN') {
      console.log('❌ Inviter not found or not admin:', { inviterId: validatedData.invitedBy, role: inviter?.role })
      return { success: false, error: 'Only admins can invite other admins' }
    }

    console.log('✅ Inviter verified as admin:', inviter.role)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      console.log('❌ User already exists:', existingUser.email)
      return { success: false, error: 'A user with this email already exists' }
    }

    console.log('✅ No existing user found, proceeding with creation')

    // Create admin user with temporary password
    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    console.log('🔑 Generated temporary password for:', validatedData.email)
    
    const hashedPassword = await hash(tempPassword, 12)
    console.log('🔐 Password hashed successfully')

    const adminUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        hashedPassword,
        role: 'ADMIN',
        volunteerProfile: {
          create: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
          }
        }
      },
      include: {
        volunteerProfile: true
      }
    })

    console.log('✅ Admin user created successfully:', adminUser.id)

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

    return { success: true, adminId: adminUser.id }
  } catch (error) {
    console.error('❌ Admin invitation failed:', error)
    return { success: false, error: 'Failed to send admin invitation' }
  }
}

// Helper function to hash passwords
async function hash(password: string, rounds: number) {
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, rounds)
}

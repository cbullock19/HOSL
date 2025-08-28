'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
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

    // Create Supabase client with service role for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // First, let's inspect the actual table structure
    console.log('🔍 Inspecting table structure...')
    const { data: usersStructure, error: structureError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (structureError) {
      console.error('❌ Failed to read users table structure:', structureError)
      return { success: false, error: 'Failed to access database' }
    }

    console.log('📋 Users table structure:', Object.keys(usersStructure?.[0] || {}))
    console.log('📋 Sample user data:', usersStructure?.[0])

    // Verify the inviter is an admin using direct Supabase query
    console.log('🔍 Verifying inviter admin status...')
    const { data: inviter, error: inviterError } = await supabase
      .from('users')
      .select('*')
      .eq('id', validatedData.invitedBy)
      .single()
    
    if (inviterError || !inviter) {
      console.log('❌ Inviter not found:', { inviterId: validatedData.invitedBy, error: inviterError })
      return { success: false, error: 'Inviter not found' }
    }

    // Check what the role column is actually called
    const roleColumn = inviter.role !== undefined ? 'role' : 
                      inviter.role !== undefined ? 'role' : 
                      inviter.userRole !== undefined ? 'userRole' : 'role'
    
    if (inviter[roleColumn] !== 'ADMIN') {
      console.log('❌ Inviter is not admin:', { inviterId: validatedData.invitedBy, role: inviter[roleColumn] })
      return { success: false, error: 'Only admins can invite other admins' }
    }

    console.log('✅ Inviter verified as admin:', inviter[roleColumn])

    // Check if user already exists using direct Supabase query
    console.log('🔍 Checking for existing user...')
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', validatedData.email)
      .single()

    if (existingUser && !existingUserError) {
      console.log('❌ User already exists:', validatedData.email)
      return { success: false, error: 'A user with this email already exists' }
    }

    console.log('✅ No existing user found, proceeding with creation')

    // Create admin user with temporary password using direct Supabase insert
    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    console.log('🔑 Generated temporary password for:', validatedData.email)
    
    const hashedPassword = await bcrypt.hash(tempPassword, 12)
    console.log('🔐 Password hashed successfully')

    // Build the user data object dynamically based on what columns exist
    const userData: any = {
      email: validatedData.email,
      role: 'ADMIN'
    }

    // Add password column based on what exists
    if (usersStructure?.[0]?.hashedPassword !== undefined) {
      userData.hashedPassword = hashedPassword
    } else if (usersStructure?.[0]?.hashed_password !== undefined) {
      userData.hashed_password = hashedPassword
    } else if (usersStructure?.[0]?.password !== undefined) {
      userData.password = hashedPassword
    }

    console.log('👤 Creating admin user with data:', userData)
    const { data: adminUser, error: userInsertError } = await supabase
      .from('users')
      .insert(userData)
      .select('*')
      .single()

    if (userInsertError || !adminUser) {
      console.error('❌ Failed to create admin user:', userInsertError)
      return { success: false, error: 'Failed to create admin user' }
    }

    const adminUserId = adminUser.id
    console.log('✅ Admin user created successfully:', adminUserId)

    // Now let's check the volunteer_profiles table structure
    console.log('🔍 Inspecting volunteer_profiles table structure...')
    const { data: profilesStructure, error: profilesStructureError } = await supabase
      .from('volunteer_profiles')
      .select('*')
      .limit(1)
    
    if (profilesStructureError) {
      console.log('⚠️ Could not read volunteer_profiles structure:', profilesStructureError)
    } else {
      console.log('📋 Volunteer profiles table structure:', Object.keys(profilesStructure?.[0] || {}))
    }

    // Build the profile data object dynamically
    const profileData: any = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName
    }

    // Add user ID column based on what exists
    if (profilesStructure?.[0]?.userId !== undefined) {
      profileData.userId = adminUserId
    } else if (profilesStructure?.[0]?.user_id !== undefined) {
      profileData.user_id = adminUserId
    } else if (profilesStructure?.[0]?.id !== undefined) {
      profileData.id = adminUserId
    }

    // Insert the volunteer profile
    console.log('👤 Creating volunteer profile with data:', profileData)
    const { error: profileInsertError } = await supabase
      .from('volunteer_profiles')
      .insert(profileData)

    if (profileInsertError) {
      console.error('❌ Failed to create volunteer profile:', profileInsertError)
      // Still continue since the user was created
    } else {
      console.log('✅ Volunteer profile created successfully')
    }

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

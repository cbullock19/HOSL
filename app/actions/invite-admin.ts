'use server'

import { z } from 'zod'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'

const inviteAdminSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  invitedBy: z.string(), // User ID of the admin doing the inviting
})

export async function inviteAdmin(data: z.infer<typeof inviteAdminSchema>) {
  try {
    const validatedData = inviteAdminSchema.parse(data)

    // Verify the inviter is an admin
    const inviter = await prisma.user.findUnique({
      where: { id: validatedData.invitedBy },
      select: { role: true }
    })

    if (!inviter || inviter.role !== 'ADMIN') {
      return { success: false, error: 'Only admins can invite other admins' }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return { success: false, error: 'A user with this email already exists' }
    }

    // Create admin user with temporary password
    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedPassword = await hash(tempPassword, 12)

    const adminUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        hashedPassword,
        role: 'ADMIN',
        isActive: true,
      }
    })

    // Send invitation email with credentials
    await sendEmail({
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

    return { success: true, adminId: adminUser.id }
  } catch (error) {
    console.error('Admin invitation failed:', error)
    return { success: false, error: 'Failed to send admin invitation' }
  }
}

// Helper function to hash passwords
async function hash(password: string, rounds: number) {
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, rounds)
}

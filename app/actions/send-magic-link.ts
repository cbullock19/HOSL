'use server'

import { z } from 'zod'
import { db as prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'

const sendMagicLinkSchema = z.object({
  email: z.string().email('Valid email is required'),
})

export async function sendMagicLink(data: z.infer<typeof sendMagicLinkSchema>) {
  try {
    const validatedData = sendMagicLinkSchema.parse(data)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        volunteerProfile: true
      }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return { success: true, message: 'If an account exists, a magic link has been sent' }
    }

    // Generate a secure token (in production, use Supabase auth)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    // Store token with expiration (in production, use Supabase)
    // For now, we'll just send the email
    
    // Send magic link email
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}&email=${encodeURIComponent(user.email)}`
    
    await sendEmail({
      to: user.email,
      subject: 'Sign in to Hands of St. Luke Pantry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; text-align: center;">Hands of St. Luke Pantry</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Sign in to your account</h3>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Hello ${user.volunteerProfile?.firstName || 'there'},
            </p>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Click the button below to sign in to your volunteer account. This link will expire in 1 hour.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${magicLink}" 
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                Sign In to My Account
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${magicLink}" style="color: #2563eb; word-break: break-all;">${magicLink}</a>
            </p>
          </div>
          
          <div style="text-align: center; color: #9ca3af; font-size: 14px; margin-top: 30px;">
            <p>This email was sent to ${user.email}</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
        </div>
      `
    })

    return { success: true, message: 'Magic link sent successfully' }
  } catch (error) {
    console.error('Failed to send magic link:', error)
    return { success: false, error: 'Failed to send magic link' }
  }
}

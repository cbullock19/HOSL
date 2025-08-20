'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const sendMagicLinkSchema = z.object({
  email: z.string().email('Valid email is required'),
})

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function sendMagicLinkSupabase(data: z.infer<typeof sendMagicLinkSchema>) {
  try {
    const validatedData = sendMagicLinkSchema.parse(data)

    // Use Supabase Auth to send magic link
    const { data: authData, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: validatedData.email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      }
    })

    if (error) {
      console.error('Supabase auth error:', error)
      
      // Don't reveal if user exists or not for security
      return { success: true, message: 'If an account exists, a magic link has been sent' }
    }

    // The magic link is automatically sent by Supabase
    return { success: true, message: 'Magic link sent successfully' }
  } catch (error) {
    console.error('Failed to send magic link:', error)
    return { success: false, error: 'Failed to send magic link' }
  }
}

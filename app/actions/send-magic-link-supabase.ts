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

    // First, check if user exists in our database
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select('id, email')
      .eq('email', validatedData.email)
      .single()

    if (userError || !userData) {
      // User doesn't exist - don't send magic link
      // Return generic message for security (don't reveal if user exists)
      return { success: true, message: 'If an account exists, a magic link has been sent' }
    }

    // User exists, now send magic link via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: validatedData.email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      }
    })

    if (authError) {
      console.error('Supabase auth error:', authError)
      return { success: false, error: 'Failed to send magic link' }
    }

    // Magic link sent successfully
    return { success: true, message: 'Magic link sent successfully' }
  } catch (error) {
    console.error('Failed to send magic link:', error)
    return { success: false, error: 'Failed to send magic link' }
  }
}

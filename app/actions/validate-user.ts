'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const validateUserSchema = z.object({
  email: z.string().email('Valid email is required'),
})

// Create Supabase client with service role for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function validateUser(data: z.infer<typeof validateUserSchema>) {
  try {
    const validatedData = validateUserSchema.parse(data)

    // Check if user exists in Supabase Auth
    const { data: { users }, error } = await supabase.auth.admin.listUsers()
    
    if (error) {
      console.error('Error checking users:', error)
      // Don't reveal if user exists or not for security
      return { success: true, exists: false, message: 'If an account exists, a magic link has been sent' }
    }

    // Check if email exists in the users list
    const userExists = users?.some(user => user.email === validatedData.email)
    
    return { 
      success: true, 
      exists: userExists,
      message: userExists ? 'User found' : 'If an account exists, a magic link has been sent'
    }
  } catch (error) {
    console.error('User validation failed:', error)
    return { success: false, error: 'Failed to validate user' }
  }
}

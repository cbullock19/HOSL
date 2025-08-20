import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email is required' 
      }, { status: 400 })
    }
    
    console.log(`🔧 Syncing user: ${email}`)
    
    // First, check if user exists in our database
    let user = await db.user.findUnique({
      where: { email },
      include: {
        volunteerProfile: true
      }
    })
    
    if (!user) {
      console.log(`📝 User not found in database, creating...`)
      
      // Get user info from Supabase Auth
      const { data: { users }, error } = await supabase.auth.admin.listUsers()
      
      if (error) {
        console.error('Error fetching Supabase users:', error)
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to fetch user from Supabase' 
        }, { status: 500 })
      }
      
      const supabaseUser = users.find(u => u.email === email)
      
      if (!supabaseUser) {
        return NextResponse.json({ 
          success: false, 
          error: `No user found in Supabase Auth with email: ${email}` 
        }, { status: 404 })
      }
      
      // Extract user metadata
      const metadata = supabaseUser.user_metadata || {}
      const firstName = metadata.first_name || 'Unknown'
      const lastName = metadata.last_name || 'User'
      const phone = metadata.phone || null
      
      // Create user in our database
      user = await db.user.create({
        data: {
          id: supabaseUser.id, // Use Supabase user ID for consistency
          email,
          role: 'VOLUNTEER', // Default role
          volunteerProfile: {
            create: {
              firstName,
              lastName,
              phone,
            }
          }
        },
        include: {
          volunteerProfile: true
        }
      })
      
      console.log(`✅ Created user in database: ${user.email}`)
    } else {
      console.log(`✅ User already exists in database: ${user.email}`)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'User synced successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: `${user.volunteerProfile?.firstName} ${user.volunteerProfile?.lastName}`
      }
    })
    
  } catch (error) {
    console.error('❌ Failed to sync user:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to sync user. Please try again.' 
    }, { status: 500 })
  }
}

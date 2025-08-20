import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email is required' 
      }, { status: 400 })
    }
    
    console.log(`🔧 Attempting to upgrade user to admin: ${email}`)
    
    // Find the user
    const user = await db.user.findUnique({
      where: { email },
      include: {
        volunteerProfile: true
      }
    })
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: `No user found with email: ${email}` 
      }, { status: 404 })
    }
    
    if (user.role === 'ADMIN') {
      return NextResponse.json({ 
        success: true, 
        message: `User ${email} is already an admin!`,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: `${user.volunteerProfile?.firstName} ${user.volunteerProfile?.lastName}`
        }
      })
    }
    
    console.log(`👤 Found user: ${user.volunteerProfile?.firstName} ${user.volunteerProfile?.lastName}`)
    console.log(`📧 Email: ${user.email}`)
    console.log(`🔑 Current role: ${user.role}`)
    
    // Update the user to admin
    const updatedUser = await db.user.update({
      where: { email },
      data: { role: 'ADMIN' },
      include: {
        volunteerProfile: true
      }
    })
    
    console.log('✅ User upgraded to admin successfully!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'User upgraded to admin successfully!',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        name: `${updatedUser.volunteerProfile?.firstName} ${updatedUser.volunteerProfile?.lastName}`
      }
    })
    
  } catch (error) {
    console.error('❌ Failed to upgrade user to admin:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to upgrade user to admin. Please try again.' 
    }, { status: 500 })
  }
}

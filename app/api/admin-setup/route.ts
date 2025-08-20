import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, phone, invitedBy } = await request.json()
    
    // Validate required fields
    if (!email || !firstName || !lastName || !invitedBy) {
      return NextResponse.json({ 
        success: false, 
        error: 'All required fields must be provided' 
      }, { status: 400 })
    }

    // Verify the inviter is an admin
    const inviter = await db.user.findUnique({
      where: { id: invitedBy },
      select: { role: true }
    })

    if (!inviter || inviter.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false, 
        error: 'Only existing administrators can invite new admin users' 
      }, { status: 403 })
    }

    // Check if user with this email already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'A user with this email already exists' 
      }, { status: 400 })
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(tempPassword, 12)
    
    // Create admin user
    const adminUser = await db.user.create({
      data: {
        email,
        hashedPassword,
        role: 'ADMIN',
        volunteerProfile: {
          create: {
            firstName,
            lastName,
            phone: phone || null,
          }
        }
      },
      include: {
        volunteerProfile: true
      }
    })
    
    console.log('✅ Admin user invited:', adminUser.email)
    
    // TODO: Send invitation email with temporary credentials
    // For now, just return success with the temp password
    // In production, this should send an email
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin user invited successfully',
      userId: adminUser.id,
      tempPassword // Remove this in production - should be emailed
    })
    
  } catch (error) {
    console.error('❌ Admin setup failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create admin account. Please try again.' 
    }, { status: 500 })
  }
}

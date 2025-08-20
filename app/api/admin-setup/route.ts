import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone } = await request.json()
    
    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ 
        success: false, 
        error: 'All required fields must be provided' 
      }, { status: 400 })
    }

    // Check if any admin users already exist
    const existingAdmin = await db.user.findFirst({
      where: { role: 'ADMIN' }
    })
    
    if (existingAdmin) {
      return NextResponse.json({ 
        success: false, 
        error: 'Admin account already exists. Only one admin setup is allowed.' 
      }, { status: 400 })
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)
    
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
    
    console.log('✅ First admin account created:', adminUser.email)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin account created successfully',
      userId: adminUser.id 
    })
    
  } catch (error) {
    console.error('❌ Admin setup failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create admin account. Please try again.' 
    }, { status: 500 })
  }
}

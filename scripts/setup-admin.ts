import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function setupFirstAdmin() {
  try {
    console.log('🔧 Setting up first admin account...')
    
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email)
      return
    }
    
    // Create the first admin user
    const adminEmail = process.env.FIRST_ADMIN_EMAIL || 'admin@stlukelv.org'
    const adminPassword = process.env.FIRST_ADMIN_PASSWORD || 'Admin123!'
    
    console.log(`📧 Creating admin account for: ${adminEmail}`)
    
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        hashedPassword,
        role: 'ADMIN',
        volunteerProfile: {
          create: {
            firstName: 'Admin',
            lastName: 'User',
            phone: process.env.FIRST_ADMIN_PHONE || null,
          }
        }
      },
      include: {
        volunteerProfile: true
      }
    })
    
    console.log('✅ Admin account created successfully!')
    console.log(`👤 User ID: ${adminUser.id}`)
    console.log(`📧 Email: ${adminUser.email}`)
    console.log(`🔑 Password: ${adminPassword}`)
    console.log('⚠️  IMPORTANT: Change this password after first login!')
    
  } catch (error) {
    console.error('❌ Failed to create admin account:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the setup
setupFirstAdmin()

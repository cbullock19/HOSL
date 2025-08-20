import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function setupFirstAdmin() {
  try {
    console.log('🔧 Setting up first admin account...\n')
    
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email)
      console.log('You can now use the admin invitation system to add more admins.')
      return
    }
    
    console.log('No admin users found. Let\'s create the first one.\n')
    
    // Get admin details
    const email = await question('Enter admin email: ')
    const firstName = await question('Enter first name: ')
    const lastName = await question('Enter last name: ')
    const phone = await question('Enter phone number (optional, press Enter to skip): ')
    const password = await question('Enter admin password: ')
    
    if (!email || !firstName || !lastName || !password) {
      console.log('❌ All required fields must be provided')
      return
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      console.log('❌ A user with this email already exists')
      return
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create admin user
    const adminUser = await prisma.user.create({
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
    
    console.log('\n✅ First admin account created successfully!')
    console.log(`👤 User ID: ${adminUser.id}`)
    console.log(`📧 Email: ${adminUser.email}`)
    console.log(`👤 Name: ${adminUser.volunteerProfile?.firstName} ${adminUser.volunteerProfile?.lastName}`)
    console.log(`🔑 Password: ${password}`)
    console.log('\n🚀 You can now:')
    console.log('1. Sign in to the app with these credentials')
    console.log('2. Access admin features at /admin/tasks and /admin/reports')
    console.log('3. Invite additional admin users through the admin setup page')
    console.log('\n⚠️  IMPORTANT: Keep these credentials secure!')
    
  } catch (error) {
    console.error('❌ Failed to create admin account:', error)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

// Run the setup
setupFirstAdmin()

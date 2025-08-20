import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function upgradeToAdmin() {
  try {
    console.log('🔧 Upgrading user to admin status...\n')
    
    // The email you want to upgrade
    const email = 'bullockchristiaan13@gmail.com'
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        volunteerProfile: true
      }
    })
    
    if (!user) {
      console.log(`❌ No user found with email: ${email}`)
      console.log('Make sure you have signed up first!')
      return
    }
    
    if (user.role === 'ADMIN') {
      console.log(`✅ User ${email} is already an admin!`)
      return
    }
    
    console.log(`👤 Found user: ${user.volunteerProfile?.firstName} ${user.volunteerProfile?.lastName}`)
    console.log(`📧 Email: ${user.email}`)
    console.log(`🔑 Current role: ${user.role}`)
    
    // Update the user to admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
      include: {
        volunteerProfile: true
      }
    })
    
    console.log('\n✅ User upgraded to admin successfully!')
    console.log(`👤 User ID: ${updatedUser.id}`)
    console.log(`📧 Email: ${updatedUser.email}`)
    console.log(`🔑 New role: ${updatedUser.role}`)
    console.log(`👤 Name: ${updatedUser.volunteerProfile?.firstName} ${updatedUser.volunteerProfile?.lastName}`)
    
    console.log('\n🚀 You can now:')
    console.log('1. Sign out and sign back in to refresh your session')
    console.log('2. Access admin features at /admin/tasks and /admin/reports')
    console.log('3. See admin navigation in the menu')
    console.log('4. Invite additional admin users through the admin setup page')
    
  } catch (error) {
    console.error('❌ Failed to upgrade user to admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the upgrade
upgradeToAdmin()

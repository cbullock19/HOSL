import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function manageUserRole() {
  try {
    console.log('🔧 User Role Management Tool\n')
    
    // List all users
    const users = await prisma.user.findMany({
      include: {
        volunteerProfile: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    if (users.length === 0) {
      console.log('❌ No users found in database')
      return
    }
    
    console.log('📋 Current Users:')
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.role}) - ${user.volunteerProfile?.firstName} ${user.volunteerProfile?.lastName}`)
    })
    
    console.log('\n🎯 To change a user role:')
    console.log('1. Go to Supabase Dashboard > Database > Tables > users')
    console.log('2. Find your user row')
    console.log('3. Click "Edit" on the role column')
    console.log('4. Change from "VOLUNTEER" to "ADMIN"')
    console.log('5. Save the change')
    
    console.log('\n💡 Alternative: Use the web interface at /upgrade-admin')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the tool
manageUserRole()

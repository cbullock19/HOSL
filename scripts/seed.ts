import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean up existing data
  await prisma.auditLog.deleteMany()
  await prisma.foodLog.deleteMany()
  await prisma.signup.deleteMany()
  await prisma.task.deleteMany()
  await prisma.volunteerProfile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.source.deleteMany()
  await prisma.recipient.deleteMany()
  await prisma.announcement.deleteMany()

  console.log('🧹 Cleaned existing data')

  // Create sources
  const sources = await Promise.all([
    prisma.source.create({
      data: {
        name: 'ShopRite – Chester',
        address: '123 Main Street, Chester, NJ 07930',
        contact: 'John Smith, Store Manager',
        notes: 'Donates bread, produce, and canned goods weekly',
      },
    }),
    prisma.source.create({
      data: {
        name: 'Weis – Hackettstown',
        address: '456 Oak Avenue, Hackettstown, NJ 07840',
        contact: 'Sarah Johnson, Assistant Manager',
        notes: 'Donates dairy, meat, and frozen items',
      },
    }),
    prisma.source.create({
      data: {
        name: 'Stop & Shop – Mansfield',
        address: '789 Pine Street, Mansfield, NJ 07840',
        contact: 'Mike Davis, Store Director',
        notes: 'Donates packaged goods and household items',
      },
    }),
  ])

  console.log('🏪 Created sources')

  // Create recipients
  const recipients = await Promise.all([
    prisma.recipient.create({
      data: {
        name: 'Hands of St. Luke Pantry',
        address: '321 Elm Street, Long Valley, NJ 07853',
        contact: 'Pete Mahoney, Director',
        notes: 'Serves 200+ families monthly',
      },
    }),
    prisma.recipient.create({
      data: {
        name: 'Long Valley Community Assistance',
        address: '654 Maple Drive, Long Valley, NJ 07853',
        contact: 'Robert Brown, Coordinator',
        notes: 'Provides meals for 50+ families weekly',
      },
    }),
    prisma.recipient.create({
      data: {
        name: 'Mt. Olive Food Bank',
        address: '987 Cedar Lane, Mt. Olive, NJ 07828',
        contact: 'Mary Johnson, Program Coordinator',
        notes: 'Serves 75+ families monthly',
      },
    }),
  ])

  console.log('🏠 Created recipients')

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hosl.org',
      role: 'ADMIN',
    },
  })

  await prisma.volunteerProfile.create({
    data: {
      userId: adminUser.id,
      firstName: 'Pete',
      lastName: 'Mahoney',
      phone: '555-0100',
      smsOptIn: true,
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      vehicleCapacity: 'Large van',
      notes: 'Pantry Director',
    },
  })

  console.log('👑 Created admin user')

  // Create volunteer users
  const volunteers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'volunteer1@example.com',
        role: 'VOLUNTEER',
        volunteerProfile: {
          create: {
            firstName: 'Martha',
            lastName: 'G.',
            phone: '555-0101',
            smsOptIn: true,
            preferredDays: ['Tuesday', 'Thursday'],
            vehicleCapacity: 'SUV',
            notes: 'Available Tuesday and Thursday mornings',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'volunteer2@example.com',
        role: 'VOLUNTEER',
        volunteerProfile: {
          create: {
            firstName: 'Bill',
            lastName: 'S.',
            phone: '555-0102',
            smsOptIn: false,
            preferredDays: ['Tuesday', 'Thursday'],
            vehicleCapacity: 'Pickup truck',
            notes: 'Prefers heavy lifting tasks',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'volunteer3@example.com',
        role: 'VOLUNTEER',
        volunteerProfile: {
          create: {
            firstName: 'Alice',
            lastName: 'Johnson',
            phone: '555-0103',
            smsOptIn: true,
            preferredDays: ['Saturday', 'Sunday'],
            vehicleCapacity: 'Sedan',
            notes: 'Weekend volunteer',
          },
        },
      },
    }),
  ])

  console.log('👥 Created volunteer users')

  // Create tasks for the next two weeks
  const today = new Date()
  const tasks = []

  for (let week = 0; week < 2; week++) {
    for (let day = 0; day < 7; day++) {
      const taskDate = new Date(today)
      taskDate.setDate(today.getDate() + (week * 7) + day)

      // Skip past dates
      if (taskDate < today) continue

      const dayName = taskDate.toLocaleDateString('en-US', { weekday: 'long' })
      
      // Create pickup tasks
      if (['Tuesday', 'Thursday'].includes(dayName)) {
        tasks.push(
          prisma.task.create({
            data: {
              title: `Morning Food Pick up - ${dayName}`,
              date: taskDate,
              startTime: '08:30',
              endTime: '10:30',
              type: 'PICKUP',
              sourceId: sources[0].id, // ShopRite
              capacity: 2,
              status: 'OPEN',
              notes: `Weekly pick up from ${sources[0].name}`,
            },
          })
        )
      }

      // Create delivery tasks
      if (['Tuesday', 'Thursday'].includes(dayName)) {
        tasks.push(
          prisma.task.create({
            data: {
              title: `Food Delivery - ${dayName}`,
              date: taskDate,
              startTime: '11:00',
              endTime: '12:00',
              type: 'DELIVERY',
              recipientId: recipients[0].id, // Hands of St. Luke Pantry
              capacity: 1,
              status: 'OPEN',
              notes: `Deliver to ${recipients[0].name}`,
            },
          })
        )
      }

      // Create weekend tasks
      if (['Saturday', 'Sunday'].includes(dayName)) {
        tasks.push(
          prisma.task.create({
            data: {
              title: `Weekend Pick up - ${dayName}`,
              date: taskDate,
              startTime: '11:00',
              endTime: '12:00',
              type: 'PICKUP',
              sourceId: sources[1].id, // Weis
              capacity: 1,
              status: 'OPEN',
              notes: `Weekend pick up from ${sources[1].name}`,
            },
          })
        )
      }
    }
  }

  const createdTasks = await Promise.all(tasks)
  console.log('📅 Created tasks')

  // Create some signups
  const signups = []
  for (let i = 0; i < Math.min(5, createdTasks.length); i++) {
    const task = createdTasks[i]
    const volunteer = volunteers[i % volunteers.length]
    
    signups.push(
      prisma.signup.create({
        data: {
          taskId: task.id,
          userId: volunteer.id,
          status: 'CONFIRMED',
        },
      })
    )
  }

  await Promise.all(signups)
  console.log('✅ Created signups')

  // Create some food logs
  const foodLogs = []
  for (let i = 0; i < 3; i++) {
    const task = createdTasks[i]
    const volunteer = volunteers[i % volunteers.length]
    
    foodLogs.push(
      prisma.foodLog.create({
        data: {
          taskId: task.id,
          pounds: 45.5 + (i * 10),
          items: 'Bread, produce, canned goods',
          sourceId: task.sourceId || undefined,
          recipientId: task.recipientId || undefined,
          completedBy: volunteer.id,
        },
      })
    )
  }

  await Promise.all(foodLogs)
  console.log('📦 Created food logs')

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'SEED_DATA_CREATED',
      details: {
        sources: sources.length,
        recipients: recipients.length,
        users: volunteers.length + 1,
        tasks: createdTasks.length,
        signups: signups.length,
        foodLogs: foodLogs.length,
      },
    },
  })

  console.log('📝 Created audit logs')

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📋 Demo Account Details:')
  console.log('Admin: admin@hosl.org (Pete Mahoney)')
  console.log('Volunteer 1: volunteer1@example.com (Martha G.)')
  console.log('Volunteer 2: volunteer2@example.com (Bill S.)')
  console.log('Volunteer 3: volunteer3@example.com (Alice Johnson)')
  console.log('\n💡 Use these emails to test the application')
  console.log('🔐 You\'ll need to set up authentication to actually sign in')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

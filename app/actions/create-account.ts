'use server'

import { z } from 'zod'
import { db as prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

const createAccountSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  password: z.string().min(8),
})

export async function createAccount(data: z.infer<typeof createAccountSchema>) {
  try {
    const validatedData = createAccountSchema.parse(data)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' }
    }

    // Check if guest volunteer exists
    const guestVolunteer = await prisma.guestVolunteer.findFirst({
      where: { email: validatedData.email }
    })

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        hashedPassword,
        role: 'VOLUNTEER',
        volunteerProfile: {
          create: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            phone: validatedData.phone,
          }
        }
      },
      include: {
        volunteerProfile: true
      }
    })

    // If guest volunteer existed, migrate their signups to the new user
    if (guestVolunteer) {
      await prisma.signup.updateMany({
        where: { guestId: guestVolunteer.id },
        data: { 
          userId: user.id,
          guestId: null
        }
      })

      // Delete the guest volunteer record
      await prisma.guestVolunteer.delete({
        where: { id: guestVolunteer.id }
      })
    }

    return { success: true, userId: user.id }
  } catch (error) {
    console.error('Account creation failed:', error)
    return { success: false, error: 'Failed to create account' }
  }
}

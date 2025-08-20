'use server'

import { db } from '@/lib/db'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const quickSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  taskId: z.string().min(1, 'Valid task ID is required'),
})

export async function quickSignup(data: z.infer<typeof quickSignupSchema>) {
  try {
    // Validate input
    const validatedData = quickSignupSchema.parse(data)

    // Check if task exists and has available spots
    const task = await db.task.findUnique({
      where: { id: validatedData.taskId },
      include: {
        signups: {
          include: {
            guest: true,
            user: true,
          }
        },
      },
    })

    if (!task) {
      throw new Error('Task not found')
    }

    if (task.status !== 'OPEN') {
      throw new Error('Task is not available for signup')
    }

    const claimedSpots = task.signups.filter((s: any) => s.status !== 'CANCELLED').length
    if (claimedSpots >= task.capacity) {
      throw new Error('Task is full')
    }

    // Check if this person is already signed up (by email)
    const existingSignup = task.signups.find((s: any) => 
      s.guestId && s.guest?.email === validatedData.email || 
      s.userId && s.user?.email === validatedData.email
    )

    if (existingSignup) {
      throw new Error('You are already signed up for this task')
    }

    // Create or find guest volunteer
    let guestVolunteer = await db.guestVolunteer.findFirst({
      where: { email: validatedData.email }
    })

    if (!guestVolunteer) {
      guestVolunteer = await db.guestVolunteer.create({
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
        }
      })
    } else {
      // Update existing guest volunteer info
      await db.guestVolunteer.update({
        where: { id: guestVolunteer.id },
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
        }
      })
    }

    // Create the signup
    const signup = await db.signup.create({
      data: {
        taskId: validatedData.taskId,
        guestId: guestVolunteer.id,
        status: 'CONFIRMED',
      }
    })

    // Update task status if it's now full
    const newClaimedCount = claimedSpots + 1
    if (newClaimedCount >= task.capacity) {
      await db.task.update({
        where: { id: validatedData.taskId },
        data: { status: 'FILLED' }
      })
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'GUEST_SIGNUP',
        details: {
          taskId: validatedData.taskId,
          guestId: guestVolunteer.id,
          email: validatedData.email,
          taskTitle: task.title,
        }
      }
    })

    // Revalidate the opportunities page
    revalidatePath('/opportunities')

    return {
      success: true,
      signupId: signup.id,
      message: 'Successfully signed up for the task!'
    }

  } catch (error) {
    console.error('Quick signup error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Signup failed'
    }
  }
}

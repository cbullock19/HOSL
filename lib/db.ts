import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Connection pooling configuration for Vercel
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

export const db = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Add connection cleanup for Vercel
if (process.env.NODE_ENV === 'production') {
  // Graceful shutdown
  process.on('beforeExit', async () => {
    await db.$disconnect()
  })
}

// Export a function to get a fresh Prisma client for serverless environments
export const getPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production (Vercel), create a new client for each request to avoid prepared statement conflicts
    return new PrismaClient({
      log: ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
  }
  // In development, use the singleton
  return db
}

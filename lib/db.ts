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

// Export a function to get a completely isolated Prisma client for serverless environments
export const getPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production (Vercel), create a completely new client with unique connection string
    const uniqueId = Math.random().toString(36).substr(2, 9)
    const uniqueConnectionString = `${process.env.DATABASE_URL}?connection_limit=1&pool_timeout=20&connect_timeout=60&application_name=prisma_${uniqueId}`
    
    return new PrismaClient({
      log: ['error'],
      datasources: {
        db: {
          url: uniqueConnectionString,
        },
      },
    })
  }
  // In development, use the singleton
  return db
}

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
    const timestamp = Date.now()
    
    // Create a unique connection string to avoid prepared statement conflicts
    const baseUrl = process.env.DATABASE_URL || ''
    const separator = baseUrl.includes('?') ? '&' : '?'
    const uniqueConnectionString = `${baseUrl}${separator}application_name=prisma_${uniqueId}_${timestamp}&connection_limit=1&pool_timeout=20&connect_timeout=60`
    
    console.log(`🔗 Creating new Prisma client with unique connection: prisma_${uniqueId}_${timestamp}`)
    
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

// Alternative approach: Create a completely isolated client without connection pooling
export const createIsolatedPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    // Force new connection without any pooling
    const uniqueId = Math.random().toString(36).substr(2, 9)
    const timestamp = Date.now()
    
    console.log(`🔗 Creating isolated Prisma client: isolated_${uniqueId}_${timestamp}`)
    
    return new PrismaClient({
      log: ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
  }
  return db
}

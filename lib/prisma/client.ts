import { PrismaClient } from '@prisma/client';

// Global Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  errorFormat: 'pretty',
});

// Setup middleware for blockchain integration (only in development)
if (process.env.NODE_ENV === 'development') {
  try {
    const { setupPrismaMiddleware } = require('./middleware');
    setupPrismaMiddleware();
  } catch (error) {
    console.warn('Failed to setup Prisma middleware:', error);
  }
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

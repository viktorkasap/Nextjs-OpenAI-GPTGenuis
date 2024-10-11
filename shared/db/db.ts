import { PrismaClient } from '@prisma/client';

const prismaClientSingleTon = () => {
  return new PrismaClient();
};

type PrismaClientSignleton = ReturnType<typeof prismaClientSingleTon>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSignleton | undefined;
};

export const db = globalForPrisma.prisma ?? prismaClientSingleTon();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

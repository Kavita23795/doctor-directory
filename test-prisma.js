const { PrismaClient } = require('@prisma/client');

async function testPrisma() {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.doctor.count();
    console.log('Total doctors in database:', count);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Prisma error:', error);
  }
}

testPrisma();

import { PrismaClient } from '@prisma/client/default.js';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Trying to connect database with prisma...');
    await prisma.$connect();
    console.log('✅ Successfully connected to the database!');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('👋 Disconnected from the database');
  }
}

testConnection();

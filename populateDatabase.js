const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_BRANCHES = 3;
const NUM_SALES = 100;
const NUM_USERS = 20;

async function main() {
  console.log('Starting data population...');

  // Create branches
  console.log('Creating branches...');
  for (let i = 1; i <= NUM_BRANCHES; i++) {
    await prisma.branch.create({
      data: {
        name: `Branch ${i}`,
      },
    });
    console.log(`Branch ${i} created`);
  }

  // Create users
  console.log('Creating users...');
  for (let i = 1; i <= NUM_USERS; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        username: `user${i}`,
        password: await bcrypt.hash('password', 10),
        role: 'customer',
      },
    });
    console.log(`User ${i} created`);
  }

  const branches = await prisma.branch.findMany();
  const users = await prisma.user.findMany();

  // Create sales
  console.log('Creating sales...');
  for (let i = 0; i < NUM_SALES; i++) {
    const branch = branches[Math.floor(Math.random() * branches.length)];
    await prisma.sale.create({
      data: {
        branchId: branch.id,
        amount: parseFloat((Math.random() * 1000).toFixed(2)),
        date: faker.date.between('2023-01-01', '2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(`Sale ${i + 1} created for Branch ${branch.name}`);
  }

  console.log('Database has been populated with random data');
}

main()
  .catch((e) => {
    console.error('Error populating database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

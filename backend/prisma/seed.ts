import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Al Mamun Khan',
    email: 'almamun@gmail.com',
    password: 'Ma12345678',
    isAdmin: true,
  },
  {
    name: 'Khan Al Mamun',
    email: 'khanAl@gmail.com',
    password: 'Ka12345678',
    isAdmin: true,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

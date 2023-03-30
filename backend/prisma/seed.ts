import { Prisma, PrismaClient } from '@prisma/client';
import { generateHash } from '../src/user/user-services';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Al Mamun Khan',
    email: 'almamun@gmail.com',
    password: 'Ma12345678',
    isAdmin: true,
    profilePicture:
      'https://res.cloudinary.com/dubm2ec8s/image/upload/v1680208559/4_34_1_mtsfu3.png',
  },
  {
    name: 'Khan Al Mamun',
    email: 'khanAl@gmail.com',
    password: 'Ka12345678',
    isAdmin: true,
    profilePicture:
      'https://res.cloudinary.com/dubm2ec8s/image/upload/v1678741227/sample.jpg',
  },
  {
    name: 'Majharul Islam',
    email: 'majhar@gmail.com',
    password: 'Mj12345678',
    isAdmin: false,
    profilePicture:
      'https://res.cloudinary.com/dubm2ec8s/image/upload/v1678741227/sample.jpg',
  },
  {
    name: 'Shayan haider',
    email: 'shayan@gmail.com',
    password: 'Sa12345678',
    isAdmin: false,
    profilePicture:
      'https://res.cloudinary.com/dubm2ec8s/image/upload/v1678741227/sample.jpg',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: await generateHash(u.password),
        isAdmin: u.isAdmin,
      },
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

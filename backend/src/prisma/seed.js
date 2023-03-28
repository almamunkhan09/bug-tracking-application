"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userData = [
    {
        name: 'Al Mamun Khan',
        email: 'almamunkhan09@gmail.com',
        password: '12345678910',
        isAdmin: true,
        ownedTeam: {
            create: [
                {
                    name: 'Follow Prisma on Twitter',
                },
            ],
        },
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

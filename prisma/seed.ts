import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// upsert is check if email exists
	// if it does execute update obj it this case the update {} so it will do nothing
	// if it doent execute create obj
	const alice = await prisma.user.upsert({
		where: { email: 'alice@prisma.io' },

		update: {
			email: 'alice@prisma.io',
			name: 'Alice',
			birthDate: new Date('06-15-2007'),
			gender: 'female',
		},
		create: {
			email: 'alice@prisma.io',
			name: 'Alice',
			birthDate: new Date('06-15-2007'), // mm-dd-yyy
			gender: 'female',
		},
	});
	const bob = await prisma.user.upsert({
		where: { email: 'bob@prisma.io' },
		create: {
			email: 'bob@prisma.io',
			name: 'Bob',
			gender: 'male',
			birthDate: new Date('02-02-2000'),
		},
		update: {
			email: 'bob@prisma.io',
			name: 'Bob',
			gender: 'male',
			birthDate: new Date('02-02-2000'),
		},
	});

	console.log({ alice, bob });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

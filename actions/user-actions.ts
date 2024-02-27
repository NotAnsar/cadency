'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { SessionProvider } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserInfo(
	values: {
		email: string;
		name: string;
		gender: 'male' | 'female';
		dateBirth: Date;
	},
	email: string
) {
	const { dateBirth, gender, name } = values;
	try {
		await prisma.user.update({
			where: { email },
			data: { birthDate: dateBirth, name, gender },
		});
	} catch (error) {
		return { message: 'Database Error: Failed to Update User Information.' };
	}

	revalidatePath('/player/setting');
	redirect('/player/setting');
}

export async function getCurrentUserData() {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
		});
		return user;
	}
	return null;
}

export async function deleteUser() {
	try {
		const user = await getCurrentUser();
		if (!user?.email) {
			throw new Error();
		}

		await prisma.user.delete({
			where: { email: user.email },
		});
		return { message: 'Done' };
	} catch (error) {
		console.log(error);

		return { message: 'Database Error: Failed to Delete User Information.' };
	}
}

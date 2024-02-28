'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters long.' })
		.max(30, { message: 'Name must be no longer than 30 characters.' }),
});

// This is temporary until @types/react-dom is updated
export type State = {
	errors?: { name?: string[] };
	message?: string | null;
};

export async function updateUser(
	email: string,
	prevState: State,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		};
	}

	const { name } = validatedFields.data;

	try {
		await prisma.user.update({
			where: { email },
			data: { name },
		});
	} catch (error) {
		return { message: 'Database Error: Failed to Update User Information.' };
	}

	revalidatePath('/player/setting');
	redirect('/player/setting');
}

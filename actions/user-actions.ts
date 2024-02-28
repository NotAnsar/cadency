'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { S3 } from '@aws-sdk/client-s3';
import { toast } from '@/components/ui/use-toast';

const s3 = new S3({
	region: 'eu-west-3',
});

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
	console.log('session', session);

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: {
				id: true,
				image: true,
				name: true,
				gender: true,
				email: true,
				birthDate: true,
				likedAlbums: true,
				followedArtists: true,
			},
		});
		console.log(user);

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

// export async function updateProfileImage(file: File) {
// 	try {
// 		const user = await getCurrentUser();
// 		if (!user?.email) {
// 			throw new Error();
// 		}

// 		const image = await uploadImage(file);
// 		console.log(image);

// 		await prisma.user.update({
// 			where: { email: user.email },
// 			data: { image },
// 		});
// 	} catch (error) {
// 		return { message: 'Database Error: Failed to Delete User Information.' };
// 	}
// }

export async function updateProfileImage(formData: FormData) {
	const file = formData.get('image') as File;

	try {
		const user = await getCurrentUser();
		if (!user?.email) {
			throw new Error();
		}

		const image = await uploadImage(file);

		await prisma.user.update({
			where: { email: user.email },
			data: { image },
		});
	} catch (error) {
		console.log(error);
		return { message: 'Database Error: Failed to Update User Picture.' };
	}

	revalidatePath('/player/profile');
	redirect('/player/profile');
}

async function uploadImage(file: File) {
	const extension = file.name.split('.').pop();
	const name = file.name.split('.')[0];
	const arrayBuffer = await file.arrayBuffer();

	const fileName = `${name}${Math.random() * 1000}.${extension}`;

	s3.putObject({
		Bucket: 'cadency',
		Key: fileName,
		Body: Buffer.from(arrayBuffer),
		ContentType: file.type,
	});

	return `https://cadency.s3.eu-west-3.amazonaws.com/${fileName}`;
}

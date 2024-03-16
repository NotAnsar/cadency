'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { S3 } from '@aws-sdk/client-s3';

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

export async function deleteUser() {
	try {
		const user = await getCurrentUser();
		if (!user?.id) throw new Error('Unauthorized');

		await prisma.user.delete({ where: { id: user.id } });
		return { message: 'Done' };
	} catch (error) {
		console.error(error);

		return { message: 'Database Error: Failed to Delete User Information.' };
	}
}

export async function updateProfileImage(formData: FormData) {
	const file = formData.get('image') as File;

	try {
		const user = await getCurrentUser();
		if (!user?.id) throw new Error('Unauthorized');

		const image = await uploadImage(file);

		await prisma.user.update({
			where: { id: user.id },
			data: { image },
		});
	} catch (error) {
		console.error(error);
		return { message: 'Database Error: Failed to Update User Picture.' };
	}

	revalidatePath('/player/profile');
	redirect('/player/profile');
}

export async function uploadImage(file: File) {
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

export async function toggleFollow(formData: FormData) {
	const artistId = formData.get('artistId') as string;

	try {
		if (!+artistId) {
			throw new Error('Data Error');
		}

		const user = await getCurrentUser();

		if (!user || !user.id) throw new Error('Unauthorized');

		const isFollwed = await prisma.artist.findFirst({
			where: { userId: user.id, artistId: +artistId },
		});

		if (isFollwed) {
			await prisma.artist.delete({
				where: {
					artistId_userId: { userId: user.id, artistId: +artistId },
				},
			});
		} else {
			await prisma.artist.create({
				data: {
					artistId: +artistId,
					userId: user.id,
				},
			});
		}
	} catch (error) {
		console.error('error', error);
	}
	revalidatePath(`/player/artist/${artistId}`);
	revalidatePath(`/player/library`, 'layout');
}

export async function togglelikedAlbum(formData: FormData) {
	const albumId = formData.get('albumId') as string;
	try {
		if (!+albumId) {
			throw new Error('Data Error');
		}

		const user = await getCurrentUser();

		if (!user || !user.id) {
			throw new Error('Unauthorized');
		}

		const isLiked = await prisma.album.findFirst({
			where: { userId: user.id, albumId: +albumId },
		});

		if (isLiked) {
			await prisma.album.delete({
				where: {
					albumId_userId: { userId: user.id, albumId: +albumId },
				},
			});
		} else {
			await prisma.album.create({
				data: { albumId: +albumId, userId: user.id },
			});
		}
	} catch (error) {
		console.error(error);
	}
	revalidatePath(`/player/album/${albumId}`);
	revalidatePath(`/player/library`, 'layout');
}

export async function togglelikedTrack(formData: FormData) {
	const trackId = formData.get('trackId') as string;
	try {
		if (!trackId) throw new Error('Data Error');

		const user = await getCurrentUser();

		if (!user || !user.id) throw new Error('Unauthorized');

		const isLiked = await prisma.track.findFirst({
			where: { userId: user.id, trackId },
		});

		if (isLiked) {
			await prisma.track.delete({
				where: { trackId_userId: { userId: user.id, trackId } },
			});
		} else {
			await prisma.track.create({ data: { trackId, userId: user.id } });
		}
		console.log(isLiked, trackId);
	} catch (error) {
		console.error(error);
	}
	console.log('revalidatePath');
	revalidatePath(`/player`, 'layout');
}

export async function getUserLikedTracks(limit?: number) {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: { likedtracks: limit ? { take: limit } : true },
		});

		return user?.likedtracks;
	}

	return null;
}

'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function toggleFollow(formData: FormData) {
	const artistId = formData.get('artistId') as string;

	try {
		if (!+artistId) {
			throw new Error('Data Error');
		}

		const usersession = await getCurrentUser();

		if (!usersession || !usersession.id) {
			throw new Error('Unauthorized');
		}

		const user = await prisma.user.findUnique({
			where: { id: usersession?.id },
			include: { followedArtists: true },
		});

		if (!user) {
			throw new Error('User Not Found');
		}

		const isFollwed = user.followedArtists.some(
			(artist) => artist.artistId === +artistId
		);

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
}
export async function togglelikedAlbum(formData: FormData) {
	const albumId = formData.get('albumId') as string;
	try {
		const usersession = await getCurrentUser();

		if (!usersession || !usersession.id) {
			throw new Error('Unauthorized');
		}

		const user = await prisma.user.findUnique({
			where: { id: usersession?.id },
			include: { likedAlbums: true },
		});

		if (!user) {
			throw new Error('User Not Found');
		}

		const isLiked = user.likedAlbums.some(
			(album) => album.albumId === +albumId
		);

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
}

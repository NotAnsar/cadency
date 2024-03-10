'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { S3 } from '@aws-sdk/client-s3';
import {
	getUserFollowedArtists,
	getUserLikedAlbums,
	getUserLikedTracks,
} from '@/lib/db/user';

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
		if (!user?.email) {
			throw new Error();
		}

		await prisma.user.delete({
			where: { email: user.email },
		});
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
		if (!user?.email) {
			throw new Error();
		}

		const image = await uploadImage(file);

		await prisma.user.update({
			where: { email: user.email },
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

		if (!user || !user.id) {
			throw new Error('Unauthorized');
		}

		const followedArtists = await getUserFollowedArtists();

		if (!followedArtists) {
			throw new Error('Followed Artists Not Found');
		}

		const isFollwed = followedArtists.some(
			(artist: { userId: string; artistId: number }) =>
				artist.artistId === +artistId
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
		if (!+albumId) {
			throw new Error('Data Error');
		}

		const user = await getCurrentUser();

		if (!user || !user.id) {
			throw new Error('Unauthorized');
		}

		const likedAlbums = await getUserLikedAlbums();

		if (!likedAlbums) {
			throw new Error('Liked Albums Not Found');
		}

		const isLiked = likedAlbums.some((album) => album.albumId === +albumId);

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

export async function togglelikedTrack(formData: FormData) {
	const trackId = formData.get('trackId') as string;
	try {
		if (!trackId) {
			throw new Error('Data Error');
		}

		const user = await getCurrentUser();

		if (!user || !user.id) {
			throw new Error('Unauthorized');
		}

		const likedTracks = await getUserLikedTracks();

		if (!likedTracks) {
			throw new Error('Liked Tracks Not Found');
		}

		const isLiked = likedTracks.some((track) => track.trackId === trackId);

		if (isLiked) {
			await prisma.track.delete({
				where: {
					trackId_userId: { userId: user.id, trackId: trackId },
				},
			});
		} else {
			await prisma.track.create({
				data: { trackId: trackId, userId: user.id },
			});
		}
	} catch (error) {
		console.error(error);
	}
	revalidatePath(`/player`);
}

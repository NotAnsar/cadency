'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { uploadImage } from './user-actions';
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

const playlistSchema = z.object({
	image: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			message: `The playlist image must be a maximum of 2MB.`,
		})
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
			message: `Only .jpg, .jpeg, .png and .webp formats are supported.`,
		})
		.optional(),
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters long.' })
		.max(60, { message: 'Name must be no longer than 60 characters.' }),
	description: z
		.string()
		.max(500, { message: 'Name must be no longer than 500 characters.' })
		.optional()
		.transform((e) => (e === '' ? undefined : e)),
});

export type PlaylistState =
	| {
			errors?: {
				image?: string[];
				name?: string[];
				description?: string[];
			};
			message?: string | null;
	  }
	| undefined;

// export async function createPlaylist(
// 	prevState: PlaylistState,
// 	formData: FormData
// ): Promise<PlaylistState> {
// 	const f = formData.get('image') as File;

// 	const validatedFields = playlistSchema.safeParse({
// 		name: formData.get('name'),
// 		image:
// 			f.size === 0 || f.name === 'undefined'
// 				? undefined
// 				: formData.get('image'),
// 		description: formData.get('description'),
// 	});

// 	if (!validatedFields.success) {
// 		return {
// 			errors: validatedFields.error.flatten().fieldErrors,
// 			message: 'Missing Fields. Failed to Create Playlist.',
// 		};
// 	}

// 	const user = await getCurrentUser();

// 	if (!user || !user.id) {
// 		return { message: 'User Unauthorized.' };
// 	}

// 	const { name, description, image } = validatedFields.data;

// 	try {
// 		let imageUrl;

// 		if (image) {
// 			imageUrl = await uploadImage(image);
// 		}
// 		await prisma.playlist.create({
// 			data: { name, description, image: imageUrl, userId: user.id },
// 		});
// 	} catch (error) {
// 		return {
// 			message: 'Database Error: Failed to Create Playlist.',
// 		};
// 	}
// 	revalidatePath('/player/library', 'layout');
// }

export async function createOrUpdatePlaylist(
	playlistId: string | null,
	prevState: PlaylistState,
	formData: FormData
): Promise<PlaylistState> {
	const f = formData.get('image') as File;

	const validatedFields = playlistSchema.safeParse({
		name: formData.get('name'),
		image:
			f.size === 0 || f.name === 'undefined'
				? undefined
				: formData.get('image'),
		description: formData.get('description'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: `Missing Fields. Failed to ${
				playlistId ? 'Update' : 'Create'
			} Playlist.`,
		};
	}

	const user = await getCurrentUser();

	if (!user || !user.id) {
		return { message: 'User Unauthorized.' };
	}

	const { name, description, image } = validatedFields.data;

	try {
		let imageUrl;

		if (image) {
			imageUrl = await uploadImage(image);
		}

		if (playlistId) {
			await prisma.playlist.update({
				where: { id: playlistId },
				data: { name, description, image: imageUrl },
			});
		} else {
			await prisma.playlist.create({
				data: { name, description, image: imageUrl, userId: user.id },
			});
		}
	} catch (error) {
		return {
			message: `Database Error: Failed to ${
				playlistId ? 'Update' : 'Create'
			} Playlist.`,
		};
	}
	if (playlistId) {
		revalidatePath(`/player/playlist/${playlistId}`);
	} else {
		revalidatePath('/player/library', 'layout');
	}
}

export async function addToPlaylist(formData: FormData) {
	const playlistId = formData.get('playlistId') as string;
	const trackId = formData.get('trackId') as string;
	try {
		if (!playlistId || !trackId) {
			throw new Error('Data Error');
		}

		await prisma.playlistTrack.create({
			data: { playlistId, trackId },
		});
		console.log(playlistId, trackId, 'playlist added');
	} catch (error) {
		console.error(error);
	}
	revalidatePath(`/player/library`, 'layout');
}

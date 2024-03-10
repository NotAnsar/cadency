import { Playlist } from '@/types/playlist';
import { prisma } from '../prisma';
import { getCurrentUser } from '../session';
import { revalidatePath } from 'next/cache';

export async function getUserPlaylists() {
	const session = await getCurrentUser();

	// if (session?.email) {
	//   const user = await prisma.user.findUnique({
	//   	where: { email: session.email },
	//   	select: { playlists: true },
	//   });
	// return user?.playlists;
	if (session?.id) {
		const playlists = await prisma.playlist.findMany({
			where: { userId: session.id },
			select: {
				_count: true,
				id: true,
				image: true,
				name: true,
				createdAt: true,
				description: true,
				updatedAt: true,
			},
		});

		return playlists as Playlist[] | null;
	}

	return null;
}

export async function getPlaylist(id: string) {
	const playlist = await prisma.playlist.findUnique({
		where: { id },
		include: { tracks: true, user: true, _count: true },
	});

	return playlist;
}

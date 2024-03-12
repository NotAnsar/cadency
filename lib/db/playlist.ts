import { Playlist } from '@/types/playlist';
import { prisma } from '../prisma';
import { getCurrentUser } from '../session';

export async function getUserPlaylists(limit?: number) {
	const session = await getCurrentUser();

	if (session?.id) {
		const playlists = await prisma.playlist.findMany({
			where: { userId: session.id },
			take: limit,
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

		return playlists as Playlist[];
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

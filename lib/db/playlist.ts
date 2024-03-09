import { prisma } from '../prisma';
import { getCurrentUser } from '../session';

export async function getUserPlaylists() {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: { playlists: true },
		});

		return user?.playlists;
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

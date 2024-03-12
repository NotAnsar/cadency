import { prisma } from '../prisma';
import { getCurrentUser } from '../session';

export async function getCurrentUserData() {
	const session = await getCurrentUser();

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
			},
		});

		return user;
	}

	return null;
}

export async function getUserFollowedArtists(limit?: number) {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: { followedArtists: limit ? { take: 5 } : true },
		});

		return user?.followedArtists;
	}

	return null;
}

export async function getUserLikedAlbums(limit?: number) {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: { likedAlbums: limit ? { take: limit } : true },
		});

		return user?.likedAlbums;
	}

	return null;
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

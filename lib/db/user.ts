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

export async function getUserFollowedArtists() {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: { followedArtists: true },
		});

		return user?.followedArtists;
	}

	return null;
}

export async function getUserLikedAlbums() {
	const session = await getCurrentUser();

	if (session?.email) {
		const user = await prisma.user.findUnique({
			where: { email: session.email },
			select: { likedAlbums: true },
		});

		return user?.likedAlbums;
	}

	return null;
}

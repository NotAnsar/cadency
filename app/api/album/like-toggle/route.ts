import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { albumId }: { albumId: number } = await req.json();

		const usersession = await getCurrentUser();

		if (!usersession || !usersession.id) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { id: usersession?.id },
			include: { likedAlbums: true },
		});

		if (!user) {
			return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
		}

		const isLiked = user.likedAlbums.some(
			(album) => album.albumId === +albumId
		);

		if (isLiked) {
			const res = await prisma.album.delete({
				where: {
					albumId_userId: { userId: user.id, albumId },
				},
			});
			return NextResponse.json(
				{ message: 'disliked', data: res },
				{ status: 200 }
			);
		} else {
			const res = await prisma.album.create({
				data: {
					albumId: +albumId,
					userId: user.id,
				},
			});
			return NextResponse.json(
				{ message: 'liked', data: res },
				{ status: 200 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Database Error: Failed to Update User Picture.',
			},
			{ status: 500 }
		);
	}
}

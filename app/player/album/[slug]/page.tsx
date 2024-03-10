import AlbumControl from '@/components/ui/player/album/album-control';
import AlbumDetails from '@/components/ui/player/album/album-details';
import AlbumSongs from '@/components/ui/player/album/album-songs';
import { getAlbum } from '@/lib/api/album';
import { getUserLikedAlbums, getUserLikedTracks } from '@/lib/db/user';

import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const [album, likedAlbums, likedTracks] = await Promise.all([
		getAlbum(params.slug),
		getUserLikedAlbums(),
		getUserLikedTracks(),
	]);

	if (!album || !likedAlbums || !likedTracks) {
		notFound();
	}

	return (
		<div className='px-8 py-6'>
			<AlbumDetails album={album} />
			<AlbumControl
				id={album.id}
				initialLiked={likedAlbums.some((a) => a.albumId === album.id)}
			/>
			<AlbumSongs
				label={album.label}
				title={album.title}
				tracks={album.tracks.data}
				likedTracks={likedTracks}
			/>
		</div>
	);
}

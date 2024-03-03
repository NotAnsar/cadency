import AlbumControl from '@/components/ui/player/album/album-control';
import AlbumDetails from '@/components/ui/player/album/album-details';
import AlbumSongs from '@/components/ui/player/album/album-songs';
import { getAlbum } from '@/lib/api/album';
import { getUserLikedAlbums } from '@/lib/db/user';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const album = await getAlbum(params.slug);
	const likedAlbums = await getUserLikedAlbums();

	if (!album || !likedAlbums) {
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
			/>
		</div>
	);
}

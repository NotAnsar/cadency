import AlbumControl from '@/components/ui/player/album/album-control';
import AlbumDetails from '@/components/ui/player/album/album-details';
import AlbumSongs from '@/components/ui/player/album/album-songs';
import { getAlbum } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const album = await getAlbum(params.slug);

	if (!album) {
		notFound();
	}

	return (
		<div className='px-8 py-6'>
			<AlbumDetails album={album} />
			<AlbumControl />
			<AlbumSongs
				label={album.label}
				title={album.title}
				tracks={album.tracks.data}
			/>
		</div>
	);
}

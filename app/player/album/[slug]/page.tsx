import AlbumControl, {
	AlbumControlSkeleton,
} from '@/components/ui/player/album/album-control';
import AlbumDetails from '@/components/ui/player/album/album-details';
import AlbumSongs from '@/components/ui/player/album/album-songs';
import { getAlbum } from '@/lib/api/album';

import { Suspense } from 'react';

export default async function page({ params }: { params: { slug: string } }) {
	const album = await getAlbum(params.slug);

	if (!album) {
		throw new Error('Cannot get Album Data or Album not Found');
	}

	return (
		<div className='px-8 py-6'>
			<AlbumDetails album={album} />

			<Suspense fallback={<AlbumControlSkeleton />}>
				<AlbumControl id={params.slug} tracks={album.tracks.data} />
			</Suspense>
			<Suspense fallback={<p>Loading Tracks</p>}>
				<AlbumSongs
					label={album.label}
					title={album.title}
					tracks={album.tracks.data}
				/>
			</Suspense>
		</div>
	);
}

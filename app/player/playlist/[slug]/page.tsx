import PlaylistDetails from '@/components/ui/player/playlist/playlist-details';
import PlaylistSongs from '@/components/ui/player/playlist/playlist-songs';

import { getPlaylist } from '@/lib/db/playlist';

import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function page({ params }: { params: { slug: string } }) {
	const playlist = await getPlaylist(params.slug);

	if (!playlist) {
		notFound();
	}

	return (
		<div className='px-8 py-6'>
			<PlaylistDetails playlist={playlist} />

			<Suspense fallback={<p>Loading</p>}>
				<PlaylistSongs playlistId={params.slug} />
			</Suspense>
		</div>
	);
}

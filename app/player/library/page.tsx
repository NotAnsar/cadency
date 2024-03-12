import LibraryAlbum, {
	LibraryAlbumSkeleton,
} from '@/components/ui/player/library/library-album';

import LibraryArtist, {
	LibraryArtistSkeleton,
} from '@/components/ui/player/library/library-artist';
import LibrarySong from '@/components/ui/player/library/library-song';
import LibraryPlaylist, {
	LibraryPlaylistSkeleton,
} from '@/components/ui/player/library/library-playlist';
import { Suspense } from 'react';

export default async function page() {
	return (
		<>
			<h1 className='text-4xl font-semibold '>Library</h1>
			<p className='text-muted-foreground mt-2 text-[15px] '>
				Explore your favorite albums, artists, and songs. Create your own
				playlists.
			</p>

			<div className='mt-6 flex flex-col gap-5'>
				<Suspense fallback={<LibraryAlbumSkeleton />}>
					<LibraryAlbum />
				</Suspense>
				<Suspense fallback={<LibraryArtistSkeleton />}>
					<LibraryArtist />
				</Suspense>
				<Suspense fallback={<LibraryAlbumSkeleton />}>
					<LibrarySong />
				</Suspense>
				<Suspense fallback={<LibraryPlaylistSkeleton />}>
					<LibraryPlaylist />
				</Suspense>
			</div>
		</>
	);
}

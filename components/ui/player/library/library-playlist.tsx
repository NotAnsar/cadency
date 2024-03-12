import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NewPlaylist from './new-playlist';

import LibraryGridHeader from './library-grid-header';
import { getUserPlaylists } from '@/lib/db/playlist';
import { ListMusic } from 'lucide-react';
import AlbumSkeleton from '../../skeleton/album-skeleton';

export default async function LibraryPlaylist() {
	const playlists = await getUserPlaylists(4);

	return (
		<LibraryGridHeader link='/player/library/playlists' title='Your Playlists'>
			<NewPlaylist />
			{playlists?.map((playlist) => (
				<div key={playlist?.id} className=''>
					<Link href={`/player/playlist/${playlist.id}`}>
						{playlist.image ? (
							<Image
								alt={playlist.name}
								src={playlist.image}
								height={200}
								width={200}
								className='w-full h-auto aspect-square border border-border rounded-sm object-cover'
							/>
						) : (
							<div className='w-full aspect-square border border-border rounded-sm bg-secondary flex items-center justify-center'>
								<ListMusic className='w-12 h-12 md:w-16 md:h-16 text-muted-foreground' />
							</div>
						)}
					</Link>
					<div>
						<Link
							href={`/player/playlist/${playlist.id}`}
							className='text-sm my-1 font-medium block'
						>
							{playlist.name}
						</Link>

						<span className='text-xs mb-1 text-muted-foreground block'>
							{playlist._count.tracks} Tracks
						</span>
					</div>
				</div>
			))}
		</LibraryGridHeader>
	);
}

export function LibraryPlaylistSkeleton() {
	return (
		<LibraryGridHeader link='/player/library/albums' title='Favorite Albums'>
			<NewPlaylist />
			{Array.from({ length: 4 }).map((_, i) => (
				<AlbumSkeleton key={i} />
			))}
		</LibraryGridHeader>
	);
}

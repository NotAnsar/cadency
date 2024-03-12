import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LibraryGridHeader from './library-grid-header';
import { getLikedTracks } from '@/lib/api/track';
import AlbumSkeleton from '../../skeleton/album-skeleton';

export default async function LibrarySong() {
	const songs = await getLikedTracks(5);
	if (!songs || songs.length === 0) return null;

	return (
		<LibraryGridHeader link='/player/library/songs' title='Favorite Songs'>
			{songs.map((song) => (
				<div key={song.id} className=''>
					<Link href={`/player/album/${song.album.id}`}>
						<Image
							alt={song.title}
							src={song.album.cover_medium}
							height={200}
							width={200}
							className='w-auto h-auto border border-border rounded-sm'
						/>
					</Link>
					<div>
						<p className='text-sm my-1 font-medium'>{song.title_short}</p>
						<span className='text-xs mb-1 text-muted-foreground block'>
							by&nbsp;
							{song.contributors.map((a, i) => (
								<span key={a.id}>
									<Link
										href={`/player/artist/${a.id}`}
										className='hover:underline'
									>
										{a.name}
									</Link>
									{`${song.contributors.length - 1 === i ? '' : ', '}`}
								</span>
							))}
						</span>
					</div>
				</div>
			))}
		</LibraryGridHeader>
	);
}

export function LibraryAlbumSkeleton() {
	return (
		<LibraryGridHeader link='/player/library/songs' title='Favorite Songs'>
			{Array.from({ length: 5 }).map((_, i) => (
				<AlbumSkeleton key={i} />
			))}
		</LibraryGridHeader>
	);
}

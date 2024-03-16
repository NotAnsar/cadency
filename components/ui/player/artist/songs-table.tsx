'use client';
import AddToPlaylist from '@/components/add-to-playlist';
import LikeTrack from '@/components/like-track';
import { formatSongTime } from '@/lib/utils';
import { Track } from '@/types/music';
import { Playlist } from '@/types/playlist';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import PlayTrack from '../album/play-track';

export default function SongsTable({
	songs,
	likedTracks,
	playlists,
}: {
	songs: Track[];
	likedTracks: {
		userId: string;
		trackId: string;
	}[];
	playlists: Playlist[];
}) {
	const [showMore, setshowMore] = useState(false);
	const songsShown = showMore ? songs.length : 5;
	return (
		<div className='font-medium'>
			{songs.slice(0, songsShown).map((song, i) => (
				<div
					key={song.id}
					className='border-b transition-colors hover:bg-muted/50 flex items-center w-auto justify-between group'
				>
					<div className='flex items-center'>
						<div className='p-4 align-middle text-sm'>
							<PlayTrack i={i} tracks={songs} />
						</div>

						<Image
							alt={song.title}
							src={song.album.cover_medium}
							width={40}
							height={40}
							className='w-10 h-10 rounded-sm'
						/>

						<div className='ml-4'>
							<span className='text-[15px]'>{song.title_short}</span>
							<div className='text-xs font-normal hover text-muted-foreground'>
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
							</div>
						</div>
					</div>

					<div className='flex items-center gap-6 mr-4'>
						<LikeTrack
							trackId={song.id + ''}
							isLiked={likedTracks.some((a) => a.trackId === song.id + '')}
							classNameNotLiked='invisible group-hover:visible'
							key={likedTracks.toString()}
						/>

						<p className='text-sm w-10'>{formatSongTime(song.duration)}</p>

						<AddToPlaylist
							playlists={playlists || []}
							songId={song.id + ''}
							className='invisible group-hover:visible'
						/>
					</div>
				</div>
			))}

			{songs.length > 5 && (
				<button
					className='text-sm text-muted-foreground hover:text-foreground mt-6 cursor-pointer'
					onClick={() => setshowMore((a) => !a)}
				>
					{`See ${showMore ? 'Less' : 'More'}`}
				</button>
			)}
		</div>
	);
}

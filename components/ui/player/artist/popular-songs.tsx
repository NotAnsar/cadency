'use client';
import { Icons } from '@/components/icons/audio-icons';
import { formatSongTime } from '@/lib/utils';
import { Track } from '@/types/music';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function PopularSongs({ songs }: { songs: Track[] }) {
	const [showMore, setshowMore] = useState(false);

	const songsShown = showMore ? songs.length : 5;

	return (
		<div className='mt-10'>
			<h1 className='text-2xl font-medium mb-6'>Popular Songs</h1>
			<div className='font-medium'>
				{songs.slice(0, songsShown).map((song, i) => (
					<div
						key={song.id}
						className='border-b transition-colors hover:bg-muted/50 flex items-center w-auto justify-between '
					>
						<div className='flex items-center'>
							<p className='p-4 align-middle  text-sm'>{i + 1}</p>

							<Image
								alt={song.title}
								src={song.album.cover_medium}
								width={40}
								height={40}
								className='w-10 h-10 rounded-sm'
							/>

							<span className='text-[15px] ml-4'>{song.title}</span>
						</div>
						<div className='flex items-center gap-6 mr-4'>
							<Icons.heart className='w-5 h-5' />
							<p className='text-sm w-10'>{formatSongTime(song.duration)}</p>
							<MoreHorizontal className='w-5 h-5' />
						</div>
					</div>
				))}

				<button
					className='text-sm text-muted-foreground hover:text-foreground mt-6 cursor-pointer'
					onClick={() => setshowMore((a) => !a)}
				>
					{`See ${showMore ? 'More' : 'Less'}`}
				</button>
			</div>
		</div>
	);
}

'use client';

import { Icons } from '@/components/icons/audio-icons';
import { useMusicPlayerContext } from '@/context/music-player';
import { Track } from '@/types/music';

type Prop = { albumId: string; tracks: Track[] };

export default function PlayAlbum({ albumId, tracks }: Prop) {
	const { isPlaying, songs, currentIndex, playNewSong, play, togglePlay } =
		useMusicPlayerContext();

	return (
		<button
			className='px-6 rounded-md flex justify-center items-center bg-primary  cursor-pointer text-white gap-1'
			onClick={() => {
				if (songs[currentIndex]?.album.id === +albumId) {
					togglePlay();
				} else {
					playNewSong(tracks);
				}
			}}
		>
			{songs[currentIndex]?.album.id === +albumId && isPlaying ? (
				<>
					<Icons.pause className='h-6 w-6' />
					<p className='font-medium'>Listening</p>
				</>
			) : (
				<>
					<Icons.play className='h-6 w-6' />
					<p className='font-medium'>Listen</p>
				</>
			)}
		</button>
	);
}

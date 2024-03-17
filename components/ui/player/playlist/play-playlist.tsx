'use client';

import { Icons } from '@/components/icons/audio-icons';
import { useMusicPlayerContext } from '@/context/music-player';
import { Track } from '@/types/music';

type Prop = { tracks: Track[] };

export default function PlayPlaylist({ tracks }: Prop) {
	const { isPlaying, songs, currentIndex, playNewSong, togglePlay } =
		useMusicPlayerContext();

	return (
		<button
			className='px-6 rounded-md flex justify-center items-center bg-primary  cursor-pointer text-white gap-1'
			onClick={() => {
				if (tracks.some((track) => track.id === songs[currentIndex]?.id)) {
					togglePlay();
				} else {
					playNewSong(tracks);
				}
			}}
		>
			{tracks.some((track) => track.id === songs[currentIndex]?.id) &&
			isPlaying ? (
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

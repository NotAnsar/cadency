'use client';

import { Icons } from '@/components/icons/audio-icons';
import { useMusicPlayerContext } from '@/context/music-player';
import { Track } from '@/types/music';

export default function PlayTrendingSong({
	tracks,
	i,
}: {
	tracks: Track[];
	i: number;
}) {
	const { isPlaying, songs, currentIndex, playNewSong, play, pause } =
		useMusicPlayerContext();

	return (
		<div>
			{isPlaying && songs[currentIndex].id === tracks[i].id ? (
				<Icons.pause
					className='w-6 h-6 stroke-[3] cursor-pointer text-primary fill-primary'
					onClick={pause}
				/>
			) : (
				<Icons.play
					className='w-6 h-6 cursor-pointer text-primary fill-primary'
					onClick={() => {
						songs[currentIndex]?.id === tracks[i].id
							? play()
							: playNewSong(tracks, i);
					}}
				/>
			)}
		</div>
	);
}

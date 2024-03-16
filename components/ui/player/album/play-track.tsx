'use client';
import { Icons } from '@/components/icons/audio-icons';
import { useMusicPlayerContext } from '@/context/music-player';
import { Track } from '@/types/music';

export default function PlayTrack({
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
					className='w-5 h-5 hidden group-hover:block stroke-[3] cursor-pointer'
					onClick={pause}
				/>
			) : (
				<Icons.play
					className='w-5 h-5 hidden  group-hover:block cursor-pointer'
					onClick={() => {
						songs[currentIndex]?.id === tracks[i].id
							? play()
							: playNewSong(tracks, i);
					}}
				/>
			)}

			<span className='w-5 h-5 block group-hover:hidden'>{i + 1}</span>
		</div>
	);
}

'use client';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons/audio-icons';
import LikeTrack from '@/components/like-track';
import { useMusicPlayerContext } from '@/context/music-player';
import { useEffect, useState } from 'react';

type tracks = {
	userId: string;
	trackId: string;
	createdAt: Date;
};

export default function VolumeSection({
	likedTracks,
}: {
	likedTracks: tracks[];
}) {
	const { songs, currentIndex, volume, handleVolume, toggleMute, mute } =
		useMusicPlayerContext();

	const [isLiked, setIsLiked] = useState<boolean>(
		likedTracks?.some((a) => a.trackId === songs[currentIndex]?.id + '')
	);

	useEffect(() => {
		setIsLiked(
			likedTracks?.some((a) => a.trackId === songs[currentIndex]?.id + '')
		);
	}, [likedTracks, songs, currentIndex]);

	if (!songs[currentIndex]) {
		return <VolumeSkeleton />;
	}

	return (
		<div className='items-center gap-2 mr-4 flex flex-none'>
			<div className='flex gap-4'>
				<LikeTrack
					key={isLiked ? 'liked' : 'not-liked'}
					className='text-muted-foreground hidden lg:block'
					trackId={songs[currentIndex].id + ''}
					isLiked={isLiked}
				/>
				{mute ? (
					<Icons.speakerX
						className='cursor-pointer text-muted-foreground hover:text-foreground transition-colors h-5 w-5'
						onClick={toggleMute}
					/>
				) : (
					<Icons.speakerWave
						className='cursor-pointer text-muted-foreground hover:text-foreground transition-colors h-5 w-5'
						onClick={toggleMute}
					/>
				)}
			</div>
			<div className='relative flex items-center '>
				<input
					type='range'
					className='h-1 w-20 bg-muted rounded-full accent-primary appearance-none opacity-0 hover:opacity-100 z-20'
					min={0}
					max={1}
					step={0.01}
					defaultValue={volume}
					onChange={handleVolume}
				/>

				<div
					className={cn(
						'h-1  bg-primary rounded-full absolute pointer-events-none z-30'
					)}
					style={{ width: `${volume * 100}%` }}
				/>
				<div
					className={cn(
						'h-1 w-20 bg-muted rounded-full accent-primary absolute z-10'
					)}
				/>
			</div>
		</div>
	);
}

export function VolumeSkeleton() {
	return (
		<div className='items-center gap-2 mr-4 flex flex-none'>
			<div className='flex gap-4'>
				<Icons.heart className='text-muted h-5 w-5' />
				<Icons.speakerWave className='text-muted h-5 w-5' />
			</div>

			<div className='flex items-center '>
				<div className='h-1 w-20 bg-muted rounded-full' />
			</div>
		</div>
	);
}

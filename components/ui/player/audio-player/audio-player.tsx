'use client';

import { cn, formatSongTime } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import VolumeSection from './volume-section';
import SongDetails from './song-details';
import VolumeSkeleton from './volume-skeleton';
import SongDetailsSkeleton from './song-details-skeleton';

import AudioController from './audio-controller';

const audio = {
	url: 'https://p.scdn.co/mp3-preview/315b151078df729934712ed1cc21e11506c64017?cid=f6a40776580943a7bc5173125a1e8832',
	thumbnail: 'https://i.scdn.co/image/ab67616d00004851bbdceba2bf1867d4966d0347',
	title: 'n.h.i.e.',
	author: '21 Savage',
	liked: false,
};
export default function AudioPlayer() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const progressBarRef = useRef<HTMLInputElement | null>(null);
	const {
		currentTime,
		duration,
		isPlaying,
		tooglePlay,
		onLoadedMetadata,
		handleCurrentTime,
	} = useAudioPlayer(audioRef, progressBarRef);

	useEffect(() => {
		if (audioRef.current) onLoadedMetadata();
	}, [onLoadedMetadata]);

	return (
		<div
			className='h-20 bg-background w-full sticky backdrop-blur-sm border-t-4 border-primary flex justify-between items-center px-3 focus-visible:outline-none gap-4'
			onKeyDown={(e) => {
				if (e.key === ' ') tooglePlay();
			}}
			tabIndex={-1}
		>
			{audioRef.current ? <SongDetails {...audio} /> : <SongDetailsSkeleton />}

			<div className='w-full '>
				<div className='grid gap-[2px] md:w-4/5 w-full mx-auto'>
					<AudioController isPlaying={isPlaying} tooglePlay={tooglePlay} />
					<div className='flex gap-2 items-center justify-center'>
						<span className='text-[13px] text-muted-foreground'>
							{audioRef.current ? formatSongTime(currentTime) : '--:--'}
						</span>
						<span className='w-4/5 relative flex items-center'>
							<input
								type='range'
								className={cn(
									'h-1 w-full bg-muted rounded-full accent-primary appearance-none opacity-0 hover:opacity-100 z-20'
								)}
								ref={progressBarRef}
								min={0}
								max={duration}
								onChange={handleCurrentTime}
							/>

							<div
								className={
									'h-1 bg-primary rounded-full absolute pointer-events-none z-20'
								}
								style={{
									width: currentTime
										? `${(currentTime / duration) * 100}%`
										: '',
								}}
							/>
							<div
								className={
									'h-1 bg-muted w-full rounded-full absolute pointer-events-none z-10'
								}
							/>

							<audio src={audio.url} ref={audioRef} />
						</span>

						<span className='text-[13px] text-muted-foreground'>
							{duration && !isNaN(duration)
								? formatSongTime(duration)
								: '--:--'}
						</span>
					</div>
				</div>
			</div>
			<div className='hidden md:grid'>
				{audioRef.current ? (
					<VolumeSection audioRef={audioRef} />
				) : (
					<VolumeSkeleton />
				)}
			</div>
		</div>
	);
}

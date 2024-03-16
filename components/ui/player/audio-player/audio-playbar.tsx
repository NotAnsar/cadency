'use client';

import { useMusicPlayerContext } from '@/context/music-player';
import { cn, formatSongTime } from '@/lib/utils';
import AudioController, { AudioControllerSkeleton } from './audio-controller';

export default function AudioPlaybar({ className }: { className?: string }) {
	const { audioRef, handleCurrentTime, progressBarRef, songs, currentIndex } =
		useMusicPlayerContext();

	if (!songs[currentIndex]) {
		return <AudioPlaybarSkeleton />;
	}

	return (
		<div className={cn('w-full ', className)}>
			<div className='grid gap-[2px] w-full mx-auto'>
				<AudioController />
				<div className='flex gap-2 items-center justify-center'>
					<span className='text-[13px] text-muted-foreground'>
						{audioRef.current
							? formatSongTime(audioRef.current.currentTime)
							: '--:--'}
					</span>
					<span className='w-4/5 relative flex items-center'>
						<input
							type='range'
							className={cn(
								'h-1 w-full bg-muted rounded-full accent-primary appearance-none opacity-0 hover:opacity-100 z-20'
							)}
							ref={progressBarRef}
							min={0}
							step={0.01}
							onChange={handleCurrentTime}
						/>

						<div
							className={
								'h-1 bg-primary rounded-full absolute pointer-events-none z-20'
							}
							style={{
								width:
									audioRef.current && audioRef.current?.duration
										? // ? `${(currentTime / audioRef.current?.duration) * 100}%`
										  `${
												(audioRef.current.currentTime /
													audioRef.current?.duration) *
												100
										  }%`
										: '',
							}}
						/>
						<div
							className={
								'h-1 bg-muted w-full rounded-full absolute pointer-events-none z-10'
							}
						/>
						<AudioElement />
					</span>

					<span className='text-[13px] text-muted-foreground'>
						{audioRef.current?.duration && !isNaN(audioRef.current?.duration)
							? formatSongTime(audioRef.current?.duration)
							: '--:--'}
					</span>
				</div>
			</div>
		</div>
	);
}
export function AudioPlaybarSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn('w-full ', className)}>
			<div className='grid gap-[2px] w-full mx-auto'>
				<AudioControllerSkeleton />
				<div className='flex gap-2 items-center justify-center'>
					<span className='text-[13px] text-muted'>00:00</span>
					<span className='w-4/5 relative flex items-center'>
						<input
							type='range'
							className={cn(
								'h-1 w-full bg-muted rounded-full accent-muted appearance-none opacity-0 z-20'
							)}
							disabled
						/>

						<div
							className={
								'h-1 bg-muted rounded-full absolute pointer-events-none z-20'
							}
						/>
						<div
							className={
								'h-1 bg-muted w-full rounded-full absolute pointer-events-none z-10'
							}
						/>
						<AudioElement />
					</span>

					<span className='text-[13px] text-muted'>00:00</span>
				</div>
			</div>
		</div>
	);
}

const AudioElement = () => {
	const { audioRef, OnEnded, songs, currentIndex, onLoadedMetadata } =
		useMusicPlayerContext();
	return (
		<audio
			ref={audioRef}
			src={songs[currentIndex]?.preview}
			preload='metadata'
			onEnded={OnEnded}
			onLoadedMetadata={onLoadedMetadata}
		/>
	);
};

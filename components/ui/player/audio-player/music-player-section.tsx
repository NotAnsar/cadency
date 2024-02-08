import React, { ChangeEvent, RefObject } from 'react';
import { cn, formatSongTime } from '@/lib/utils';
import { Icons } from '@/components/icons/audio-icons';

type Prop = {
	currentTime: number;
	duration: number;
	isPlaying: boolean;
	tooglePlay: () => void;
	handleCurrentTime: (e: ChangeEvent<HTMLInputElement>) => void;
};
export default function MusicPlayerSection({
	currentTime,
	duration,
	isPlaying,
	tooglePlay,
	handleCurrentTime,
}: Prop) {
	return (
		<div className='w-1/2 grid gap-[2px] px-2'>
			<div className='flex gap-5 justify-center items-center'>
				<Icons.skipBackward className='text-[#888] hover:text-foreground hover:cursor-pointer w-7 h-7' />

				<button
					className='bg-primary w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-105'
					onClick={tooglePlay}
				>
					{isPlaying ? (
						<Icons.pause className='flex items-center justify-center text-white w-6 h-6' />
					) : (
						<Icons.play className='flex items-center justify-center text-white w-6 h-6 ' />
					)}
				</button>

				<Icons.skipForward className='w-6 h-6 text-[#888] hover:text-foreground hover:cursor-pointer' />
			</div>
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
							width: currentTime ? `${(currentTime / duration) * 100}%` : '',
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
					{duration && !isNaN(duration) ? formatSongTime(duration) : '--:--'}
				</span>
			</div>
		</div>
	);
}

/* <div className='flex gap-2 items-center justify-center'>
	<span className='text-sm'>0:25</span>
	<span className='w-4/5 relative '>
		<span
			className={cn(
				'absolute -translate-y-1/2 top-1/2  w-3 h-3 rounded-full bg-primary z-10',
				'left-[50%]'
			)}
		></span>
		<Progress value={50} className='h-1' />
	</span>
	<span className='text-sm'>4:25</span>
</div>; */

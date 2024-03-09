'use client';

import { cn } from '@/lib/utils';
import { MutableRefObject, useState } from 'react';
import { useVolume } from '@/hooks/useVolume';
import { Icons } from '@/components/icons/audio-icons';
import { toast } from '../../use-toast';
import LikeTrack from '@/components/like-track';

type Prop = { audioRef: MutableRefObject<HTMLAudioElement | null> };

export default function VolumeSection({ audioRef }: Prop) {
	const { handleVolume, mute, toggleMute, volume } = useVolume(audioRef);
	const [liked, setliked] = useState(false);

	return (
		<div className='items-center gap-2 mr-4 flex flex-none'>
			<div className='flex gap-4'>
				{/* <Icons.heart
					className={cn(
						'cursor-pointer hover:scale-110 transition-all h-5 w-5 ',
						liked ? 'fill-primary text-primary' : 'text-muted-foreground '
					)}
					role='button'
					onClick={() => {
						setliked((a) => !a);
						toast({
							description: !liked
								? 'Added To liked Song.'
								: 'Removed From liked Song.',
							className: 'absolute bottom-[90px] right-4',
						});
					}}
				/> */}
				<LikeTrack
					className='text-muted-foreground'
					trackId={''}
					isLiked={true}
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

import { Icons } from '@/components/icons/audio-icons';
import { useMusicPlayerContext } from '@/context/music-player';

export default function AudioController() {
	const {
		isPlaying,
		togglePlay,
		playNext: next,
		playPrevious: previous,
	} = useMusicPlayerContext();

	return (
		<div className='flex gap-5 justify-center items-center'>
			<Icons.skipBackward
				className='text-foreground/80 hover:text-foreground/60 hover:cursor-pointer w-7 h-7'
				onClick={previous}
			/>

			<button
				className='bg-primary w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all'
				onClick={togglePlay}
			>
				{isPlaying ? (
					<Icons.pause className='flex items-center justify-center text-white w-6 h-6' />
				) : (
					<Icons.play className='flex items-center justify-center text-white w-6 h-6 ' />
				)}
			</button>

			<Icons.skipForward
				className='w-7 h-7 text-foreground/80 hover:text-foreground/60 hover:cursor-pointer'
				onClick={next}
			/>
		</div>
	);
}
export function AudioControllerSkeleton() {
	return (
		<div className='flex gap-5 justify-center items-center'>
			<Icons.skipBackward className='text-muted w-7 h-7 hover:cursor-not-allowed' />
			<button className=' w-9 h-9 rounded-full flex items-center justify-center cursor-not-allowed'>
				<Icons.play className='flex items-center justify-center text-muted w-7 h-7 ' />
			</button>
			<Icons.skipForward className='w-7 h-7 text-muted hover:cursor-not-allowed' />
		</div>
	);
}

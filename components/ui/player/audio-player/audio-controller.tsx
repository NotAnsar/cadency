import { Icons } from '@/components/icons/audio-icons';

type Prop = {
	isPlaying: boolean;
	tooglePlay: () => void;
};

export default function AudioController({ tooglePlay, isPlaying }: Prop) {
	return (
		<div className='flex gap-5 justify-center items-center'>
			<Icons.skipBackward className='text-muted-foreground hover:text-foreground hover:cursor-pointer w-7 h-7' />

			<button
				className='bg-primary w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all'
				onClick={tooglePlay}
			>
				{isPlaying ? (
					<Icons.pause className='flex items-center justify-center text-white w-6 h-6' />
				) : (
					<Icons.play className='flex items-center justify-center text-white w-6 h-6 ' />
				)}
			</button>

			<Icons.skipForward className='w-7 h-7 text-muted-foreground hover:text-foreground hover:cursor-pointer' />
		</div>
	);
}

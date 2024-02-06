import { Icons } from '@/components/icons/audio-icons';
import Image from 'next/image';

type Songs = {
	key: string;
	title: string;
	subtitle: string;
	image: string;
	text: string;
	// time in seconds
	// liked or not
	// song url
};
export default function TrendingSongs({ songs }: { songs: Songs[] }) {
	return (
		<div className='flex-none'>
			<h2 className='text-xl font-medium mb-4 tracking-tight'>Now Trending</h2>

			<div className='flex w-full flex-col gap-2'>
				{songs.slice(0, 5).map((song) => (
					<div
						className='flex justify-between w-full rounded-md overflow-hidden items-center bg-secondary gap-2'
						key={song.key}
					>
						<div className='flex gap-2 items-center'>
							<Image src={song.image} alt={song.text} width={52} height={52} />

							<div>
								<p className='leading-none text-nowrap overflow-hidden text-[15px] font-medium text-'>
									{song.title}
								</p>
								<p className='text-xs text-muted-foreground mt-1'>
									{song.subtitle}
								</p>
							</div>
						</div>
						<div className='flex gap-4 items-center'>
							<Icons.heart className='w-5 h-5 cursor-pointer' />
							<p className='text-sm'>3:54</p>
							<button className='w-[52px] h-[52px] flex items-center justify-center bg-primary'>
								<Icons.play className='w-6 h-6 cursor-pointer text-white' />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

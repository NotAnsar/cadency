import { Track } from '@/app/(music player)/player/page';
import { Icons } from '@/components/icons/audio-icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Prop = {
	songs: Track[];
	classname?: string;
};
export default function TrendingSongs({ songs, classname = '' }: Prop) {
	return (
		<div className={cn('flex-none', classname)}>
			<div className='flex justify-between items-center pr-1 mb-4'>
				<h2 className='text-xl font-medium  tracking-tight'>
					Trending <span className='text-primary font-semibold'>Now</span>{' '}
				</h2>
				<Link
					href={'/player'}
					className='text-sm text-primary hover:underline font-semibold'
				>
					View all
				</Link>
			</div>

			<div className='flex w-full flex-col gap-2'>
				{songs.slice(0, 5).map((song: Track) => (
					<div
						className='flex justify-between w-full rounded-md overflow-hidden items-center bg-secondary gap-2'
						key={song.id}
					>
						<div className='flex gap-2 items-center'>
							<Image
								src={song.album.cover_medium}
								alt={song.title}
								width={52}
								height={52}
							/>

							<div className='overflow-hidden'>
								<p className='leading-none text-[15px] font-medium text-nowrap whitespace-nowrap overflow-hidden'>
									{song.title}
								</p>
								<p className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden'>
									{song.artist.name}
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

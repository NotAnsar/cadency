import { Heart, Pause, Play, SkipBack, SkipForward } from 'lucide-react';

import Image from 'next/image';
import { Progress } from '../../progress';
import { cn } from '@/lib/utils';
import { Input } from '../../input';
import VolumeSection from './volume-section';

export default function AudioPlayer() {
	return (
		<div className='h-20 bg-background w-full sticky bottom-0 backdrop-blur-sm border-t-4 border-primary flex justify-between items-center px-3'>
			<div className='flex gap-3 items-center w-1/4'>
				<Image
					src={
						'https://i.scdn.co/image/ab67616d00004851bbdceba2bf1867d4966d0347'
					}
					alt='n.h.i.e.'
					width={56}
					height={56}
					className='rounded-sm'
				/>
				<div className=''>
					<p className='text-sm font-medium'>n.h.i.e.</p>
					<p className='text-sm text-muted-foreground'>21 Savage</p>
				</div>

				<Heart
					className='w-[18px] h-[18px] ml-2 cursor-pointer'
					fill='#eee'
					role='button'
				/>
			</div>
			<div className='w-1/2 grid gap-1 mr-8'>
				<div className='flex gap-5 justify-center items-center'>
					<SkipBack className='text-[#888] hover:text-foreground hover:cursor-pointer' />
					<div className='bg-primary p-2 rounded-full flex items-center justify-center'>
						<Pause className='flex items-center justify-center' color='#fff' />
					</div>
					<SkipForward className='text-[#888] hover:text-foreground hover:cursor-pointer' />
				</div>
				<div className='flex gap-2 items-center justify-center'>
					<span className='text-sm'>0:25</span>
					<span className='w-4/5 relative '>
						{/* <span
							className={cn(
								'absolute -translate-y-1/2 top-1/2  w-3 h-3 rounded-full bg-primary z-10',
								'left-[50%]'
							)}
						></span> */}
						{/* <Progress value={50} className='h-1' /> */}
						<Input type='range' className='h-1' />
					</span>
					<span className='text-sm'>4:25</span>
				</div>
			</div>
			<VolumeSection />
		</div>
	);
}

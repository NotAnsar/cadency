'use client';
import { Icons } from '@/components/icons/audio-icons';

export default function VolumeSkeleton() {
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

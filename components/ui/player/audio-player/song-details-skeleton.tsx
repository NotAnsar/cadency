import { Icons } from '@/components/icons/audio-icons';

export default function SongDetailsSkeleton() {
	return (
		<div className='flex gap-3 items-center '>
			<div className='w-14 h-14 bg-secondary rounded-sm' />
			<div className='hidden md:block'>
				<p className='text-sm font-medium h-[16px] w-[70px] bg-secondary mb-1' />
				<p className='text-sm bg-secondary h-[16px] w-[50px]' />
			</div>
		</div>
	);
}

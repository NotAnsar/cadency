'use client';

import { useMusicPlayerContext } from '@/context/music-player';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function SongDetails({ className }: { className?: string }) {
	const { songs, currentIndex } = useMusicPlayerContext();

	if (!songs[currentIndex]) {
		return <SongDetailsSkeleton className={className} />;
	}

	return (
		<div className={cn('flex gap-3 items-center flex-none', className)}>
			<Image
				src={songs[currentIndex].album.cover_medium}
				alt='n.h.i.e.'
				width={56}
				height={56}
				className='rounded-sm'
			/>

			<div className='hidden md:block'>
				<p className='text-sm font-medium'>{songs[currentIndex].title_short}</p>
				<p className='text-sm text-muted-foreground'>
					{songs[currentIndex].artist.name}
				</p>
			</div>
		</div>
	);
}

export function SongDetailsSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn('flex gap-3 items-center ', className)}>
			<div className='w-14 h-14 bg-secondary rounded-sm' />
			<div className='hidden md:block'>
				<p className='text-sm font-medium h-[16px] w-[70px] bg-secondary mb-1' />
				<p className='text-sm bg-secondary h-[16px] w-[50px]' />
			</div>
		</div>
	);
}

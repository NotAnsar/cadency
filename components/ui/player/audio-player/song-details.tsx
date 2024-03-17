'use client';

import { useMusicPlayerContext } from '@/context/music-player';
import { cn } from '@/lib/utils';
import { Disc } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SongDetails({ className }: { className?: string }) {
	const { songs, currentIndex } = useMusicPlayerContext();

	if (!songs[currentIndex]) {
		return <SongDetailsSkeleton className={className} />;
	}

	return (
		<div className={cn('flex gap-3 items-center flex-none', className)}>
			<Link href={`/player/album/${songs[currentIndex].album.id}`}>
				<Image
					src={songs[currentIndex].album.cover_medium}
					alt='n.h.i.e.'
					width={56}
					height={56}
					className='rounded-sm'
				/>
			</Link>

			<div className='hidden md:block'>
				<Link
					href={`/player/album/${songs[currentIndex].album.id}`}
					className='text-sm font-medium hover:underline block'
				>
					{songs[currentIndex].title_short}
				</Link>
				<div className='text-xs text-muted-foreground '>
					<div className='text-xs font-normal hover text-muted-foreground'>
						{songs[currentIndex].contributors ? (
							songs[currentIndex].contributors.map((a, i) => (
								<span key={a.id}>
									<Link
										href={`/player/artist/${a.id}`}
										className='hover:underline'
									>
										{a.name}
									</Link>
									{`${
										songs[currentIndex].contributors.length - 1 === i
											? ''
											: ', '
									}`}
								</span>
							))
						) : (
							<Link
								href={`/player/artist/${songs[currentIndex].artist.id}`}
								className='hover:underline'
							>
								{songs[currentIndex].artist.name}
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export function SongDetailsSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn('flex gap-3 items-center ', className)}>
			<div className='w-14 h-14 bg-secondary/50 rounded-sm flex items-center justify-center'>
				<Disc className='w-5 h-5 text-secondary' />
			</div>
		</div>
	);
}

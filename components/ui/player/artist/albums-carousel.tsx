'use client';
import { Album } from '@/types/music';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';

export default function AlbumsCarousel({
	albums,
	title = 'Albums',
	id,
}: {
	albums: Album[];
	title?: string;
	id: string;
}) {
	return (
		<div className='mt-10 w-[calc(100vw-8.5rem)] md:w-[calc(100vw-17rem)] max-w-[1460px]'>
			<Carousel opts={{ align: 'start' }} className='pr-4'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-2xl font-medium'>{title}</h1>

					{title === 'Albums' ? (
						<div className='flex border-2 border-border rounded-sm items-center'>
							<CarouselPrevious className='static border-none rounded-none translate-y-0' />
							<CarouselNext className='static border-none rounded-none translate-y-0' />
						</div>
					) : (
						<>
							<CarouselPrevious className='left-0 -translate-x-1/2 z-40' />
							<CarouselNext className='right-0 z-40' />
							<Link
								href={`/player/artist/${id}/all`}
								className='text-primary text-[15px] hover:underline font-semibold cursor-pointer'
							>
								View All
							</Link>
						</>
					)}
				</div>

				<CarouselContent>
					{albums.map((album) => (
						// album.explicit_lyrics
						<CarouselItem
							key={album.id}
							className='basis-44 mr-4  md:basis-52  '
						>
							<Link
								href={`/player/album/${album.id}`}
								className='rounded-md block border overflow-hidden '
							>
								<Image
									src={album.cover_medium}
									alt={album.title}
									width={170}
									height={170}
									className='rounded-md h-auto object-cover transition-all hover:scale-105 aspect-square cursor-pointer border-border w-auto'
								/>
							</Link>

							<Link
								href={`/player/album/${album.id}`}
								className='leading-none mt-2 text-nowrap whitespace-nowrap overflow-hidden text-[15px] font-medium block hover:underline cursor-pointer'
							>
								{album.title}
							</Link>

							<p className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden'>
								{album.release_date}
							</p>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}

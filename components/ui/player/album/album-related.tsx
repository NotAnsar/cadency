'use client';
import { Album, ArtistDetails } from '@/types/music';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';

export default function AlbumRelated({
	artists,
}: {
	artists: ArtistDetails[];
}) {
	return (
		<div className='mt-10 w-[calc(100vw-8.5rem)] md:w-[calc(100vw-17rem)] max-w-[1460px]'>
			<Carousel opts={{ align: 'start' }} className='pr-4'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-2xl font-medium'>You Might Also Like</h1>

					<div className='flex border-2 border-border rounded-sm items-center'>
						<CarouselPrevious className='static border-none rounded-none translate-y-0' />
						<CarouselNext className='static border-none rounded-none translate-y-0' />
					</div>
				</div>

				<CarouselContent>
					{artists.map((artist) => (
						// album.explicit_lyrics
						<CarouselItem
							key={artist.id}
							className='basis-40 md:basis-52 last:pl-4'
						>
							<div className='ml-4 flex flex-col items-center'>
								<Link
									href={`/player/artist/${artist.id}`}
									className='rounded-full block border overflow-hidden w-48 h-48  '
								>
									<Image
										src={artist.picture_medium}
										alt={artist.name}
										width={200}
										height={200}
										className='rounded-full object-cover transition-all hover:scale-105 aspect-square cursor-pointer border-border w-48 h-48'
									/>
								</Link>

								<Link
									href={`/player/artist/${artist.id}`}
									className='leading-none mt-4 text-pretty whitespace-nowrap overflow-hidden  font-medium block hover:underline cursor-pointer text-center'
								>
									{artist.name}
								</Link>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}

import { cn } from '@/lib/utils';
import { type Album } from '@/types/music';
import Image from 'next/image';
import Link from 'next/link';

type Prop = { albums: Album[]; classname?: string };

export default function WeeklyTopAlbums({ albums, classname = '' }: Prop) {
	return (
		<div className={cn('w-full', classname)}>
			<h2 className='text-xl font-medium mb-4 tracking-tight'>
				Weekly Top Albums
			</h2>

			<div className='grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4'>
				{albums.splice(0, 6).map((album: Album) => (
					<div key={album.id} className='col-span-1'>
						<Link
							href={`/player/album/${album.id}`}
							className='overflow-hidden rounded-md block border border-border'
						>
							<Image
								src={album.cover_medium}
								alt={album.title}
								width={170}
								height={170}
								className='rounded-md object-cover transition-all hover:scale-105 aspect-square cursor-pointer w-full h-auto'
							/>
						</Link>

						<Link
							href={`/player/album/${album.id}`}
							className='leading-none mt-2 text-nowrap whitespace-nowrap overflow-hidden text-[15px] font-medium block cursor-pointer hover:underline '
						>
							{album.title}
						</Link>

						<Link
							href={`/player/artist/${album.artist.id}`}
							// className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden hover:underline'
							className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden hover:underline cursor-pointer block leading-none'
						>
							{album.artist.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

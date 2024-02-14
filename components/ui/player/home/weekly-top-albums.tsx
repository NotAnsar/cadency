import { cn } from '@/lib/utils';
import { type Album } from '@/types/music';
import Image from 'next/image';
import Link from 'next/link';

type Prop = { albums: Album[]; classname?: string };

export default function WeeklyTopAlbums({ albums, classname = '' }: Prop) {
	return (
		<div className={cn('w-full', classname)}>
			<div className='flex justify-between items-center pr-2 mb-4'>
				<h2 className='text-xl font-medium mb-4 tracking-tight'>
					Weekly Top Albums
				</h2>
				<Link
					href={'/player'}
					className='text-sm text-primary hover:underline font-semibold'
				>
					View all
				</Link>
			</div>
			<div className='flex items-center justify-between h-[200px] overflow-y-hidden flex-wrap'>
				{albums.map((album: Album) => (
					<div key={album.id} className='w-[150px] h-[200px] mr-4'>
						<Link
							href={`/player/album/${album.id}`}
							className='overflow-hidden rounded-md block'
						>
							<Image
								src={album.cover_medium}
								alt={album.title}
								width={150}
								height={150}
								className='rounded-md h-auto object-cover transition-all hover:scale-105 aspect-square cursor-pointer'
							/>
						</Link>

						<Link
							href={`/player/album/${album.id}`}
							className='leading-none mt-2 text-nowrap whitespace-nowrap overflow-hidden text-[15px] font-medium block hover:underline cursor-pointer'
						>
							{album.title}
						</Link>

						<Link
							href={`/player/artist/${album.artist.id}`}
							className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden hover:underline'
						>
							{album.artist.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

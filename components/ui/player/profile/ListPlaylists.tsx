import { Album } from '@/types/music';
import { ListMusic } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../../button';

export default function ListPlaylists({ albums }: { albums: Album[] }) {
	if (albums.length === 0 || albums === null) {
		return (
			<div className='text-center mx-auto space-y-6 mb-8'>
				<ListMusic className='w-16 h-16 text-muted-foreground mx-auto' />
				<p className='text-muted-foreground'>
					{"This Profile doesn't have any playlists yet."}
				</p>
				<Button>Publish a Playlist</Button>
			</div>
		);
	}

	return (
		<div
			className='grid items-center gap-6 justify-center md:justify-normal'
			style={{ gridTemplateColumns: 'repeat(auto-fill, 150px)' }}
		>
			{albums.map((album) => (
				<div key={album.id} className='w-[150px] h-[200px] mr-4'>
					<div className='overflow-hidden rounded-md'>
						<Image
							src={album.cover_medium}
							alt={album.title}
							width={150}
							height={150}
							className='rounded-md h-auto object-cover transition-all hover:scale-105 aspect-square '
						/>
					</div>
					<p className='leading-none mt-2 text-nowrap whitespace-nowrap overflow-hidden text-[15px] font-medium'>
						{album.title}
					</p>

					<p className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden'>
						{album.artist.name}
					</p>
				</div>
			))}
		</div>
	);
}

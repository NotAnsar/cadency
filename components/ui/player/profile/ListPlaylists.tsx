import { ListMusic } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../../button';
import { getUserPlaylists } from '@/lib/db/playlist';
import Link from 'next/link';
import PlaylistModal from '../../playlist-modal/playlist-modal';

export default async function ListPlaylists() {
	const playlists = await getUserPlaylists();
	if (playlists === null || playlists === undefined || playlists.length === 0) {
		return (
			<div className='text-center mx-auto space-y-6 mb-8'>
				<ListMusic className='w-16 h-16 text-muted-foreground mx-auto' />
				<p className='text-muted-foreground'>
					{"This Profile doesn't have any playlists yet."}
				</p>
				<PlaylistModal>
					<Button>Publish a Playlist</Button>
				</PlaylistModal>
			</div>
		);
	}

	return (
		<div className='grid gap-6 grid-cols-6'>
			{playlists.map((playlist) => (
				<Link
					href={`/player/playlist/${playlist.id}`}
					key={playlist.id}
					className='cursor-pointer'
				>
					<div className='rounded-md overflow-hidden'>
						{playlist.image ? (
							<Image
								src={playlist.image}
								alt={playlist.name}
								width={150}
								height={150}
								className='rounded-md w-full h-auto object-cover transition-all hover:scale-105 aspect-square '
							/>
						) : (
							<div className='w-full h-auto aspect-square border border-border rounded-sm bg-secondary flex items-center justify-center hover:scale-105 object-cover transition-all '>
								<ListMusic className='w-12 h-12 md:w-16 md:h-16 text-muted-foreground' />
							</div>
						)}
					</div>
					<p className='leading-none mt-2 text-nowrap whitespace-nowrap overflow-hidden text-[15px] font-medium'>
						{playlist.name}
					</p>
				</Link>
			))}
		</div>
	);
}

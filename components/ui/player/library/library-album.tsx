import Image from 'next/image';
import Link from 'next/link';
import AlbumSkeleton from '../../skeleton/album-skeleton';
import { getLikedAlbums } from '@/lib/api/album';
import LibraryGridHeader from './library-grid-header';

export default async function LibraryAlbum() {
	const albums = await getLikedAlbums(5);
	if (!albums || albums.length === 0) return null;

	return (
		<LibraryGridHeader link='/player/library/albums' title='Favorite Albums'>
			{albums.map((album) => (
				<div key={album.id} className=''>
					<Link href={`/player/album/${album.id}`}>
						<Image
							alt={album.title}
							src={album.cover_medium}
							height={200}
							width={200}
							className='w-auto h-auto border border-border rounded-sm'
						/>
					</Link>
					<div>
						<p className='text-sm my-1 font-medium'>{album.title}</p>
						<span className='text-xs mb-1 text-muted-foreground block'>
							by&nbsp;
							<Link
								href={`/player/artist/${album.artist.id}`}
								className='hover:underline'
							>
								{album.artist.name}
							</Link>
						</span>
					</div>
				</div>
			))}
		</LibraryGridHeader>
	);
}

export function LibraryAlbumSkeleton() {
	return (
		<LibraryGridHeader link='/player/library/albums' title='Favorite Albums'>
			{Array.from({ length: 5 }).map((_, i) => (
				<AlbumSkeleton key={i} />
			))}
		</LibraryGridHeader>
	);
}

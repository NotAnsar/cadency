import Image from 'next/image';
import Link from 'next/link';
import ArtistSkeleton from '../../skeleton/artist-skeleton';
import { getFollowedArtists } from '@/lib/api/artist';
import LibraryGridHeader from './library-grid-header';

export default async function LibraryArtist() {
	const artists = await getFollowedArtists(5);

	if (!artists || artists.length === 0) return null;

	return (
		<LibraryGridHeader link='/player/library/artists' title='Followed Artists'>
			{artists.map((artist) => (
				<div key={artist.id} className=''>
					<Link href={`/player/artist/${artist.id}`}>
						<Image
							alt={artist.name}
							src={artist.picture_medium}
							height={200}
							width={200}
							className='w-auto h-auto border border-border rounded-full'
						/>
					</Link>

					<Link
						href={`/player/artist/${artist.id}`}
						className='hover:underline text-sm text-center block mt-2'
					>
						{artist.name}
					</Link>
					<p className='text-xs text-muted-foreground text-center'>
						{artist.nb_fan} fans
					</p>
				</div>
			))}
		</LibraryGridHeader>
	);
}

export function LibraryArtistSkeleton() {
	return (
		<LibraryGridHeader link='/player/library/artists' title='Followed Artists'>
			{Array.from({ length: 5 }).map((_, i) => (
				<ArtistSkeleton key={i} />
			))}
		</LibraryGridHeader>
	);
}

import NotFoundLibrary from '@/components/ui/player/library/not-found-library';
import AlbumSkeleton from '@/components/ui/skeleton/album-skeleton';
import { getLikedAlbums } from '@/lib/api/album';
import { DiscAlbum } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function page() {
	return (
		<>
			<h1 className='text-4xl font-semibold'>Your Favorite Albums</h1>

			<Suspense fallback={<Skeleton />}>
				<Albums />
			</Suspense>
		</>
	);
}

async function Albums() {
	const albums = await getLikedAlbums();

	return (
		<>
			{!albums || albums.length === 0 ? (
				<NotFoundLibrary
					Icon={DiscAlbum}
					message="You don't have any favorite albums."
				/>
			) : (
				<div className='my-6 grid grid-cols-3 md:grid-cols-5 gap-5'>
					{albums.map((album) => (
						<div key={album?.id} className=''>
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
				</div>
			)}
		</>
	);
}

function Skeleton() {
	return (
		<div className='my-6 grid grid-cols-3 md:grid-cols-5 gap-5'>
			{Array.from({ length: 6 }).map((_, i) => (
				<AlbumSkeleton key={i} />
			))}
		</div>
	);
}

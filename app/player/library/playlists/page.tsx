import NotFoundLibrary from '@/components/ui/player/library/not-found-library';
import PlaylistSkeleton from '@/components/ui/skeleton/playlist-skeleton';
import { getUserPlaylists } from '@/lib/db/playlist';
import { ListMusic, ListX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function page() {
	return (
		<>
			<h1 className='text-4xl font-semibold'>Your Playlists</h1>
			<Suspense fallback={<Skeleton />}>
				<PlaylistsCards />
			</Suspense>
		</>
	);
}

function Skeleton() {
	return (
		<div className='my-6 grid grid-cols-3 md:grid-cols-5 gap-5'>
			{Array.from({ length: 4 }).map((_, i) => (
				<PlaylistSkeleton key={i} />
			))}
		</div>
	);
}

async function PlaylistsCards() {
	const playlists = await getUserPlaylists();

	return (
		<>
			{!playlists || playlists.length === 0 ? (
				<NotFoundLibrary Icon={ListX} message='No playlists found.' />
			) : (
				<div className='my-6 grid grid-cols-3 md:grid-cols-5 gap-5'>
					{playlists.map((playlist) => (
						<div key={playlist?.id} className=''>
							<Link href={`/player/playlist/${playlist.id}`}>
								{playlist.image ? (
									<Image
										alt={playlist.name}
										src={playlist.image}
										height={200}
										width={200}
										className='w-full h-auto aspect-square border border-border rounded-sm object-cover'
									/>
								) : (
									<div className='w-full aspect-square border border-border rounded-sm bg-secondary flex items-center justify-center'>
										<ListMusic className='w-12 h-12 md:w-16 md:h-16 text-muted-foreground' />
									</div>
								)}
							</Link>
							<div>
								<Link
									href={`/player/playlist/${playlist.id}`}
									className='text-sm my-1 font-medium block'
								>
									{playlist.name}
								</Link>

								<span className='text-xs mb-1 text-muted-foreground block'>
									{playlist._count.tracks} Tracks
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}

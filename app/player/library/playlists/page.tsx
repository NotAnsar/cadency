import { getUserPlaylists } from '@/lib/db/playlist';
import { ListMusic } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function page() {
	const playlists = await getUserPlaylists();

	if (!playlists) notFound();

	return (
		<>
			<h1 className='text-4xl font-semibold'>Your Playlists</h1>

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
									className='w-auto h-auto aspect-square border border-border rounded-sm object-cover'
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
								created At&nbsp;
								{new Date(playlist.createdAt).toDateString()}
							</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

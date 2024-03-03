import { getLikedAlbums } from '@/lib/api/album';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function page() {
	const albums = await getLikedAlbums();

	if (!albums) notFound();

	return (
		<div className='px-8 py-6 mb-16'>
			<h1 className='text-4xl font-semibold'>Your Favorite Albums</h1>

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
		</div>
	);
}

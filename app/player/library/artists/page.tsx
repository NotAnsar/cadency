import { getArtist } from '@/lib/db';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function page() {
	const favorites = await getArtist('4050205');

	if (!favorites) {
		redirect('/player');
	}

	return (
		<div className='px-8 py-6 mb-16'>
			<h1 className='text-4xl font-semibold'>Followed Artists</h1>

			<div className='my-6 grid  grid-cols-3 md:grid-cols-5 gap-5'>
				{favorites.related.map((artist) => (
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
			</div>
		</div>
	);
}

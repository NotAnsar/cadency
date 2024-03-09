import { getFollowedArtists } from '@/lib/api/artist';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function page() {
	const artists = await getFollowedArtists();

	if (!artists) {
		notFound();
	}

	return (
		<>
			<h1 className='text-4xl font-semibold'>Followed Artists</h1>

			<div className='my-6 grid  grid-cols-3 md:grid-cols-5 gap-5'>
				{artists.map((artist) => (
					<div key={artist.id}>
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
		</>
	);
}

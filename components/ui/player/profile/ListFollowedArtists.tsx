import { getFollowedArtists } from '@/lib/api/artist';
import { UserRoundX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ListFollowedArtists() {
	const artists = await getFollowedArtists();

	if (artists === null || artists.length === 0) {
		return (
			<div className='text-center mx-auto space-y-6 mb-8'>
				<UserRoundX className='w-16 h-16 text-muted-foreground mx-auto' />
				<p className='text-muted-foreground'>
					{"You haven't followed any artists yet."}
				</p>
			</div>
		);
	}

	return (
		<div
			className='grid items-center gap-6 justify-center  md:justify-normal grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
			// style={{ gridTemplateColumns: 'repeat(auto-fill, 150px)' }}
		>
			{artists.map((artist) => (
				<div key={artist.id} className='col-span-1'>
					<Link
						href={`/player/artist/${artist.id}`}
						className='overflow-hidden rounded-full block border border-border mb-2'
					>
						<Image
							src={artist.picture_medium}
							alt={artist.name}
							width={160}
							height={160}
							className='w-full h-auto transition-all hover:scale-105'
						/>
					</Link>
					<Link
						href={`/player/artist/${artist.id}`}
						className='text-sm text-center hover:underline w-full block font-medium'
					>
						{artist.name}
					</Link>
				</div>
			))}
			{/* {artists.map((artist) => (
				<div key={artist.id} className='w-[150px] '>
					<div className='overflow-hidden rounded-md'>
						<Image
							src={artist.picture_medium}
							alt={artist.name}
							width={150}
							height={150}
							className='rounded-md h-auto object-cover transition-all hover:scale-105 aspect-square '
						/>
					</div>
					<p className='leading-none mt-3 text-nowrap whitespace-nowrap overflow-hidden text-[15px] font-medium'>
						{artist.name}
					</p>
				</div>
			))} */}
		</div>
	);
}

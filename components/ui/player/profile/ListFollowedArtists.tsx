import { Artist } from '@/types/music';
import { UserRoundX } from 'lucide-react';
import Image from 'next/image';

type Prop = { artists: Artist[] };

export default function ListFollowedArtists({ artists }: Prop) {
	if (artists.length === 0 || artists === null) {
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
			className='grid items-center gap-6 justify-center md:justify-normal'
			style={{ gridTemplateColumns: 'repeat(auto-fill, 150px)' }}
		>
			{artists.map((artist) => (
				<div key={artist.id} className='w-[150px] '>
					<div className='overflow-hidden rounded-md'>
						<Image
							src={artist.picture}
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
			))}
		</div>
	);
}

async function getFollowedArtists() {}

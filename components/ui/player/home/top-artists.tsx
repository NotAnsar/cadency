import { type Artist } from '@/types/music';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Prop = { artists: Artist[]; classname?: string };

export default function TopArtists({ artists, classname = '' }: Prop) {
	return (
		<div className={cn('w-full', classname)}>
			<h2 className='text-xl font-medium mb-4 tracking-tight'>Top Artists</h2>

			<div className='grid gap-4 grid-cols-4'>
				{artists.slice(0, 8).map((artist) => (
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
								className='w-auto h-auto transition-all hover:scale-105'
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
			</div>
		</div>
	);
}

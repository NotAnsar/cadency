import { type Artist } from '@/types/music';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Prop = { artists: Artist[]; classname?: string };

export default function TopArtists({ artists, classname = '' }: Prop) {
	return (
		<div className={cn('w-full', classname)}>
			<h2 className='text-xl font-medium mb-4 tracking-tight'>Top Artists</h2>

			<div
				className='grid gap-4  min-h-[168px] h-[320px] p-1 overflow-y-hidden  justify-between'
				style={{ gridTemplateColumns: 'repeat(auto-fill, 120px)' }}
			>
				{artists.map((artist) => (
					<div key={artist.id} className='text-center w-[120px] '>
						<Image
							src={artist.picture_medium}
							alt={artist.name}
							width={120}
							height={120}
							className='rounded-full mb-2 border-[3px] border-transparent outline-[3px] outline-primary outline '
						/>
						<p>{artist.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

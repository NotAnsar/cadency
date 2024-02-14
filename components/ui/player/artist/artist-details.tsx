import Image from 'next/image';
import { Button } from '../../button';
import { ArtistDetails } from '@/types/music';

export default function ArtistDetails({ artist }: { artist: ArtistDetails }) {
	return (
		<div className='flex gap-6'>
			<Image
				alt={artist.name}
				src={artist.picture_medium}
				width={180}
				height={180}
				className='rounded-full border border-border '
			/>
			<div className='flex flex-col justify-between mb-2'>
				<div>
					<p className='text-sm font-medium text-muted-foreground mb-1'>
						Artist
					</p>
					<p className='text-5xl font-bold'>{artist.name}</p>
				</div>
				<Button className='font-semibold text-base rounded-full py-6 w-40'>
					Follow
				</Button>
			</div>
		</div>
	);
}

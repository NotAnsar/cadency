import Image from 'next/image';
import { ArtistDetails } from '@/types/music';
import { getArtistInfo } from '@/lib/api/artist';
import FollowArtistButton from './follow-artist';
import { getUserFollowedArtists } from '@/lib/db/user';
import { Skeleton } from '../../skeleton';

export default async function ArtistDetails({ id }: { id: string }) {
	const [artist, followedArtists] = await Promise.all([
		getArtistInfo(id),
		getUserFollowedArtists(),
	]);

	if (!artist || !followedArtists) {
		throw Error('Cannot get Artist details');
	}

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
				<FollowArtistButton
					artistId={id}
					initialFollow={followedArtists.some((a) => a.artistId === artist.id)}
				/>
			</div>
		</div>
	);
}

export function ArtistDetailsSkeleton() {
	return (
		<div className='flex gap-6'>
			<Skeleton className='aspect-square w-[180px] h-[180px] rounded-full border border-border' />

			<div className='flex flex-col justify-between mb-2'>
				<div>
					<p className='text-sm font-medium text-muted-foreground mb-1'>
						Artist
					</p>

					<Skeleton className='aspect-square w-[180px] h-[48px] ' />
				</div>
				<Skeleton className='aspect-square w-[160px] h-[56px] rounded-lg border border-border mt-2' />
			</div>
		</div>
	);
}

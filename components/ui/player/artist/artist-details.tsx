'use client';
import Image from 'next/image';
import { Button } from '../../button';
import { ArtistDetails } from '@/types/music';
import { cn } from '@/lib/utils';
import { useOptimistic } from 'react';
import { toggleFollow } from '@/actions/user-actions';

export default function ArtistDetails({
	artist,
	initialFollow,
}: {
	artist: ArtistDetails;
	initialFollow: boolean;
}) {
	const [optimisticFollow, addOptimisticFollow] = useOptimistic(
		initialFollow,
		(state, _) => !state
	);

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

				<form
					action={async (formData) => {
						addOptimisticFollow(null);
						await toggleFollow(formData);
					}}
				>
					<input className='hidden' name='artistId' defaultValue={artist.id} />

					<Button
						className={cn(
							'font-semibold text-base text-white border-2 border-primary rounded-lg py-6 w-40 transition-all duration-300'
						)}
					>
						{optimisticFollow ? 'Following' : 'Follow'}
					</Button>
				</form>
			</div>
		</div>
	);
}

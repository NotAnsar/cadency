'use client';
import Image from 'next/image';
import { Button } from '../../button';
import { ArtistDetails } from '@/types/music';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import axios from 'axios';

export default function ArtistDetails({
	artist,
	isFollowing,
}: {
	artist: ArtistDetails;
	isFollowing: boolean;
}) {
	const [isFollowed, setisFollowed] = useState(isFollowing);

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

				<Button
					className={cn(
						'font-semibold text-base border-2 border-primary rounded-full py-6 w-40 transition-all duration-200',
						isFollowed ? 'bg-background' : 'bg-primary'
					)}
					onClick={async () => {
						try {
							const response = await axios.post('/api/artist/follow-toggle', {
								artistId: artist.id,
							});
							console.log(response.data.message);
							setisFollowed(response.data.message === 'followed');
							console.log(response.data);
						} catch (error) {
							console.log(error);
						}
					}}
				>
					{isFollowed ? 'Following' : 'Follow'}
				</Button>
			</div>
		</div>
	);
}

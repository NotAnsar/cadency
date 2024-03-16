'use client';

import { useOptimistic } from 'react';
import { Button } from '../../button';
import { cn } from '@/lib/utils';
import { toggleFollow } from '@/actions/user-actions';

export default function FollowArtistButton({
	artistId,
	initialFollow,
}: {
	artistId: string;
	initialFollow: boolean;
}) {
	const [optimisticFollow, addOptimisticFollow] = useOptimistic(
		initialFollow,
		(state, _) => !state
	);
	return (
		<form
			action={async (formData) => {
				addOptimisticFollow(null);
				await toggleFollow(formData);
				// await toggleFollow(artist.id,);
			}}
		>
			<input className='hidden' name='artistId' defaultValue={artistId} />

			<Button
				className={cn(
					'font-semibold text-base text-white border-2 border-primary rounded-lg py-6 w-40 transition-all duration-300'
				)}
			>
				{optimisticFollow ? 'Following' : 'Follow'}
			</Button>
		</form>
	);
}

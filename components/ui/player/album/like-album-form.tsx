'use client';

import { togglelikedAlbum } from '@/actions/user-actions';
import { cn } from '@/lib/utils';
import { useOptimistic } from 'react';
import { Icons } from '@/components/icons/audio-icons';

type Prop = { id: string; initialLiked: boolean };

export default function LikeAlbumForm({ initialLiked, id }: Prop) {
	const [optimisticLiked, addOptimisticLiked] = useOptimistic(
		initialLiked,
		(state, _) => !state
	);

	return (
		<form
			action={async (formData) => {
				addOptimisticLiked(null);
				await togglelikedAlbum(formData);
				// await togglelikedAlbum(formData,id,);
			}}
		>
			<button
				className='w-12 h-12 flex justify-center items-center  rounded-full cursor-pointer'
				type='submit'
			>
				<input className='hidden' name='albumId' defaultValue={id} />
				<Icons.heart
					className={cn(
						'h-7 w-7 hover:scale-110',
						optimisticLiked ? 'fill-primary text-primary' : null
					)}
				/>
			</button>
		</form>
	);
}

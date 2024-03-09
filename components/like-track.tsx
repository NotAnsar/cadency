'use client';
import { cn } from '@/lib/utils';
import { Icons } from './icons/audio-icons';
import { useOptimistic } from 'react';
import { togglelikedAlbum, togglelikedTrack } from '@/actions/user-actions';

export default function LikeTrack({
	className,
	trackId,
	isLiked,
	classNameLiked,
	classNameNotLiked,
}: {
	className?: string;
	classNameLiked?: string;
	classNameNotLiked?: string;
	trackId: string;
	isLiked: boolean;
}) {
	const [optimisticLiked, addOptimisticLiked] = useOptimistic(
		isLiked,
		(state, _) => !state
	);

	return (
		<form
			className='flex items-center justify-center'
			action={async (formData) => {
				addOptimisticLiked(null);
				await togglelikedTrack(formData);
			}}
		>
			<button type='submit'>
				<input className='hidden' name='trackId' defaultValue={trackId} />
				<Icons.heart
					className={cn(
						'h-5 w-5 cursor-pointer hover:scale-110 transition-all',
						className,
						optimisticLiked
							? cn('fill-primary text-primary', classNameLiked)
							: cn(classNameNotLiked)
					)}
				/>
			</button>
		</form>
	);
}

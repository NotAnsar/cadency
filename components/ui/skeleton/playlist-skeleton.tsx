import { Skeleton } from '../skeleton';

export default function PlaylistSkeleton() {
	return (
		<div>
			<Skeleton className='h-auto w-full aspect-square border border-border rounded-sm' />

			<div>
				<Skeleton className='h-[14px]  my-[6px] w-2/5 rounded-sm ' />
				<Skeleton className='h-[12px] mb-[6px]  w-1/4 border border-border rounded-sm ' />
			</div>
		</div>
	);
}

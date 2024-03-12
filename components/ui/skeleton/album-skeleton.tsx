import { Skeleton } from '../skeleton';

export default function AlbumSkeleton() {
	return (
		<div>
			<Skeleton className='h-auto w-full aspect-square border border-border rounded-sm' />

			<div>
				<Skeleton className='h-[16px] my-1 w-3/4 border border-border rounded-sm' />
				<Skeleton className='h-[14px] mb-1 w-1/2 border border-border rounded-sm' />
			</div>
		</div>
	);
}

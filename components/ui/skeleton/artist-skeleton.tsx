import { Skeleton } from '../skeleton';

export default function ArtistSkeleton() {
	return (
		<div>
			<Skeleton className='h-auto w-full aspect-square border border-border rounded-full' />

			<div>
				<Skeleton className='h-[14px] mt-2 w-2/3 border border-border rounded-sm mx-auto' />
				<Skeleton className='h-[12px] my-1 w-1/3 border border-border rounded-sm mx-auto' />
			</div>
		</div>
	);
}

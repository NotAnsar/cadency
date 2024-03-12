'use client';

import Records from './records';
import { Record } from '@/types/music';
import { useScroll } from '@/hooks/useScroll';
import { useCallback } from 'react';
import { getArtistRecords } from '@/actions/fetch-all-records';
import { Skeleton } from '@/components/ui/skeleton';

type Prop = { id: string; islast: boolean };

export default function LoadMoreRecords({ id, islast }: Prop) {
	const fun = useCallback((next: number) => getArtistRecords(id, next), [id]);
	const { isDone, ref, data } = useScroll<Record>(islast, fun);

	return (
		<>
			<Records records={data} />
			{!isDone ? (
				<div className='w-full' ref={ref}>
					<Skeleton className=' w-full border border-border h-auto aspect-square' />
					<Skeleton className=' h-4 w-2/3 my-2 ' />

					<Skeleton className='h-[14px] w-2/5 mt-[3px] mb-2' />
					<Skeleton className='h-3 w-1/5 px-2 py-1 rounded-sm' />
				</div>
			) : null}
		</>
	);
}

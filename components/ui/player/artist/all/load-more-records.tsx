'use client';

import Records from './records';
import { Record } from '@/types/music';
import { useScroll } from '@/hooks/useScroll';
import { useCallback } from 'react';
import { getArtistRecords } from '@/actions/fetch-all-records';

export default function LoadMoreRecords({
	id,
	islast,
}: {
	id: string;
	islast: boolean;
}) {
	const fun = useCallback((next: number) => getArtistRecords(id, next), [id]);
	const { isDone, ref, data } = useScroll<Record>(islast, fun);
	return (
		<>
			<Records records={data} />
			{!isDone ? <div ref={ref}>Loading</div> : null}
		</>
	);
}

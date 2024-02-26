'use client';

import { Record, getArtistRecords } from '@/actions/fetch-all-records';
import Records from './records';
import { useScroll } from '@/hooks/useScroll';
import { useCallback } from 'react';

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

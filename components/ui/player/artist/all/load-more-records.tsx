'use client';

import { Record, getArtistRecords } from '@/actions/fetch-all-records';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Records from './records';

export default function LoadMoreRecords({
	id,
	islast,
}: {
	id: string;
	islast: boolean;
}) {
	const [records, setRecords] = useState<Record[]>([]);
	const pageLoaded = useRef(1); // if i used state here useEffect load page twice in every mount
	const [isLastPage, setIsLastPage] = useState(islast);
	const { ref, inView } = useInView();

	useEffect(() => {
		const loadMoreRecords = async () => {
			const nextPage = pageLoaded.current + 1;

			const newRecords = await getArtistRecords(id, nextPage);
			if (newRecords) setRecords((prev) => [...prev, ...newRecords.data]);
			if (!newRecords?.next) setIsLastPage(true);
			pageLoaded.current++;
		};
		if (inView) {
			console.log('loading');
			loadMoreRecords();
		}
	}, [inView, id]);

	return (
		<>
			<Records records={records} />
			{!isLastPage ? <div ref={ref}>Loading</div> : null}
		</>
	);
}

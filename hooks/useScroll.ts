import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type DataType<T> = {
	data: T[];
	next?: string;
};

export const useScroll = <T>(
	islast: boolean,
	getData: (next: number) => Promise<DataType<T> | null> // should be Wrapped in useCallback
) => {
	const [data, setData] = useState<T[]>([]);
	const pageLoaded = useRef(1); // if i used state here useEffect load page twice in every mount
	const [isDone, setIsDone] = useState(islast);
	const { ref, inView } = useInView();

	useEffect(() => {
		const loadMoreRecords = async () => {
			const nextPage = pageLoaded.current + 1;

			const newData = await getData(nextPage);
			if (newData) {
				setData((prev) => [...prev, ...newData?.data]);
			}

			if (!newData?.next) setIsDone(true);
			pageLoaded.current++;
		};

		if (inView) loadMoreRecords();
	}, [inView, getData]);

	return { ref, isDone, data };
};

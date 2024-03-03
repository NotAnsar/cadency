import { getArtistRecords } from '@/actions/fetch-all-records';

import LoadMoreRecords from '@/components/ui/player/artist/all/load-more-records';
import Records from '@/components/ui/player/artist/all/records';

import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const res = await getArtistRecords(params.slug);

	if (!res) notFound();

	const { data: records } = res;

	return (
		<div className='px-8 py-8 mb-16'>
			<h1 className='text-4xl md:text-[40px] font-semibold mb-10'>
				All <span className='text-primary'>The Beatles</span> Records
			</h1>
			<div className='w-full grid grid-cols-3 md:grid-cols-4 gap-6'>
				<Records records={records} />
				<LoadMoreRecords id={params.slug} islast={!!!res.next} />
			</div>
		</div>
	);
}

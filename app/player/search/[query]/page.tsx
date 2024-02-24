import { searchAll } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { query: string } }) {
	const query = params.query;
	const res = await searchAll(query);

	if (!res) {
		notFound();
	}

	return <div>page</div>;
}

const settingNav = [
	{ path: '/player/search', label: 'All' },
	{ path: '/player/search/appearance', label: 'Artist' },
	{ path: '/player/search/billing', label: 'Albums' },
	{ path: '/player/search/close-account', label: 'Songs' },
];

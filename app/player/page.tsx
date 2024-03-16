import TopArtists from '@/components/ui/player/home/top-artists';
import TrendingSongs from '@/components/ui/player/home/trending-songs';
import WeeklyTopAlbums from '@/components/ui/player/home/weekly-top-albums';
import { getChart } from '@/lib/api/chart';

export default async function Page() {
	const res = await getChart();

	return (
		<main className='px-8 pt-6 pb-20'>
			<WeeklyTopAlbums albums={res?.albums} classname='mb-4' />
			<div className='gap-8 grid md:grid-cols-7 w-full md:gap-12'>
				<TopArtists artists={res?.artists} classname='md:col-span-4' />
				<TrendingSongs songs={res?.tracks} classname='md:col-span-3' />
			</div>
		</main>
	);
}

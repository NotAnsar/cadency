import TopArtists from '@/components/ui/player/home/top-artists';
import TrendingSongs from '@/components/ui/player/home/trending-songs';
import WeeklyTopAlbums from '@/components/ui/player/home/weekly-top-albums';
import { getChart } from '@/lib/db';
import { Chart } from '@/types/music';

export default async function page() {
	const { albums, tracks, artists }: Chart = await getChart();

	return (
		<main className='px-8 pt-6 pb-20'>
			<WeeklyTopAlbums albums={albums} classname='mb-4' />
			<div className='gap-8 grid md:grid-cols-5 w-full md:gap-12'>
				<TopArtists artists={artists} classname='md:col-span-3' />
				<TrendingSongs songs={tracks} classname='md:col-span-2 w-full' />
			</div>
		</main>
	);
}

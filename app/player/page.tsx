import TopArtists from '@/components/ui/player/home/top-artists';
import TrendingSongs from '@/components/ui/player/home/trending-songs';
import WeeklyTopAlbums from '@/components/ui/player/home/weekly-top-albums';
import { Chart } from '@/types/music';
import axios from 'axios';

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

export async function getChart() {
	const options = {
		method: 'GET',
		url: 'https://api.deezer.com/chart',
	};

	try {
		const response = await axios.request(options);

		const { tracks, albums, artists } = response.data;

		return { tracks: tracks.data, albums: albums.data, artists: artists.data };
	} catch (error) {
		console.log(error);

		return { tracks: null, albums: null, artists: null };
	}
}
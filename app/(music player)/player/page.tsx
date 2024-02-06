import TrendingSongs from '@/components/ui/player/home/trending-songs';
import WeeklyTopAlbums from '@/components/ui/player/home/weekly-top-albums';
import axios from 'axios';

type Track = {
	key: string;
	title: string;
	subtitle: string;
	image: string;
	text: string;
};

export default async function page() {
	const topTracks: Track[] = await getTracks();

	return (
		<main className='px-8 pt-6 pb-20'>
			<div className='flex gap-4 '>
				<WeeklyTopAlbums albums={topTracks} />
				<TrendingSongs songs={topTracks} />
			</div>
		</main>
	);
}

async function getTracks() {
	const options = {
		method: 'GET',
		url: 'https://shazam.p.rapidapi.com/charts/track',
		params: {
			locale: 'en-US',
			pageSize: '10',
			startFrom: '0',
		},
		headers: {
			'X-RapidAPI-Key': 'fd1542c2b5msh33bb4346e51550dp199e85jsnc23e56a2c244',
			'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		return response.data.tracks.map((track: any) => ({
			key: track.key,
			title: track.title,
			subtitle: track.subtitle,
			image: track.images.coverart,
			text: track.share.text,
		}));
	} catch (error) {
		return null;
	}
}

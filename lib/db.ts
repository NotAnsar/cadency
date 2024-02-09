import axios from 'axios';

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

import axios from 'axios';
import { url } from './url';

export async function getChart() {
	const response = await axios.get(`${url}/chart`);

	if (response.data.error) {
		throw new Error(response.data.error.message);
	}

	const { tracks, albums, artists } = response.data;

	return { tracks: tracks.data, albums: albums.data, artists: artists.data };
}

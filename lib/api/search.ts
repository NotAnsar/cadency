import axios from 'axios';
import { url } from './url';
import { AlbumDetails, ArtistDetails, Track } from '@/types/music';

export async function searchAll(search: string) {
	try {
		const [res1, res2, res3] = await Promise.all([
			searchArtist(search),
			searchAlbum(search),
			searchSong(search),
		]);

		if (res1.error) {
			console.error('error 1');
			throw new Error(res1.data.error);
		}
		if (res2.error) {
			console.error('error 2');
			throw new Error(res2.data.error);
		}
		if (res3.error) {
			console.error('error 3');
			throw new Error(res3.data.error);
		}
		const artists: ArtistDetails[] = res1.data;
		const albums: AlbumDetails[] = res2.data;
		const songs: Track[] = res3.data;

		return { artists, albums, songs };
	} catch (error) {
		console.error('error', error);

		return null;
	}
}

async function searchArtist(search: string, limit: number = 5) {
	const response = await axios.get(
		`${url}/search/artist?q=${search}&limit=${limit}`
	);
	return response.data;
}

async function searchAlbum(search: string, limit: number = 5) {
	const response = await axios.get(
		`${url}/search/album?q=${search}&limit=${limit}`
	);
	return response.data;
}

async function searchSong(search: string, limit: number = 5) {
	const response = await axios.get(
		`${url}/search/track?q=${search}&limit=${limit}`
	);
	return response.data;
}

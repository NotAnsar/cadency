import { Album, AlbumDetails, ArtistDetails, Track } from '@/types/music';
import axios from 'axios';

export const url = 'https://api.deezer.com';
export async function getChart() {
	const options = {
		method: 'GET',
		url: `${url}/chart`,
	};

	try {
		const response = await axios.request(options);

		if (response.data.error) {
			throw new Error(response.data.error);
		}

		const { tracks, albums, artists } = response.data;

		return { tracks: tracks.data, albums: albums.data, artists: artists.data };
	} catch (error) {
		console.log(error);

		return { tracks: null, albums: null, artists: null };
	}
}

export async function getAlbum(id: string) {
	const options = {
		method: 'GET',
		url: `${url}/album/${id}`,
	};

	try {
		const response = await axios.request(options);

		if (response.data.error) {
			throw new Error(response.data.error);
		}
		const album: AlbumDetails = response.data;

		return album;
	} catch (error) {
		console.log('error', error);

		return null;
	}
}

async function getArtistDetails(id: string): Promise<any> {
	const response = await axios.get(`${url}/artist/${id}`);
	return response.data;
}
async function getArtistTopSongs(id: string): Promise<any> {
	const response = await axios.get(`${url}/artist/${id}/top?limit=10`);
	return response.data;
}
async function getArtistAlbums(id: string): Promise<any> {
	const response = await axios.get(`${url}/artist/${id}/albums?limit=50`);
	return response.data;
}
async function getArtistRelated(id: string): Promise<any> {
	const response = await axios.get(`${url}/artist/${id}/related?limit=10`);
	return response.data;
}

export async function getArtist(id: string) {
	try {
		const [res1, res2, res3, res4] = await Promise.all([
			getArtistDetails(id),
			getArtistTopSongs(id),
			getArtistAlbums(id),
			getArtistRelated(id),
		]);

		if (res1.error) {
			console.log('error 1');
			throw new Error(res1.data.error);
		}
		if (res2.error) {
			console.log('error 2');
			throw new Error(res2.data.error);
		}
		if (res3.error) {
			console.log('error 3');
			throw new Error(res3.data.error);
		}
		if (res4.error) {
			console.log('error 4');
			throw new Error(res4.data.error);
		}

		const artist: ArtistDetails = res1;
		const songs: Track[] = res2.data;
		const albumsRes: Album[] = res3.data;
		const related: ArtistDetails[] = res4.data;

		const albums = albumsRes
			.filter((item) => item.record_type === 'album')
			.map((item) => ({
				id: item.id,
				title: item.title,
				cover_medium: item.cover_medium,
				release_date: item.release_date,
				explicit_lyrics: item.explicit_lyrics,
				artist: { ...artist },
			}));

		const singles = albumsRes
			.filter((item) => item.record_type !== 'album')
			.map((item) => ({
				id: item.id,
				title: item.title,
				cover_medium: item.cover_medium,
				release_date: item.release_date,
				explicit_lyrics: item.explicit_lyrics,
				artist: { ...artist },
			}));

		return { artist, songs, albums, singles, related };
	} catch (error) {
		console.log('error', error);

		return null;
	}
}

// const urls = [
// 	`${url}/artist/${id}/related`, // get related artist top 5 album
// ];

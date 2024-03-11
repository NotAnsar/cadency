import { url } from './url';
import { Album, ArtistDetails, RecordResponse, Track } from '@/types/music';
import axios from 'axios';
import { getUserFollowedArtists } from '../db/user';

export async function getFollowedArtists() {
	try {
		const followedArtists = await getUserFollowedArtists();
		if (!followedArtists) throw new Error('unauthorized');

		const artistsInfoPromises = followedArtists.map((artist) =>
			getArtistDetails(artist.artistId + '')
		);

		const followedArtistsInfo = await Promise.all(artistsInfoPromises);
		return followedArtistsInfo as ArtistDetails[];
	} catch (error) {
		return null;
	}
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
		if (res4.error) {
			console.error('error 4');
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
		console.error('error', error);

		return null;
	}
}

export async function getArtistInfo(id: string) {
	try {
		const res = await axios.get(`${url}/artist/${id}`);

		if (res.data.error) throw new Error();

		return res.data as ArtistDetails;
	} catch (error) {
		return null;
	}
}
async function getArtistDetails(id: string) {
	const response = await axios.get(`${url}/artist/${id}`);
	if (response.data.error) {
		return null;
	}
	return response.data;
}

async function getArtistTopSongs(id: string) {
	const response = await axios.get(`${url}/artist/${id}/top?limit=10`);
	return response.data;
}

async function getArtistAlbums(id: string) {
	const response = await axios.get(`${url}/artist/${id}/albums?limit=50`);
	return response.data;
}

async function getArtistRelated(id: string) {
	const response = await axios.get(`${url}/artist/${id}/related?limit=10`);
	return response.data;
}

// export async function getArtistRecords(
// 	id: string,
// 	page: number = 1,
// 	limit: number = 10
// ): Promise<RecordResponse | null> {
// 	try {
// 		const index = (page - 1) * limit;
// 		const response = await axios.get(
// 			`${url}/artist/${id}/albums?limit=${limit}&index=${index}`
// 		);

// 		const data = response.data;

// 		if (data.error) throw new Error(data.error);

// 		return data;
// 	} catch (error) {
// 		console.error(error);

// 		return null;
// 	}
// }

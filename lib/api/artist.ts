import { url } from './url';
import { Album, ArtistDetails, RecordResponse, Track } from '@/types/music';
import axios from 'axios';
import { getUserFollowedArtists } from '../db/user';

export async function getFollowedArtists(limit?: number) {
	try {
		const followedArtists = await getUserFollowedArtists(limit);
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

export async function getArtistAlbums(id: string) {
	try {
		const res = await axios.get(`${url}/artist/${id}/albums?limit=50`);

		if (res.data.error) {
			throw new Error(res.data.error);
		}

		const albumsRes: Album[] = res.data.data;

		const albums = albumsRes
			.filter((item) => item.record_type === 'album')
			.map((item) => ({
				id: item.id,
				title: item.title,
				cover_medium: item.cover_medium,
				release_date: item.release_date,
				explicit_lyrics: item.explicit_lyrics,
			}));

		const singles = albumsRes
			.filter((item) => item.record_type !== 'album')
			.map((item) => ({
				id: item.id,
				title: item.title,
				cover_medium: item.cover_medium,
				release_date: item.release_date,
				explicit_lyrics: item.explicit_lyrics,
			}));

		return { singles, albums };
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

export async function getArtistTopSongs(id: string) {
	try {
		const res = await axios.get(`${url}/artist/${id}/top?limit=10`);

		if (res.data.error) throw new Error('cannot find artist top songs');

		return res.data.data as Track[];
	} catch (error) {
		return null;
	}
}

export async function getArtistRelated(id: string) {
	try {
		const res = await axios.get(`${url}/artist/${id}/related?limit=10`);

		if (res.data.error) throw new Error('cannot find artist top songs');

		return res.data.data as ArtistDetails[];
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

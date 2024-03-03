import axios from 'axios';
import { url } from './url';
import { AlbumDetails } from '@/types/music';
import { getUserLikedAlbums } from '../db/user';

export async function getAlbum(id: string) {
	try {
		const response = await axios.get(`${url}/album/${id}`);

		if (response.data.error) {
			throw new Error(response.data.error);
		}
		const album: AlbumDetails = response.data;

		return album;
	} catch (error) {
		console.error('error', error);

		return null;
	}
}

export async function getLikedAlbums() {
	try {
		const likedAlbums = await getUserLikedAlbums();
		if (!likedAlbums) throw new Error('unauthorized');

		const artistsInfoPromises = likedAlbums.map((album) =>
			getAlbumDetails(album.albumId + '')
		);

		const data = await Promise.all(artistsInfoPromises);
		return data;
	} catch (error) {
		return null;
	}
}

async function getAlbumDetails(id: string) {
	const response = await axios.get(`${url}/album/${id}`);

	if (response.data.error) {
		throw new Error(response.data.error);
	}
	const album: AlbumDetails = response.data;

	return album;
}

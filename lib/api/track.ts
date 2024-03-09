import axios from 'axios';
import { getUserLikedTracks } from '../db/user';
import { url } from './url';
import { Track } from '@/types/music';

export async function getLikedTracks() {
	try {
		const likedTracks = await getUserLikedTracks();
		if (!likedTracks) throw new Error('unauthorized');

		const likedTracksInfoPromises = likedTracks.map((track) =>
			getTrackDetails(track)
		);

		const likedTracksInfo = await Promise.all(likedTracksInfoPromises);
		return likedTracksInfo as Track[];
	} catch (error) {
		return null;
	}
}

async function getTrackDetails(track: {
	userId: string;
	trackId: string;
	createdAt: Date;
}) {
	const response = await axios.get(`${url}/track/${track.trackId}`);
	return { ...response.data, createdAt: track.createdAt };
}

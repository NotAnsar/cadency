import axios from 'axios';
import { url } from './url';
import { getPlaylist } from '../db/playlist';
import { Track } from '@/types/music';
import { TracksDB } from '@/types/playlist';

export type PlaylistTrack = Track & TracksDB;
export async function getPlaylistTracks(id: string) {
	try {
		const playlist = await getPlaylist(id);
		if (!playlist) throw new Error('Something went wrong');

		const playlistTracksInfoPromises = playlist.tracks.map((track) =>
			getTrackDetails(track)
		);

		const playlistTracksInfo = await Promise.all(playlistTracksInfoPromises);
		return playlistTracksInfo as PlaylistTrack[];
	} catch (error) {
		return null;
	}
}

async function getTrackDetails(track: {
	id: string;
	playlistId: string;
	trackId: string;
	createdAt: Date;
	updatedAt: Date;
}) {
	const response = await axios.get(`${url}/track/${track.trackId}`);
	return { ...track, ...response.data };
}

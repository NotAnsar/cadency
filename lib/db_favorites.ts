import { getCurrentUserData } from '@/actions/user-actions';
import { getArtistDetails } from './db';
import { ArtistDetails } from '@/types/music';

export async function getFollowedArtists() {
	try {
		const user = await getCurrentUserData();
		if (!user) throw new Error('unauthorized');

		const artistsInfoPromises = user?.followedArtists.map((artist) =>
			getArtistDetails(artist.artistId + '')
		);

		const followedArtistsInfo = await Promise.all(artistsInfoPromises);
		return followedArtistsInfo as ArtistDetails[];
	} catch (error) {
		return null;
	}
}

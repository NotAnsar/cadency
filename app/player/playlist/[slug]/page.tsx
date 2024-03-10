import PlaylistControl from '@/components/ui/player/playlist/playlist-control';
import PlaylistDetails from '@/components/ui/player/playlist/playlist-details';
import PlaylistSongs from '@/components/ui/player/playlist/playlist-songs';
import { getPlaylistTracks } from '@/lib/api/playlist';
import { getPlaylist } from '@/lib/db/playlist';
import { getUserLikedTracks } from '@/lib/db/user';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const [playlist, playlistTracks, likedTracks] = await Promise.all([
		getPlaylist(params.slug),
		getPlaylistTracks(params.slug),
		getUserLikedTracks(),
	]);

	if (!playlist) {
		notFound();
	}

	return (
		<div className='px-8 py-6'>
			<PlaylistDetails playlist={playlist} />
			<PlaylistControl playlist={playlist} />
			{playlistTracks && likedTracks && (
				<PlaylistSongs
					tracks={playlistTracks}
					likedTracks={likedTracks}
					playlistId={params.slug}
				/>
			)}
		</div>
	);
}

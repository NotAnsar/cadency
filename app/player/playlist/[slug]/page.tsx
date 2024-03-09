import AlbumControl from '@/components/ui/player/album/album-control';
import AlbumDetails from '@/components/ui/player/album/album-details';
import AlbumSongs from '@/components/ui/player/album/album-songs';
import PlaylistControl from '@/components/ui/player/playlist/playlist-control';
import PlaylistDetails from '@/components/ui/player/playlist/playlist-details';
import { getAlbum } from '@/lib/api/album';
import { getPlaylist } from '@/lib/db/playlist';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const playlist = await getPlaylist(params.slug);

	if (!playlist) {
		notFound();
	}

	return (
		<div className='px-8 py-6'>
			<PlaylistDetails playlist={playlist} />
			<PlaylistControl playlist={playlist} />
			{/*
			<AlbumSongs
				label={album.label}
				title={album.title}
				tracks={album.tracks.data}
			/> */}
		</div>
	);
}

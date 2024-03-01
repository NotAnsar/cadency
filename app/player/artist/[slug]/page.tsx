import { getCurrentUserData } from '@/actions/user-actions';
import AlbumRelated from '@/components/ui/player/album/album-related';
import AlbumsCarousel from '@/components/ui/player/artist/albums-carousel';
import ArtistDetails from '@/components/ui/player/artist/artist-details';
import PopularSongs from '@/components/ui/player/artist/popular-songs';
import { getArtist } from '@/lib/db';

import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const res = await getArtist(params.slug);
	const user = await getCurrentUserData();

	if (!res || !user) notFound();

	const { artist, songs, albums, singles, related } = res;

	return (
		<div className='px-8 py-6 mb-10'>
			<ArtistDetails
				artist={artist}
				initialFollow={user.followedArtists.some(
					(a) => a.artistId === artist.id
				)}
			/>
			{songs.length ? <PopularSongs songs={songs} /> : null}
			{albums.length ? (
				<AlbumsCarousel id={params.slug} albums={albums} />
			) : null}
			{singles.length ? (
				<AlbumsCarousel
					id={params.slug}
					albums={singles}
					title='Singles And Eps'
				/>
			) : null}
			{related.length ? <AlbumRelated artists={related} /> : null}
		</div>
	);
}

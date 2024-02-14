import AlbumsCarousel from '@/components/ui/player/artist/albums-carousel';
import ArtistDetails from '@/components/ui/player/artist/artist-details';
import PopularSongs from '@/components/ui/player/artist/popular-songs';
import { getArtist } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: { slug: string } }) {
	const res = await getArtist(params.slug);

	if (!res) notFound();

	const { artist, songs, albums, singles } = res;

	return (
		<div className='px-8 py-6 mb-10'>
			<ArtistDetails artist={artist} />
			<PopularSongs songs={songs} />
			<AlbumsCarousel id={params.slug} albums={albums} />
			<AlbumsCarousel
				id={params.slug}
				albums={singles}
				title='Singles And Eps'
			/>
			{/* Add Related Artist */}
		</div>
	);
}

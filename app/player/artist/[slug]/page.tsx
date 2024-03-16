import ArtistRelated, {
	ArtistRelatedSkeleton,
} from '@/components/ui/player/artist/artist-related';

import ArtistDetails, {
	ArtistDetailsSkeleton,
} from '@/components/ui/player/artist/artist-details';
import PopularSongs, {
	PopularSongsSkeleton,
} from '@/components/ui/player/artist/popular-songs';

import { Suspense } from 'react';
import ArtistAlbumsSingles, {
	ArtistAlbumsSinglesSkeleton,
} from '@/components/ui/player/artist/artist-albums-singles';

export default async function page({ params }: { params: { slug: string } }) {
	return (
		<div className='px-8 py-6 mb-10'>
			<Suspense fallback={<ArtistDetailsSkeleton />}>
				<ArtistDetails id={params.slug} />
			</Suspense>

			<Suspense fallback={<PopularSongsSkeleton />}>
				<PopularSongs id={params.slug} />
			</Suspense>

			<Suspense fallback={<ArtistAlbumsSinglesSkeleton />}>
				<ArtistAlbumsSingles id={params.slug} />
			</Suspense>

			<Suspense fallback={<ArtistRelatedSkeleton />}>
				<ArtistRelated id={params.slug} />
			</Suspense>
		</div>
	);
}

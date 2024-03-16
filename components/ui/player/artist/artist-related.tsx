import { getArtistRelated } from '@/lib/api/artist';
import RelatedArtistsCarousel from '../album/related-artists-carousel';
import { Skeleton } from '../../skeleton';

export default async function ArtistRelated({ id }: { id: string }) {
	const artists = await getArtistRelated(id);

	if (!artists) throw new Error('Cannot Get Related Artists');
	if (artists.length === 0) {
		return null;
	}

	return (
		<div className='mt-10 w-[calc(100vw-8.5rem)] md:w-[calc(100vw-17rem)] max-w-[1460px]'>
			<RelatedArtistsCarousel artists={artists} />
		</div>
	);
}
export function ArtistRelatedSkeleton() {
	return (
		<div className='mt-10 '>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-medium'>You Might Also Like</h1>
				<Skeleton className='w-16 h-8 cursor-pointer' />
			</div>
			<div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className=''>
						<div className='flex flex-col items-center'>
							<Skeleton className='rounded-full object-cover transition-all hover:scale-105 aspect-square cursor-pointer border-border w-full h-auto' />

							<Skeleton className='mt-4 h-4 w-16' />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

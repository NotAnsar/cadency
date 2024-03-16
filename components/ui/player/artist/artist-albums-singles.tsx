import { getArtistAlbums } from '@/lib/api/artist';
import AlbumsCarousel from './albums-carousel';
import { Skeleton } from '../../skeleton';

export default async function ArtistAlbumsSingles({ id }: { id: string }) {
	const res = await getArtistAlbums(id);

	return (
		<>
			{res?.albums && res?.albums.length !== 0 ? (
				<AlbumsCarousel id={id} albums={res?.albums} />
			) : null}
			{res?.singles && res?.singles.length !== 0 ? (
				<AlbumsCarousel id={id} albums={res?.singles} title='Singles And Eps' />
			) : null}
		</>
	);
}

export function ArtistAlbumsSinglesSkeleton() {
	return (
		<>
			<AlbumsCarouselSkeleton />
			<AlbumsCarouselSkeleton title='Singles And Eps' />
		</>
	);
}
export function AlbumsCarouselSkeleton({
	title = 'Albums',
}: {
	title?: string;
}) {
	return (
		<div className='mt-10 pr-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-medium'>{title}</h1>

				{title === 'Albums' ? (
					<Skeleton className='w-16 h-8 cursor-pointer' />
				) : (
					<>
						<span className='text-primary text-[15px] hover:underline font-semibold cursor-pointer'>
							View All
						</span>
					</>
				)}
			</div>
			<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i}>
						<Skeleton className='rounded-md w-full h-auto aspect-square border border-border ' />

						<Skeleton className='mt-2 h-[15px] w-2/5' />

						<Skeleton className='h-[14px] mt-1 w-1/4' />
					</div>
				))}
			</div>
		</div>
	);
}

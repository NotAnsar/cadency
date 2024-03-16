import SongsTable from './songs-table';
import { getArtistTopSongs } from '@/lib/api/artist';
import { getUserLikedTracks } from '@/lib/db/user';
import { getUserPlaylists } from '@/lib/db/playlist';
import { Skeleton } from '../../skeleton';
import { Icons } from '@/components/icons/audio-icons';
import { ListPlus } from 'lucide-react';

export default async function PopularSongs({ id }: { id: string }) {
	const [songs, likedTracks, playlists] = await Promise.all([
		getArtistTopSongs(id),
		getUserLikedTracks(),
		getUserPlaylists(),
	]);

	if (!songs || !playlists || !likedTracks) {
		throw new Error('cannot find artist top songs');
	}

	return (
		<div className='mt-10'>
			<h1 className='text-2xl font-medium mb-6'>Popular Songs</h1>
			<SongsTable
				songs={songs}
				playlists={playlists}
				likedTracks={likedTracks}
			/>
		</div>
	);
}

export function PopularSongsSkeleton() {
	return (
		<div className='mt-10'>
			<h1 className='text-2xl font-medium mb-6'>Popular Songs</h1>
			<div className='font-medium'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className='border-b transition-colors hover:bg-muted/50 flex items-center w-auto justify-between group'
					>
						<div className='flex items-center'>
							<p className='p-4 align-middle text-sm w-[50px]'>{i + 1}</p>

							<Skeleton className='w-10 h-10 rounded-sm' />

							<div className='ml-4'>
								<Skeleton className='h-[15px] w-32 my-1' />
								<div className='text-xs font-normal hover text-muted-foreground flex gap-1'>
									<Skeleton className='h-[15px] w-[55px]' />
									<Skeleton className='h-[15px] w-[40px] ' />
								</div>
							</div>
						</div>

						<div className='flex items-center gap-6 mr-4'>
							<Icons.heart
								className={'h-5 w-5 animate-pulse rounded-md text-muted'}
							/>

							<Skeleton className='w-[40px] h-[18px]' />
							<ListPlus
								className={'h-5 w-5 animate-pulse rounded-md text-muted'}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

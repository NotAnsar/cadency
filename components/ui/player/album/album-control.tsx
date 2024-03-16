import { Icons } from '@/components/icons/audio-icons';
import LikeAlbumForm from './like-album-form';
import { getUserLikedAlbums } from '@/lib/db/user';
import { Skeleton } from '../../skeleton';
import PlayAlbum from './play-album';
import { Track } from '@/types/music';

type Prop = { id: string; tracks: Track[] };

export default async function AlbumControl({ id, tracks }: Prop) {
	const likedAlbums = await getUserLikedAlbums();

	if (!likedAlbums) {
		throw new Error('Cannot get data');
	}

	return (
		<div className='my-6 flex gap-4'>
			<PlayAlbum albumId={id} tracks={tracks} />

			<LikeAlbumForm
				id={id}
				initialLiked={likedAlbums.some((a) => a.albumId === +id)}
			/>
		</div>
	);
}

export function AlbumControlSkeleton() {
	return (
		<div className='my-6 flex gap-4'>
			<Skeleton className='w-32 h-12 rounded-md cursor-pointer' />

			<div className='w-12 h-12 flex justify-center items-center  rounded-full cursor-pointer'>
				<Icons.heart
					className={'h-7 w-7 animate-pulse rounded-md text-muted'}
				/>
			</div>
		</div>
	);
}

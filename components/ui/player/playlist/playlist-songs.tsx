import { Clock3, X } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn, formatSongTime } from '@/lib/utils';
import LikeTrack from '@/components/like-track';
import { getPlaylistTracks } from '@/lib/api/playlist';
import { deletePlaylistSong } from '@/actions/playlist-action';
import { getUserLikedTracks } from '@/lib/db/user';

export default async function PlaylistSongs({
	playlistId,
}: {
	playlistId: string;
}) {
	const [tracks, likedTracks] = await Promise.all([
		getPlaylistTracks(playlistId),
		getUserLikedTracks(),
	]);

	if (!likedTracks || !tracks) throw Error('Cannot fetch Songs');

	if (tracks.length === 0) {
		return <p>No tracks was Found</p>;
	}

	return (
		<Table className='mb-12'>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[10px]'>#</TableHead>
					<TableHead>Song</TableHead>

					<TableHead>Album</TableHead>
					<TableHead className='w-[52px]'> </TableHead>
					<TableHead className='w-10'>
						<Clock3 width={16} height={16} className='ml-auto' />
					</TableHead>
					<TableHead className='w-[52px]'> </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{tracks.map((song, i) => (
					<TableRow key={song.id} className='group'>
						<TableCell className='font-medium'>
							<div>
								{/* <Icons.play className='hidden hover:block w-5 h-5 ' />  */}
								<span>{i + 1}</span>
							</div>
						</TableCell>
						<TableCell>{song.title_short}</TableCell>

						<TableCell>{song.album.title}</TableCell>
						<TableCell>
							<LikeTrack
								trackId={song.id + ''}
								isLiked={likedTracks?.some((a) => a.trackId === song.id + '')}
								classNameNotLiked='invisible group-hover:visible'
								key={likedTracks.toString()}
							/>
						</TableCell>
						<TableCell className='text-right'>
							{formatSongTime(song.duration)}
						</TableCell>
						<TableCell>
							<form
								className='flex items-center justify-center'
								action={deletePlaylistSong}
							>
								<input
									className='hidden'
									name='trackId'
									defaultValue={song.id}
								/>
								<input
									className='hidden'
									name='playlistId'
									defaultValue={playlistId}
								/>
								<button type='submit'>
									<X
										className={cn(
											'h-5 w-5 cursor-pointer hover:scale-110 transition-all',
											'invisible group-hover:visible'
										)}
									/>
								</button>
							</form>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

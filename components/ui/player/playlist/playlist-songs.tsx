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
import PlayTrack from '../album/play-track';
import PlaylistControl from './playlist-control';
import { Playlist } from '@/types/playlist';

export default async function PlaylistSongs({
	playlist,
}: {
	playlist: Playlist;
}) {
	const [tracks, likedTracks] = await Promise.all([
		getPlaylistTracks(playlist.id),
		getUserLikedTracks(),
	]);

	if (!likedTracks || !tracks) throw Error('Cannot fetch Songs');

	if (tracks.length === 0) {
		return (
			<>
				<PlaylistControl playlist={playlist} tracks={[]} />
				<p>No tracks was Found</p>
			</>
		);
	}

	return (
		<>
			<PlaylistControl playlist={playlist} tracks={tracks} />

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
								<PlayTrack i={i} tracks={tracks} />
							</TableCell>
							<TableCell>{song.title_short}</TableCell>

							<TableCell>{song.album.title}</TableCell>
							<TableCell>
								<LikeTrack
									trackId={song.id + ''}
									isLiked={likedTracks?.some((a) => a.trackId === song.id + '')}
									classNameNotLiked='invisible group-hover:visible'
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
										defaultValue={playlist.id}
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
		</>
	);
}

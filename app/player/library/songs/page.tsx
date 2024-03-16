import { Clock3, Music2 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getLikedTracks } from '@/lib/api/track';
import LikeTrack from '@/components/like-track';
import { formatSongTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import AddToPlaylist from '@/components/add-to-playlist';
import { getUserPlaylists } from '@/lib/db/playlist';
import PlayTrack from '@/components/ui/player/album/play-track';
import NotFoundLibrary from '@/components/ui/player/library/not-found-library';

export default async function page() {
	const [likedTracks, playlists] = await Promise.all([
		getLikedTracks(),
		getUserPlaylists(),
	]);

	return (
		<>
			<h1 className='text-4xl font-semibold'>Your Liked Songs</h1>
			{!likedTracks || likedTracks.length === 0 ? (
				<NotFoundLibrary Icon={Music2} message='No liked songs found.' />
			) : (
				<div className='relative w-full overflow-auto'>
					<Table className='mb-12 mt-8'>
						<TableHeader>
							<TableRow>
								<TableHead className='w-[10px]'>#</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Album</TableHead>
								<TableHead className='w-5'> </TableHead>
								<TableHead className='flex justify-center items-center'>
									<Clock3 width={16} height={16} />
								</TableHead>
								<TableHead className='w-[52px]'> </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{likedTracks.map((song, i) => (
								<TableRow key={song.id} className='group'>
									<TableCell className='font-medium'>
										<PlayTrack i={i} tracks={likedTracks} />
									</TableCell>

									<TableCell className='text-sm flex'>
										{song.album?.cover_medium && (
											<Image
												alt={song.title_short}
												src={song.album?.cover_medium}
												width={40}
												height={40}
												className='w-10 h-10 rounded-sm'
											/>
										)}

										<div className='ml-2'>
											<Link
												href={`/player/album/${song.album.id}`}
												className='text-[15px] hover:underline font-medium'
											>
												{song.title_short}
											</Link>
											<div className='text-xs font-normal hover text-muted-foreground'>
												{song.contributors.map((a, i) => (
													<span key={a.id}>
														<Link
															href={`/player/artist/${a.id}`}
															className='hover:underline'
														>
															{a.name}
														</Link>
														{`${
															song.contributors.length - 1 === i ? '' : ', '
														}`}
													</span>
												))}
											</div>
										</div>
									</TableCell>

									<TableCell className='text-sm'>{song.album.title}</TableCell>
									<TableCell>
										<LikeTrack
											trackId={song.id + ''}
											// isLiked={true}
											isLiked={likedTracks?.some((a) => a.id === song.id)}
											classNameNotLiked='invisible group-hover:visible'
											key={likedTracks.toString()}
										/>
									</TableCell>
									<TableCell className='text-right'>
										{formatSongTime(song.duration)}
									</TableCell>
									<TableCell className='text-right'>
										<AddToPlaylist
											playlists={playlists || []}
											songId={song.id + ''}
											className='invisible group-hover:visible'
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	);
}

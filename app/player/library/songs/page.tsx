import { Clock3 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getLikedTracks } from '@/lib/api/track';
import { notFound } from 'next/navigation';
import { Icons } from '@/components/icons/audio-icons';
import LikeTrack from '@/components/like-track';
import { formatSongTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function page() {
	const likedTracks = await getLikedTracks();

	if (!likedTracks) {
		notFound();
	}

	return (
		<>
			<h1 className='text-4xl font-semibold'>Your Liked Songs</h1>
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
						</TableRow>
					</TableHeader>
					<TableBody>
						{likedTracks.map((song, i) => (
							<TableRow key={song.id}>
								<TableCell className='font-medium'>
									<div>
										<Icons.play className='hidden hover:block w-5 h-5 ' />
										<span>{i + 1}</span>
									</div>
								</TableCell>

								<TableCell className='text-sm flex'>
									<Image
										alt={song.title_short}
										src={song.album.cover_medium}
										width={40}
										height={40}
										className='w-10 h-10 rounded-sm'
									/>

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
													{`${song.contributors.length - 1 === i ? '' : ', '}`}
												</span>
											))}
										</div>
									</div>
								</TableCell>

								<TableCell className='text-sm'>{song.album.title}</TableCell>
								<TableCell>
									<LikeTrack trackId={song.id + ''} isLiked={true} />
								</TableCell>
								<TableCell className='text-right'>
									{formatSongTime(song.duration)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

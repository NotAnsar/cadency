import { Clock3 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Track } from '@/types/music';
import { formatSongTime } from '@/lib/utils';
import LikeTrack from '@/components/like-track';
import AddToPlaylist from '@/components/add-to-playlist';
import { getUserPlaylists } from '@/lib/db/playlist';
import { getUserLikedTracks } from '@/lib/db/user';
import PlayTrack from './play-track';

type Prop = {
	label: string;
	tracks: Track[];
	title: string;
};

export default async function AlbumSongs({ label, tracks, title }: Prop) {
	const [playlists, likedTracks] = await Promise.all([
		getUserPlaylists(),
		getUserLikedTracks(),
	]);

	if (!likedTracks) {
		throw new Error('Cannot get Album Tracks');
	}

	return (
		<Table className='mb-12'>
			<TableCaption>© {label}</TableCaption>
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
							<PlayTrack tracks={tracks} i={i} />
						</TableCell>
						<TableCell>{song.title_short}</TableCell>

						<TableCell>{title}</TableCell>
						<TableCell>
							<LikeTrack
								trackId={song.id + ''}
								isLiked={likedTracks.some((a) => a.trackId === song.id + '')}
								classNameNotLiked='invisible group-hover:visible'
							/>
						</TableCell>
						<TableCell className='text-right'>
							{formatSongTime(song.duration)}
						</TableCell>
						<TableCell>
							<AddToPlaylist
								className='invisible group-hover:visible'
								playlists={playlists || []}
								songId={song.id + ''}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

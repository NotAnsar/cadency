import { Clock3, MoreHorizontal } from 'lucide-react';
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
import { Icons } from '@/components/icons/audio-icons';
import { TrackData } from '@/types/music';
import { cn, formatSongTime } from '@/lib/utils';
import LikeTrack from '@/components/like-track';

type Prop = {
	label: string;
	tracks: TrackData[];
	title: string;
	likedTracks: {
		userId: string;
		trackId: string;
	}[];
};

export default function AlbumSongs({
	label,
	tracks,
	title,
	likedTracks,
}: Prop) {
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
							<div>
								{/* <Icons.play className='hidden hover:block w-5 h-5 ' /> */}
								<span>{i + 1}</span>
							</div>
						</TableCell>
						<TableCell>{song.title_short}</TableCell>

						<TableCell>{title}</TableCell>
						<TableCell>
							<LikeTrack
								trackId={song.id + ''}
								isLiked={likedTracks.some((a) => a.trackId === song.id + '')}
								classNameNotLiked='hidden group-hover:block'
							/>
						</TableCell>
						<TableCell className='text-right'>
							{formatSongTime(song.duration)}
						</TableCell>
						<TableCell>
							<MoreHorizontal className='w-5 h-5 hidden group-hover:block' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

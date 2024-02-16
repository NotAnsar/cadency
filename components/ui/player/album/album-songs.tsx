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
import { Icons } from '@/components/icons/audio-icons';
import { TrackData } from '@/types/music';
import { formatSongTime } from '@/lib/utils';

type Prop = { label: string; tracks: TrackData[]; title: string };

export default function AlbumSongs({ label, tracks, title }: Prop) {
	return (
		<Table className='mb-12'>
			<TableCaption>© {label}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[10px]'>#</TableHead>
					<TableHead>Song</TableHead>
					<TableHead>Features</TableHead>
					<TableHead>Album</TableHead>
					<TableHead className='w-5'> </TableHead>
					<TableHead>
						<Clock3 width={16} height={16} className='ml-auto' />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{tracks.map((song, i) => (
					<TableRow key={song.id}>
						<TableCell className='font-medium'>
							<div>
								{/* <Icons.play className='hidden hover:block w-5 h-5 ' /> */}
								<span>{i + 1}</span>
							</div>
						</TableCell>
						<TableCell>{song.title}</TableCell>
						<TableCell>Future</TableCell>
						<TableCell>{title}</TableCell>
						<TableCell>
							<Icons.heart className='h-5 w-5' />
						</TableCell>
						<TableCell className='text-right'>
							{formatSongTime(song.duration)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

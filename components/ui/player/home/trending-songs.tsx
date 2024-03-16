import { type Track } from '@/types/music';
import { cn, formatSongTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import PlayTrendingSong from './play-trending-song';

type Prop = { songs: Track[]; classname?: string };

export default function TrendingSongs({ songs, classname = '' }: Prop) {
	return (
		<div className={cn('flex-none', classname)}>
			<h2 className='text-xl font-medium tracking-tight mb-4'>
				Trending <span className='text-primary font-semibold'>Now</span>{' '}
			</h2>

			<div className='flex w-full flex-col gap-2'>
				{songs.slice(0, 5).map((song, i) => (
					<div
						className='flex justify-between w-full rounded-md overflow-hidden items-center bg-transparent border border-border gap-2'
						key={song.id}
					>
						<div className='flex gap-2 items-center h-full'>
							<Link href={`/player/album/${song.album.id}`}>
								<Image
									src={song.album.cover_medium}
									alt={song.title}
									width={52}
									height={52}
									className='w-auto h-full aspect-square'
								/>
							</Link>

							<div>
								<p className='leading-none text-[15px] font-medium'>
									{song.title_short}
								</p>
								<Link
									href={`/player/artist/${song.artist.id}`}
									className='text-xs text-muted-foreground mt-1 text-nowrap whitespace-nowrap overflow-hidden hover:underline'
								>
									{song.artist.name}
								</Link>
							</div>
						</div>

						<div className='flex gap-2 mr-4 items-center'>
							<span className='text-xs '>{formatSongTime(song.duration)}</span>

							<PlayTrendingSong i={i} tracks={songs} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

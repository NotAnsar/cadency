import { cn, formatTime } from '@/lib/utils';
import { AlbumDetails } from '@/types/music';
import Image from 'next/image';
import Link from 'next/link';

export default function AlbumDetails({ album }: { album: AlbumDetails }) {
	return (
		<div className='w-full flex gap-4'>
			<div className='relative'>
				{album.explicit_lyrics ? (
					<span className='text-[10px] px-2 py-1 rounded-sm bg-black/70 backdrop-blur-sm text-white absolute right-2 bottom-2 font-bold'>
						E
					</span>
				) : null}
				<Image
					alt={album.title}
					src={album.cover_medium}
					className='rounded-sm border border-border'
					width={224}
					height={224}
					objectFit='square'
				/>
			</div>
			<div className='space-y-2 mt-auto mb-2'>
				<span
					className={cn(
						'text-xs px-2 py-1 rounded-sm uppercase font-medium text-white',
						album.record_type === 'album' ? 'bg-primary ' : null,
						album.record_type === 'ep' ? 'bg-blue-700 ' : null,
						album.record_type === 'single' ? 'bg-gray-700 ' : null
					)}
				>
					{album.record_type}
				</span>

				<h2 className='text-5xl font-bold'>{album.title}</h2>
				<div className='flex gap-2 items-center'>
					<Image
						alt={album.artist.name}
						src={album.artist.picture_medium}
						className='rounded-full'
						width={24}
						height={24}
					/>
					<Link
						href={`/player/artist/${album.artist.id}`}
						className='text-sm hover:underline cursor-pointer'
					>
						{album.artist.name}
					</Link>
				</div>

				<p className='text-[15px] text-muted-foreground'>
					{`${album.nb_tracks} tracks | ${album.release_date} | ${formatTime(
						album.duration
					)}`}{' '}
				</p>
			</div>
		</div>
	);
}

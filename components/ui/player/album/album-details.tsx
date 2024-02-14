import { formatTime } from '@/lib/utils';
import { AlbumDetails } from '@/types/music';
import Image from 'next/image';

export default function AlbumDetails({ album }: { album: AlbumDetails }) {
	return (
		<div className='w-full flex gap-4'>
			<Image
				alt={album.title}
				src={album.cover_medium}
				className='rounded-sm border border-border'
				width={224}
				height={224}
				objectFit='square'
			/>
			<div className='space-y-2 mt-auto mb-2'>
				{album.explicit_lyrics ? (
					<span className='text-[10px] px-2 py-1 rounded-sm bg-ring text-white'>
						EXPLICIT
					</span>
				) : null}

				<h2 className='text-5xl font-bold'>{album.title}</h2>
				<div className='flex gap-2 items-center'>
					<Image
						alt={album.artist.name}
						src={album.artist.picture}
						className='rounded-full'
						width={24}
						height={24}
					/>
					<p className='text-sm'>{album.artist.name}</p>
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

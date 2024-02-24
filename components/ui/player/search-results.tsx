import { cn } from '@/lib/utils';
import { AlbumDetails, ArtistDetails, Track } from '@/types/music';
import { SearchX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MutableRefObject } from 'react';

type Prop = {
	data: {
		artists: ArtistDetails[];
		albums: AlbumDetails[];
		songs: Track[];
	};
	query: string;
	closeModal: () => void;
	innerRef: MutableRefObject<HTMLDivElement | null>;
	className: string;
};

export default function SearchResult({
	data,
	query,
	closeModal,
	innerRef,
	className,
}: Prop) {
	if (
		data.albums.length === 0 &&
		data.artists.length === 0 &&
		data.songs.length === 0
	) {
		return (
			<div
				className={cn(
					'bg-[#222] w-full absolute top-full mt-2 rounded-md py-2 h-96  flex items-center',
					className
				)}
				ref={innerRef}
			>
				<div className='text-center w-1/2 mx-auto'>
					<SearchX className='h-12 w-12 mx-auto mb-2 text-muted-foreground' />
					<h3 className='font-semibold text-sm '>No results found</h3>

					<p className='text-sm text-muted-foreground'>
						Make sure words are spelled correctly or try other keywords
					</p>
				</div>
			</div>
		);
	}
	return (
		<div className='bg-[#222] w-full absolute top-full mt-2 rounded-md py-2'>
			{data.artists.slice(0, 1).map((artist) => (
				<Link
					href={`/player/artist/${artist.id}`}
					onClick={closeModal}
					className='h-[84px] flex items-center px-4 hover:bg-[#292929] cursor-pointer'
					key={artist.id}
				>
					<Image
						src={artist.picture_medium}
						alt={artist.name}
						height={70}
						width={70}
						className='rounded-full'
					/>
					<div className='ml-4'>
						<p className='text-sm'>{artist.name}</p>

						<p className='text-xs font-semibold text-muted-foreground'>
							Artist
						</p>
					</div>
				</Link>
			))}

			{data.albums.slice(0, 2).map((album) => (
				<Link
					href={`/player/album/${album.id}`}
					onClick={closeModal}
					className='h-[84px] flex items-center px-4 hover:bg-[#292929] cursor-pointer'
					key={album.id}
				>
					<Image
						src={album.cover_medium}
						alt={album.title}
						height={70}
						width={70}
					/>
					<div className='ml-4'>
						<p className='text-sm '>{album.title}</p>
						<p className='text-sm font-medium text-muted-foreground'>
							{album.artist.name}
						</p>

						<p className='text-xs font-semibold text-muted-foreground'>
							{album.record_type}
						</p>
					</div>
				</Link>
			))}

			{data.songs.slice(0, 2).map((song) => (
				<Link
					onClick={closeModal}
					href={`/player/album/${song.album.id}`}
					className='h-[84px] flex items-center px-4 hover:bg-[#292929] cursor-pointer'
					key={song.id}
				>
					<Image
						src={song.album.cover_medium}
						alt={song.title}
						height={70}
						width={70}
					/>
					<div className='ml-4'>
						<p className='text-sm'>{song.title}</p>
						<p className='text-sm font-medium text-muted-foreground'>
							{song.artist.name}
						</p>

						<p className='text-xs font-semibold text-muted-foreground'>song</p>
					</div>
				</Link>
			))}

			<div className='text-center '>
				<Link
					href={`/player/search/${query}`}
					className='text-center inline-block text-sm bg-primary px-4 py-[6px] rounded-full my-2 font-medium text-white'
				>
					View All
				</Link>
			</div>
		</div>
	);
}

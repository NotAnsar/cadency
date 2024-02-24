'use client';

import { cn } from '@/lib/utils';
import { SearchX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ResultType } from './search-form';

type Prop = {
	data: ResultType;
	query: string;
	closeModal: () => void;
	className: string;
};

export default function SearchResult({
	data,
	closeModal,
	className,
	query,
}: Prop) {
	const searchResultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let handler = (e: MouseEvent) => {
			if (!searchResultRef.current?.contains(e.target as Node)) {
				closeModal();
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			window.removeEventListener('mousedown', handler);
		};
	});

	const renderResult = (
		href: string,
		image: string,
		title: string,
		type: string,
		id: string,
		name?: string
	) => {
		return (
			<Link
				href={href}
				onClick={closeModal}
				className='h-[84px] flex items-center px-4 hover:bg-[#292929] cursor-pointer'
				key={id}
			>
				<Image
					src={image}
					alt={title}
					height={70}
					width={70}
					className={cn(name ? 'rounded-md' : 'rounded-full')}
				/>
				<div className='ml-4'>
					<p className='text-sm'>{title}</p>
					{name ? (
						<p className='text-sm font-medium text-muted-foreground'>{name}</p>
					) : null}

					<p className='text-xs font-semibold text-muted-foreground'>{type}</p>
				</div>
			</Link>
		);
	};

	return (
		<div
			className={cn(
				'bg-[#222] w-full absolute top-full mt-2 rounded-md py-2',
				className
			)}
			ref={searchResultRef}
		>
			{data === null ? (
				<div className='text-center w-1/2 mx-auto h-96 flex items-center'>
					Something Wrong Happening
				</div>
			) : data!.albums.length === 0 &&
			  data!.artists.length === 0 &&
			  data!.songs.length === 0 ? (
				<div className='text-center w-1/2 mx-auto h-96 flex items-center'>
					<div>
						<SearchX className='h-12 w-12 mx-auto mb-2 text-muted-foreground' />
						<h3 className='font-semibold text-sm '>No results found</h3>

						<p className='text-sm text-muted-foreground'>
							Make sure words are spelled correctly or try other keywords
						</p>
					</div>
				</div>
			) : (
				<>
					{data.artists
						.slice(0, 1)
						.map((artist) =>
							renderResult(
								`/player/artist/${artist.id}`,
								artist.picture_medium,
								artist.name,
								'Artist',
								artist.id
							)
						)}

					{data.albums
						.slice(0, 2)
						.map((album) =>
							renderResult(
								`/player/album/${album.id}`,
								album.cover_medium,
								album.title,
								album.record_type,
								album.id,
								album.artist.name
							)
						)}

					{data.songs
						.slice(0, 2)
						.map((song) =>
							renderResult(
								`/player/album/${song.album.id}`,
								song.album.cover_medium,
								song.title,
								'Song',
								song.id,
								song.artist.name
							)
						)}

					<div className='text-center '>
						<Link
							href={`/player/search/${query}`}
							className='text-center inline-block text-sm bg-primary px-4 py-[6px] rounded-full my-2 font-medium text-white'
						>
							View All
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

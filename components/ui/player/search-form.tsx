'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { Input } from '../input';
import { searchAll } from '@/lib/db';
import { Search } from 'lucide-react';
import type { AlbumDetails, ArtistDetails, Track } from '@/types/music';
import SearchResult from './search-results';
import { cn } from '@/lib/utils';

type ResultType = {
	artists: ArtistDetails[];
	albums: AlbumDetails[];
	songs: Track[];
} | null;

export default function SearchForm() {
	const searchResultRef = useRef<HTMLDivElement | null>(null);
	const [search, setSearch] = useState('');
	const [query] = useDebounce(search, 400);
	const [open, setOpen] = useState(false);
	const [searchResult, setSearchResult] = useState<ResultType>(null);
	const router = useRouter();

	useEffect(() => {
		const getSearch = async () => {
			const res = await searchAll(query);
			setSearchResult(res);
		};

		if (query !== '') getSearch();
		else setOpen(false);
	}, [query]);

	useEffect(() => {
		let handler = (e: MouseEvent) => {
			console.log(searchResultRef.current);

			if (!searchResultRef.current?.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
	});

	return (
		<form
			className='w-3/4 md:w-2/5'
			onSubmit={(e) => {
				e.preventDefault();
				router.push(`/player/search/${search}`);
			}}
		>
			<div className='relative'>
				<Search className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
				<Input
					type='search'
					className='pl-8 w-full'
					placeholder='Search artists, albums, songs...'
					value={search}
					onFocusCapture={() => {
						if (query !== '') setOpen(true);
					}}
					onChange={(e) => {
						setSearch(e.target.value);
						setOpen(true);
					}}
				/>
				{searchResult && open ? (
					<SearchResult
						data={searchResult}
						query={query}
						closeModal={() => setOpen(false)}
						innerRef={searchResultRef}
						className={cn()}
					/>
				) : null}
			</div>
		</form>
	);
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../input';
import { searchAll } from '@/lib/db';
import { Search } from 'lucide-react';
import type { AlbumDetails, ArtistDetails, Track } from '@/types/music';
import SearchResult from './search-results';
import { cn } from '@/lib/utils';

export type ResultType = {
	artists: ArtistDetails[];
	albums: AlbumDetails[];
	songs: Track[];
} | null;

export default function SearchForm() {
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);
	const [searchResult, setSearchResult] = useState<ResultType>(null);
	const debounced = useDebouncedCallback((value: string) => {
		setSearch(value);
		if (value === '') {
			setOpen(false);
		} else {
			setOpen(true);
			const getSearch = async () => {
				const res = await searchAll(value);
				setSearchResult(res);
			};
			getSearch();
		}
	}, 400);

	return (
		<form className='w-3/4 md:w-2/5' onSubmit={(e) => e.preventDefault()}>
			<div className='relative'>
				<Search className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
				<Input
					type='search'
					className='pl-8 w-full'
					placeholder='Search artists, albums, songs...'
					defaultValue={''}
					onFocusCapture={() => {
						if (search !== '') setOpen(true);
					}}
					onChange={(e) => debounced(e.target.value)}
				/>

				<SearchResult
					data={searchResult}
					closeModal={() => setOpen(false)}
					className={cn(
						!open || searchResult === null ? 'opacity-0 invisible ' : null
					)}
				/>
			</div>
		</form>
	);
}

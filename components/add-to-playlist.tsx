'use client';

import { addToPlaylist } from '@/actions/playlist-action';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { cn } from '@/lib/utils';
import { Playlist } from '@/types/playlist';
import { ListMusic, ListPlus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from './ui/use-toast';

export default function AddToPlaylist({
	className,
	playlists,
	songId,
}: {
	className?: string;
	playlists: Playlist[];
	songId: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ListPlus
				className={cn('w-5 h-5  cursor-pointer ', className)}
				onClick={() => setOpen(true)}
			/>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Find a playlist...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Playlists'>
						{playlists.map((playlist) => (
							<CommandItem
								key={playlist.id}
								className='p-2 justify-between cursor-pointer'
								onSelect={async () => {
									await addToPlaylist(playlist.id, songId);
									toast({
										title: 'Song Added to the playlist ',
										description:
											'Your Song Was Added Successfully to your playlist ',
									});
									setOpen(false);
								}}
							>
								<div className='flex gap-2 '>
									{playlist.image ? (
										<Image
											alt={playlist.name}
											src={playlist.image}
											height={80}
											width={80}
											className='w-10 h-auto aspect-square border border-border rounded-sm object-cover'
										/>
									) : (
										<div className='w-10 aspect-square border border-border rounded-sm flex items-center justify-center bg-foreground/80'>
											<ListMusic className='w-8 text-background' />
										</div>
									)}

									<div>
										<p className='text-foreground text-sm font-medium'>
											{playlist.name}
										</p>
										<span className='text-xs text-muted-foreground'>
											{playlist._count.tracks} songs
										</span>
									</div>
								</div>
								<ListPlus className='w-16 h-16' />
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}

'use client';

import { Icons } from '@/components/icons/audio-icons';
import { Pencil, Trash } from 'lucide-react';
import PlaylistModal from '../../playlist-modal/playlist-modal';
import { Playlist } from '@/types/playlist';
import { deletePlaylist } from '@/actions/playlist-action';
import { Skeleton } from '../../skeleton';
import PlayPlaylist from './play-playlist';
import { PlaylistTrack } from '@/lib/api/playlist';

export default function PlaylistControl({
	playlist,
	tracks,
}: {
	playlist: Playlist;
	tracks: PlaylistTrack[];
}) {
	return (
		<div className='my-6 flex gap-4'>
			<PlayPlaylist tracks={tracks} />

			<PlaylistModal playlist={playlist}>
				<button
					className='px-4 rounded-md flex justify-center items-center bg-muted-foreground dark:bg-secondary cursor-pointer text-white gap-[6px] py-3 hover:opacity-90'
					type='submit'
				>
					<Pencil className='h-4 w-4' />
					<p>Edit</p>
				</button>
			</PlaylistModal>
			<form action={deletePlaylist}>
				<input
					className='hidden'
					name='playlistId'
					defaultValue={playlist.id}
				/>
				<button
					className='px-4 rounded-md flex justify-center items-center cursor-pointer text-white gap-[6px] py-3 bg-destructive hover:opacity-90'
					type='submit'
				>
					<Trash className='h-5 w-5' />
				</button>
			</form>
		</div>
	);
}

export function PlaylistControlSkeleton() {
	return (
		<div className='my-6 flex gap-4'>
			<Skeleton className='w-32 h-12 rounded-md cursor-pointer' />
			<Skeleton className='w-20 h-12 rounded-md flex justify-center items-center cursor-pointer text-white gap-[6px] '>
				<Pencil className='h-4 w-4' />
				<p>Edit</p>
			</Skeleton>

			<Skeleton className='px-4 rounded-md flex justify-center items-center cursor-pointer text-white gap-[6px] py-3 bg-destructive hover:opacity-90'>
				<Trash className='h-5 w-5' />
			</Skeleton>
		</div>
	);
}

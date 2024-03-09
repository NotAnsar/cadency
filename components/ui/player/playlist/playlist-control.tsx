'use client';

import { Icons } from '@/components/icons/audio-icons';
import { Pencil, Trash } from 'lucide-react';
import PlaylistModal from '../../playlist-modal/playlist-modal';
import { Playlist } from '@/types/playlist';

export default function PlaylistControl({ playlist }: { playlist: Playlist }) {
	return (
		<div className='my-6 flex gap-4'>
			{/* <button className='w-12 h-12 flex justify-center items-center bg-primary rounded-full cursor-pointer text-white'> */}
			<button className='px-6 rounded-md flex justify-center items-center bg-primary  cursor-pointer text-white gap-1 py-3 hover:opacity-95'>
				<Icons.play className='h-6 w-6' />
				<p className='font-medium'>Listen</p>
				{/* <Icons.pause className='h-6 w-6' />
				<p className='font-medium'>Listening</p> */}
			</button>

			<PlaylistModal playlist={playlist}>
				<button
					className='px-4 rounded-md flex justify-center items-center bg-muted-foreground dark:bg-secondary cursor-pointer text-white gap-[6px] py-3 hover:opacity-95'
					type='submit'
				>
					<Pencil className='h-4 w-4' />
					<p>Edit</p>
				</button>
			</PlaylistModal>
			<button
				className='px-4 rounded-md flex justify-center items-center cursor-pointer text-white gap-[6px] py-3 hover:bg-destructive/40'
				type='submit'
			>
				<Trash className='h-5 w-5' />
			</button>
		</div>
	);
}

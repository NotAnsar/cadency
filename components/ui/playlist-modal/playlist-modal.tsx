'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { useCallback, useState } from 'react';
import { toast } from '../use-toast';
import PlaylistForm from './playlist-form';
import { Playlist } from '@/types/playlist';

type Prop = { children: React.ReactNode };

export default function PlaylistModal({
	children,
	playlist,
}: Prop & { playlist?: Playlist }) {
	return (
		<PlaylistDialog playlist={playlist}>
			<DialogTrigger asChild>{children}</DialogTrigger>
		</PlaylistDialog>
	);
}

export function PlaylistDialog({
	children,
	playlist,
}: Prop & { playlist?: Playlist }) {
	const [open, setOpen] = useState(false);
	const closeModal = useCallback(() => {
		setOpen(false);
		toast({
			title: `Playlist ${playlist ? 'Updated' : 'Created'}`,
			description: `Your Playlist Was ${
				playlist ? 'Updated' : 'Created'
			} Successfully`,
		});
	}, [setOpen, playlist]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{children}
			<DialogContent className=''>
				<DialogHeader>
					<DialogTitle>{`${
						playlist ? 'Update' : 'Create'
					} Playlist`}</DialogTitle>
					<DialogDescription>
						{
							"Make changes to your playlist here. Click Save changes when you're done."
						}
					</DialogDescription>
				</DialogHeader>

				<PlaylistForm
					closeModal={closeModal}
					playlist={playlist || undefined}
				/>
			</DialogContent>
		</Dialog>
	);
}

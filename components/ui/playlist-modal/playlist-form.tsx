'use client';

import { ListMusic } from 'lucide-react';
import { Label } from '../label';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { createOrUpdatePlaylist } from '@/actions/playlist-action';
import { useFormState, useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { ChangeEvent, useEffect, useState } from 'react';

import { Icons } from '../../icons/icons';
import Image from 'next/image';
import { Playlist } from '@/types/playlist';

type Prop = {
	closeModal: () => void;
	playlist?: Playlist;
};
export default function PlaylistForm({ closeModal, playlist }: Prop) {
	const initialState = { errors: {}, message: null };
	const [state, dispatch] = useFormState(
		createOrUpdatePlaylist.bind(null, playlist?.id || null),
		initialState
	);
	const [pickedImage, setPickedImage] = useState<string | undefined>(
		playlist?.image ? playlist?.image : undefined
	);

	function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target?.files ? e.target?.files[0] : null;

		if (!file) {
			setPickedImage(undefined);
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPickedImage(fileReader.result as string);
		};

		fileReader.readAsDataURL(file);
	}

	useEffect(() => {
		if (state === undefined) {
			closeModal();
		}
	}, [state, closeModal]);

	return (
		<form action={dispatch}>
			<div className='flex-col md:flex-row flex py-4 gap-4'>
				<div>
					<label
						className={cn(
							'h-48 aspect-square rounded-md flex items-center justify-center col-span-2 cursor-pointer bg-primary/55 hover:bg-primary/70 dark:bg-primary/60 dark:hover:bg-primary/50 transition-all duration-300',
							state?.errors?.image ? 'border-2 border-destructive' : null
						)}
					>
						<ListMusic className='w-16 h-16 text-primary/55 dark:text-primary' />

						<input
							className={'hidden'}
							type='file'
							accept='image/png, image/jpeg'
							name='image'
							onChange={handleImageChange}
						/>
						{pickedImage ? (
							<Image
								alt=''
								src={pickedImage}
								className='h-48 aspect-square bg-secondary rounded-md flex items-center justify-center col-span-2 hover:bg-secondary/70 cursor-pointer object-cover'
								width={192}
								height={192}
							/>
						) : null}
					</label>
					{state?.errors?.image &&
						state?.errors?.image.map((error: string) => (
							<p
								className='text-xs font-medium text-destructive mt-2'
								key={error}
							>
								{error}
							</p>
						))}
				</div>

				<div className='space-y-2 w-full col-span-3 '>
					<div className='space-y-2 '>
						<Label htmlFor='name' className='text-right'>
							Name
						</Label>
						<Input
							id='name'
							name='name'
							placeholder='Playlist name'
							className='col-span-3'
							defaultValue={playlist?.name || ''}
							required
						/>

						{state?.errors?.name &&
							state?.errors?.name.map((error: string) => (
								<p className='text-sm font-medium text-destructive' key={error}>
									{error}
								</p>
							))}
					</div>
					<div className='space-y-2 '>
						<Label htmlFor='description' className='text-right'>
							Description
						</Label>

						<Textarea
							id='description'
							name='description'
							placeholder='Playlist Description'
							className='col-span-3'
							defaultValue={playlist?.description || ''}
						/>

						{state?.errors?.description &&
							state?.errors?.description.map((error: string) => (
								<p className='text-sm font-medium text-destructive' key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
			</div>
			{state?.errors && (
				<p className='text-sm font-medium text-destructive'>{state.message}</p>
			)}
			<PendingButton />
		</form>
	);
}

function PendingButton() {
	const { pending } = useFormStatus();

	return (
		<div className='flex justify-end'>
			<Button
				type='submit'
				className=''
				aria-disabled={pending}
				disabled={pending}
			>
				{pending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
				Save changes
			</Button>
		</div>
	);
}

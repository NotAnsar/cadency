'use client';
import { updateProfileImage } from '@/actions/user-actions';
import { Pencil, User } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { toast } from '../../use-toast';

type Prop = {
	user:
		| {
				name?: string | null | undefined;
				email?: string | null | undefined;
				image?: string | null | undefined;
		  }
		| undefined;
};

export default function ProfileDialog({ user }: Prop) {
	const formInput = useRef<HTMLFormElement | null>(null);

	return (
		<form
			className='h-44 w-44 md:h-52 md:w-52 z-10 rounded-full mx-auto md:me-auto md:ms-0  bg-primary flex items-center justify-center text-white group relative overflow-hidden'
			action={async (formData) => {
				const res = await updateProfileImage(formData);

				if (res?.message) {
					toast({
						title: 'Something went Wrong',
						description: res.message,
						variant: 'destructive',
					});
				} else {
					toast({
						title: 'Success',
						description: 'Your Profile Picture Was Updated Successfully',
					});
				}
			}}
			ref={formInput}
		>
			{user?.image ? (
				<Image
					alt={user?.name ? user.name : ''}
					src={user.image ? user.image : ''}
					className={'h-44 w-44 md:h-52 md:w-52 object-cover'}
					width={208}
					height={208}
					// loader={() => user.image}
				/>
			) : (
				<User className='h-16 w-16 group-hover:hidden' />
			)}

			<label className='flex-col items-center justify-center gap-2 invisible group-hover:visible flex absolute w-full h-full bg-black/65 cursor-pointer'>
				<input
					className={'hidden'}
					type='file'
					accept='image/png, image/jpeg'
					name='image'
					onChange={() => {
						formInput.current?.requestSubmit();
					}}
				/>
				<Pencil className='h-12 w-12' />
				<p className='font-medium'>Choose photo</p>
			</label>
		</form>
	);
}

'use client';

import Logo from '@/components/logo';
import { signOut } from 'next-auth/react';

export default async function page() {
	return (
		<main className=' p-24 space-y-3'>
			<Logo className='text-3xl  block' />
			<h1 className='text-3xl text-bold block'>Player Page</h1>

			<button
				className='text-primary  text-2xl hover:underline block'
				onClick={() => signOut()}
			>
				Logout
			</button>
		</main>
	);
}

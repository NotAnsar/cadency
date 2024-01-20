'use client';

import Logo from '@/components/logo';

import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';

export default function Home() {
	const { data: session } = useSession();
	console.log(session);

	return (
		<main className=' p-24 space-y-3'>
			<Logo className='text-3xl  block' />
			<h1 className='text-3xl text-bold block'>Home Page</h1>

			{session ? (
				<button
					className='text-primary  text-2xl hover:underline block'
					onClick={() => {
						signOut();
					}}
				>
					Logout
				</button>
			) : (
				<Link
					href={'/login'}
					className='text-primary  text-2xl hover:underline block'
				>
					Login
				</Link>
			)}

			<Link
				href={'/player'}
				className='text-primary  text-2xl hover:underline block'
			>
				Player
			</Link>
		</main>
	);
}

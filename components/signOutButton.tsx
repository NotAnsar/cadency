'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
	return (
		<button
			className='text-primary  text-2xl hover:underline block'
			onClick={() => signOut()}
		>
			Logout
		</button>
	);
}

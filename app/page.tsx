import Logo from '@/components/logo';
import SignOutButton from '@/components/signOutButton';
import { getCurrentUser } from '@/lib/session';

import Link from 'next/link';

export default async function Home() {
	const user = await getCurrentUser();

	return (
		<main className=' p-24 space-y-3'>
			<Logo className='text-3xl  block' />
			<h1 className='text-3xl text-bold block'>Home Page</h1>
			<p>
				Your user :<br /> {JSON.stringify(user)}
			</p>

			<Link
				href={'/player'}
				className='text-primary  text-2xl hover:underline block'
			>
				Player
			</Link>
			{user ? (
				<SignOutButton />
			) : (
				<Link
					href={'/signin'}
					className='text-primary text-2xl hover:underline block'
				>
					Auth
				</Link>
			)}
		</main>
	);
}

import Logo from '@/components/logo';
import SignOutButton from '@/components/signOutButton';
import { getCurrentUser } from '@/lib/session';

export default async function page() {
	const user = await getCurrentUser();

	return (
		<main className=' p-24 space-y-3'>
			<Logo className='text-3xl  block' />
			<h1 className='text-3xl text-bold block'>Player Page</h1>
			<h1 className='text-3xl text-bold block'>Hello {user?.name}</h1>

			<SignOutButton />
		</main>
	);
}

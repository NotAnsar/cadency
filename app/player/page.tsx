import Logo from '@/components/logo';
import Link from 'next/link';

export default function page() {
	return (
		<main className=' p-24 space-y-3'>
			<Logo className='text-3xl  block' />
			<h1 className='text-3xl text-bold block'>Player Page</h1>

			<Link
				href={'/login'}
				className='text-primary  text-2xl hover:underline block'
			>
				Login
			</Link>
		</main>
	);
}

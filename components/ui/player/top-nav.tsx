import UserNav from '@/components/user-nav';
import SearchForm from './search-form';
import { getCurrentUser } from '@/lib/session';
import { notFound } from 'next/navigation';

export default async function TopNav() {
	const user = await getCurrentUser();

	if (!user) {
		return notFound();
	}

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background px-4 border-[#ddd] dark:border-[#333] h-14 grid items-center'>
			<nav className='flex justify-between items-center gap-4'>
				<SearchForm />
				<UserNav user={user} />
			</nav>
		</header>
	);
}

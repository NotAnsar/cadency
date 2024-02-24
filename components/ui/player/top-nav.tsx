import UserNav from '@/components/user-nav';
import { Search } from 'lucide-react';
import { Input } from '../input';
import SearchForm from './search-form';

export default function TopNav() {
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background px-4 border-[#ddd] dark:border-[#333] h-14 grid items-center'>
			<nav className='flex justify-between items-center gap-4'>
				<SearchForm />
				<UserNav />
			</nav>
		</header>
	);
}

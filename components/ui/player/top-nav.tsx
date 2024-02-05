import { ModeToggle } from '@/components/ui/mode-toggle';
import UserNav from '@/components/user-nav';
import { Search } from 'lucide-react';
import { Input } from '../input';

export default function TopNav() {
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background  px-4 border-[#ddd] dark:border-[#333] h-14 grid items-center'>
			<nav className='flex justify-between items-center gap-4'>
				<form className='w-3/4 md:w-2/5  '>
					<div className='relative  '>
						<Search className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							className='pl-8 w-full'
							placeholder='Search artists, albums, songs...'
						/>
					</div>
				</form>
				<div className='flex gap-2 ml-auto'>
					<UserNav />
					<ModeToggle />
				</div>
			</nav>
		</header>
	);
}

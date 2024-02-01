import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/ui/mode-toggle';

import UserNav from '@/components/user-nav';

export default async function page() {
	return (
		<main className=' w-full'>
			<header className='sticky top-0 z-50 w-full border-b  bg-background py-2 px-4 border-[#ddd] dark:border-[#333]'>
				<nav className='flex justify-between items-center gap-4'>
					<Input type='search' className='max-w-72' placeholder='Search' />
					<div className='flex  gap-2'>
						<UserNav />
						<ModeToggle />
					</div>
				</nav>
			</header>
		</main>
	);
}

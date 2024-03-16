import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NotFound() {
	return (
		<main className='flex h-[80vh] flex-col items-center justify-center gap-2 font-medium text-lg'>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href='/player' className={cn(buttonVariants())}>
				Return Home
			</Link>
		</main>
	);
}

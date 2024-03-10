import { LucideIcon } from 'lucide-react';
import { buttonVariants } from '../../button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NotFoundLibrary({
	Icon,
	message,
}: {
	Icon: LucideIcon;
	message: string;
}) {
	return (
		<div className='flex items-center justify-center h-[60vh] flex-col gap-4'>
			<Icon className='w-32 h-32 text-muted-foreground mx-auto' />

			<p className='text-muted-foreground text-lg font-medium'>{message}</p>
			<Link href={'/player'} className={cn(buttonVariants())}>
				Go to Home Page
			</Link>
		</div>
	);
}

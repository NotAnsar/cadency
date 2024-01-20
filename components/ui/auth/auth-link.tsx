import React from 'react';
import { buttonVariants } from '../button';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../mode-toggle';
import Link from 'next/link';

export default function AuthLink({ type }: { type: 'login' | 'register' }) {
	const linkPath = type === 'login' ? '/register' : '/login';

	return (
		<div className='absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2'>
			<ModeToggle />
			<Link
				href={linkPath}
				className={cn(buttonVariants({ variant: 'ghost' }))}
			>
				{type === 'login' ? 'Register' : 'Login'}
			</Link>
		</div>
	);
}

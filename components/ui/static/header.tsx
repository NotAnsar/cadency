'use client';
import Link from 'next/link';
import Logo from '../../logo';
import { buttonVariants } from '../button';
import { ModeToggle } from '../mode-toggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Wrapper from './wrapper';

const mainNav = [
	{ title: 'Pricing', href: '/#pricing' },
	{ title: 'Features', href: '/#features' },
	{ title: 'FAQ', href: '/#FAQ' },
];
export default function Header() {
	const [showMobileNav, setshowMobileNav] = useState(false);
	const path = usePathname();

	return (
		<header className=' sticky top-0 z-50 w-full border-b border-border/40 bg-noise bg bg-background/70'>
			<Wrapper className='flex items-center justify-between'>
				<nav className='flex items-center'>
					<Logo className='text-2xl mr-8 font-medium' />
				</nav>
				<nav className='hidden md:flex items-center gap-6 text-sm '>
					{mainNav.map((nav, i) => (
						<Link
							href={nav.href}
							key={i}
							className={cn(
								'font-medium transition-colors hover:text-primary text-foreground/60',
								path === nav.href && 'text-primary font-semibold'
							)}
						>
							{nav.title}
						</Link>
					))}
				</nav>
				<nav className='flex items-center gap-2'>
					<Link
						href='/signin'
						className={cn(
							buttonVariants({ variant: 'ghost' }),
							'hidden md:flex'
						)}
					>
						Sign In
					</Link>
					<ModeToggle />
					<button
						className='block md:hidden'
						onClick={() => setshowMobileNav((a) => !a)}
					>
						{showMobileNav ? (
							<X strokeWidth={1.5} width={'2rem'} height={'2rem'} />
						) : (
							<Menu strokeWidth={1.5} width={'2rem'} height={'2rem'} />
						)}
					</button>
				</nav>
			</Wrapper>

			<div
				className={cn(
					// 'w-full bg-background px-2 py-4 block md:hidden',
					'w-full  px-2 py-4 block md:hidden ',
					!showMobileNav && 'hidden'
				)}
			>
				<Link
					href='/signin'
					className={cn(
						buttonVariants({ variant: 'secondary' }),
						'w-full my-2'
					)}
				>
					Sign In
				</Link>

				{mainNav.map((nav, i) => (
					<Link
						href={nav.href}
						key={i}
						className='block w-full border-b border-slate-6 py-4 font-semibold transition duration-200 ease-in-out last:border-none text-foreground/70 hover:text-primary'
					>
						{nav.title}
					</Link>
				))}
			</div>
		</header>
	);
}

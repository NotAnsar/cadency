import { cn } from '@/lib/utils';
import { buttonVariants } from '../../button';
import classes from './header.module.css';
import Link from 'next/link';
import Wrapper from '../wrapper';

export default function Hero() {
	return (
		<Wrapper
			id='hero'
			className={cn(
				'grid items-center h-[550px] text-center w-full',
				classes.hero
			)}
		>
			<div className='mx-auto'>
				<h1 className='text-[40px] md:text-7xl font-medium mb-8'>
					Your Music, Your Way
				</h1>

				<p className='text-base text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto'>
					<span className='hidden md:inline'>
						Explore the musical world with Cadency, where every note, rhythm,
						and melody.
					</span>{' '}
					Discover, create, and let Cadency be the soundtrack to your journey.
				</p>
				<div className='flex gap-4 text-center justify-center items-center'>
					<Link
						href='/signin'
						className={cn(
							buttonVariants({ variant: 'hero_primary', size: 'hero' })
						)}
					>
						Sign In To Get Started
					</Link>

					<Link
						href='/pricing'
						className={cn(
							buttonVariants({ variant: 'hero_secondary', size: 'hero' }),
							'hidden md:inline-flex '
						)}
					>
						View all Premium plans
					</Link>
				</div>
			</div>
		</Wrapper>
	);
}

import { cn } from '@/lib/utils';
import { buttonVariants } from '../../button';
import Link from 'next/link';
import Wrapper from '../wrapper';
import Image from 'next/image';

export default function Hero() {
	return (
		<Wrapper id='hero'>
			<div className='w-96 h-40 bg-primary absolute right-[50%] left-[50%] -translate-x-1/2 md:-translate-x-0 md:right-[15%] mx-auto top-[65dvh] md:top-[45dvh] -rotate-45 blur-[140px] rounded-full -z-10' />
			<div className='mx-auto flex flex-col md:flex-row items-center mt-4'>
				<div className='col-span-2 text-left'>
					<h1 className='text-3xl  md:text-5xl lg:text-[53px] font-medium mb-4 '>
						<span className='text-primary font-semibold'>
							Cadence of Discovery:
						</span>{' '}
						Unlock Extraordinary Moments with Cadency.
					</h1>

					<p className='text-base text-muted-foreground mt-4 mb-8 max-w-2xl mx-auto'>
						Explore the musical world with Cadency, where every note, rhythm,
						and melody. Discover, create, and let Cadency be the soundtrack to
						your journey.
					</p>
					<div className='flex gap-4 items-center'>
						<Link
							href='/signin'
							className={cn(
								buttonVariants({ variant: 'hero_primary', size: 'hero' }),
								'rounded-md'
							)}
						>
							Get Started
						</Link>

						<Link
							href='/#pricing'
							className={cn(
								buttonVariants({ variant: 'hero_secondary', size: 'hero' }),
								'hidden md:inline-flex rounded-md'
							)}
						>
							View Premium plans
						</Link>
					</div>
				</div>
				<Image
					alt='dsds'
					src={'/download.webp'}
					width={640}
					height={640}
					className='w-auto aspect-square'
				/>
			</div>
		</Wrapper>
	);
}

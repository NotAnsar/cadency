import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { Lusitana } from 'next/font/google';
import Image from 'next/image';

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400'] });

export default function SignInLeftSection() {
	return (
		<div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r '>
			<div className='absolute inset-0 bg-gradient-to-br from-[#e11d48] to-black p-10 z-10 opacity-70' />
			<div className='absolute inset-0 bg-signin bg-cover bg-center' />

			<div className='relative z-20 flex items-center text-lg font-medium gap-2'>
				<Logo className='text-2xl' />
			</div>
			<div className='relative z-20 mt-auto pb-4'>
				<blockquote className='space-y-2'>
					<p className={cn('text-xl', lusitana.className)}>
						&ldquo;
						{`Unlock Your Sonic Journey with Cadency - Where Every Login Resonates in Perfect Harmony!`}
						&rdquo;
					</p>
				</blockquote>
			</div>
		</div>
	);
}

import Logo from '@/components/logo';
import Wrapper from './wrapper';
import { Facebook, Instagram, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='border-t border-border '>
			<div className='w-72 h-32 bg-primary absolute right-0  mx-auto blur-[140px] rounded-full -z-10' />
			<Wrapper className='py-10 md:flex  md:justify-between md:items-center space-y-4 md:space-y-0 gap-4'>
				<Logo className='text-2xl ' />
				<ul className='flex flex-col md:flex-row  md:items-center gap-3 text-muted-foreground '>
					{links.map((link, i) => (
						<li key={i}>
							<Link
								href={link.href}
								className='hover:text-primary'
								aria-label={link.title}
							>
								{link.title}
							</Link>
						</li>
					))}
				</ul>
				<ul className='flex items-center gap-4'>
					{socials.map((social, i) => (
						<li key={i}>
							<Link
								href={social.href}
								className=' w-9 h-9 bg-secondary hover: flex justify-center items-center rounded-full text-muted-foreground hover:bg-primary hover:text-white'
								target='_blank'
								aria-label={social.title}
							>
								<social.icon width={20} height={20} />
							</Link>
						</li>
					))}
				</ul>
			</Wrapper>
		</footer>
	);
}

const socials = [
	{ title: 'facebook', icon: Facebook, href: 'https://www.facebook.com/' },
	{ title: 'twitter', icon: Twitter, href: 'https://twitter.com/' },
	{ title: 'instagram', icon: Instagram, href: 'https://www.instagram.com/' },
	{ title: 'github', icon: Github, href: 'https://github.com/' },
];
const links = [
	{ title: 'Features', href: '/#features' },
	{ title: 'Pricing', href: '/#pricing' },
	{ title: 'Terms of Service', href: '/#' },
	{ title: 'FAQ', href: '/#FAQ' },
];

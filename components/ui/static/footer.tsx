import Logo from '@/components/logo';
import Wrapper from './wrapper';
import { Facebook, Instagram, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='bg-background/45'>
			<Wrapper className='py-10 md:flex  md:justify-between md:items-center space-y-4 md:space-y-0 gap-4'>
				<Logo className='text-2xl ' />
				<ul className='flex flex-col md:flex-row  md:items-center gap-3 text-muted-foreground '>
					{links.map((link, i) => (
						<Link key={i} href={link.href} className='hover:text-primary'>
							{link.title}
						</Link>
					))}
				</ul>
				<ul className='flex items-center gap-4'>
					{socials.map((social, i) => (
						<Link
							href={social.href}
							className=' w-9 h-9 bg-secondary hover: flex justify-center items-center rounded-full text-muted-foreground hover:bg-primary hover:text-white'
							key={i}
						>
							<social.icon width={20} height={20} />
						</Link>
					))}
				</ul>
			</Wrapper>
		</footer>
	);
}

const socials = [
	{ icon: Facebook, href: 'https://www.facebook.com/' },
	{ icon: Twitter, href: 'https://twitter.com/' },
	{ icon: Instagram, href: 'https://www.instagram.com/' },
	{ icon: Github, href: 'https://github.com/' },
];
const links = [
	{ title: 'About Us', href: 'https://www.facebook.com/' },
	{ title: 'Pricing', href: '/#pricing' },
	{ title: 'Terms of Service', href: 'https://www.instagram.com/' },
	{ title: 'FAQ', href: '/#FAQ' },
];

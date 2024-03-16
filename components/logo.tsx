import { cn } from '@/lib/utils';
import { Inknut_Antiqua } from 'next/font/google';
import Link from 'next/link';

const inknut_Antiqua = Inknut_Antiqua({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
});

type LogoProps = {
	className?: string | undefined;
	type?: 'mobile' | 'default';
	href?: string;
};

export default function Logo({
	type = 'default',
	href = '/',
	className,
	...props
}: LogoProps) {
	return (
		<Link
			href={href}
			className={cn(inknut_Antiqua.className, className)}
			{...props}
		>
			{type === 'default' ? 'Cadency' : 'C'}
		</Link>
	);
}

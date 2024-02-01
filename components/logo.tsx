import { cn } from '@/lib/utils';
import { Inknut_Antiqua } from 'next/font/google';
import Link from 'next/link';
const inknut_Antiqua = Inknut_Antiqua({
	subsets: ['latin'],
	weight: ['400', '500'],
});

type LogoProps = {
	className?: string | undefined;
	type?: 'mobile' | 'default';
};

export default function Logo({
	type = 'default',
	className,
	...props
}: LogoProps) {
	return (
		<Link
			href={'/'}
			className={cn(inknut_Antiqua.className, className)}
			{...props}
		>
			{type === 'default' ? 'Cadency' : 'C'}
		</Link>
	);
}

'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingNav() {
	const path = usePathname();
	return (
		<nav className='flex gap-8 border-b border-border text-muted-foreground'>
			{settingNav.map((link) => (
				<Nav
					currentPath={path}
					label={link.label}
					path={link.path}
					key={link.path}
				/>
			))}
		</nav>
	);
}

function Nav({
	currentPath,
	path,
	label,
}: {
	path: string;
	label: string;
	currentPath: string;
}) {
	return (
		<Link
			href={path}
			className={cn(
				'text-foreground p-4 cursor-pointer',
				path === currentPath ? 'border-b-2 border-primary font-semibold ' : ''
			)}
		>
			{label}
		</Link>
	);
}

const settingNav = [
	{ path: '/player/setting', label: 'My information' },
	{ path: '/player/setting/appearance', label: 'Appearance' },
	{ path: '/player/setting/billing', label: 'Billing' },
	{ path: '/player/setting/close-account', label: 'Close Account' },
];

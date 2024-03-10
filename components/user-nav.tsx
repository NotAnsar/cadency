'use client';

import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { UserAvatar } from './user-avatar';
import { useTheme } from 'next-themes';
import { Switch } from './ui/switch';

export default function UserNav({
	user,
}: {
	user: {
		name?: string | null | undefined;
		email?: string | null | undefined;
		image?: string | null | undefined;
	};
}) {
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{ name: user?.name || null, image: user?.image || null }}
					className='h-8 w-8'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='bg-background/80 backdrop-blur-md '
			>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && (
							<p className='w-[200px] truncate text-sm text-muted-foreground'>
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/player'>Home</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='/player/profile'>Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='/player/setting'>Settings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<div className='flex gap-4 justify-between'>
						<p>Dark Mode</p>
						<Switch
							id='theme'
							checked={theme === 'dark'}
							onCheckedChange={() =>
								setTheme(theme === 'light' ? 'dark' : 'light')
							}
						/>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onSelect={(event) => {
						event.preventDefault();
						signOut({ callbackUrl: `/signin` });
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

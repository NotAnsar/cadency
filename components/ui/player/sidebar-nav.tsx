'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../button';
import { ScrollArea } from '../scroll-area';
import Logo from '@/components/logo';
import {
	Home,
	Library,
	ListMusic,
	ListMusicIcon,
	Mic2,
	Music2,
	PlusCircle,
	Heart,
	LucideIcon,
	Search,
	LibraryBig,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../tooltip';
import Link from 'next/link';
import { TooltipPortal } from '@radix-ui/react-tooltip';

export default function SideBarNav({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const path = usePathname();

	return (
		<div
			className={cn(
				'pb-12 w-[72px] md:w-52 bg-background border-r-2 border-[#ddd] dark:border-[#333] flex flex-col  ',
				className,
				'h-screen fixed' //
			)}
			{...props}
		>
			<TooltipProvider delayDuration={0}>
				<div className='space-y-4 py-4'>
					<div className='px-3 py-2 space-y-6'>
						<div>
							<Logo
								className='text-2xl ps-2 hidden md:block font-medium'
								href='/player'
							/>
							<Logo
								type='mobile'
								className='text-2xl grid justify-center md:hidden  font-medium'
								href='/player'
							/>
						</div>

						<div className='flex flex-col gap-1'>
							{mainNav.map((item, i) => (
								<Nav
									Icon={item.icon}
									title={item.title}
									path={item.path}
									currentPath={path}
									key={i}
								/>
							))}
						</div>
					</div>
					<div className='px-3 py-2'>
						<h2 className='mb-2 px-4 text-lg font-semibold tracking-tight hidden md:block'>
							Library
						</h2>
						<div className='flex flex-col gap-1'>
							{library.map((item, i) => (
								<Nav
									Icon={item.icon}
									title={item.title}
									path={item.path}
									currentPath={path}
									key={i}
								/>
							))}
						</div>
					</div>

					<div className='py-2'>
						<h2 className='relative px-7 text-lg font-semibold tracking-tight hidden md:block'>
							Playlists
						</h2>
						<ScrollArea className='max-h-[220px] px-1'>
							<div className='flex flex-col gap-1 p-2'>
								<Nav
									Icon={PlusCircle}
									title={'New Playlist'}
									path={'/platlist/new'}
									currentPath={path}
								/>
								{playlists?.map((playlist, i) => (
									<Nav
										Icon={ListMusicIcon}
										title={playlist}
										path={'/platlist/' + playlist}
										currentPath={path}
										key={i}
									/>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</TooltipProvider>
		</div>
	);
}

const playlists: string[] = [];

const library = [
	{ title: 'Albums', icon: Library, path: '/player/library/albums' },
	{ title: 'Artists', icon: Mic2, path: '/player/library/artists' },
	{ title: 'Songs', icon: Music2, path: '/player/library/songs' },
	{ title: 'Playlists', icon: ListMusic, path: '/player/library/playlists' },
];

const mainNav = [
	{ title: 'Home', icon: Home, path: '/player' },
	{ title: 'Library', icon: LibraryBig, path: '/player/library' },
];

function Nav({
	title,
	Icon,
	path,
	currentPath,
}: {
	title: string;
	Icon: LucideIcon;
	path: string;
	currentPath: string;
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					className={cn(
						buttonVariants({
							variant: path === currentPath ? 'secondary' : 'ghost',
						}),
						'justify-start'
					)}
					href={path}
				>
					<Icon className='md:mr-2 h-4 w-4' />
					<p className='hidden md:block'>{title}</p>
				</Link>
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent
					side='right'
					className='flex items-center gap-4 md:hidden'
				>
					{title}
				</TooltipContent>
			</TooltipPortal>
		</Tooltip>
	);
}

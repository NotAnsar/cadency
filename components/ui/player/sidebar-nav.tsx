'use client';

import { cn } from '@/lib/utils';
import { Button } from '../button';
import { ScrollArea } from '../scroll-area';
import Logo from '@/components/logo';
import {
	Home,
	LayoutGrid,
	Library,
	ListMusic,
	ListMusicIcon,
	Mic2,
	Music2,
	PlusCircle,
	Heart,
	LucideIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../tooltip';

export default function SideBarNav({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const path = usePathname();

	return (
		<div
			className={cn(
				'pb-12 md:w-64 bg-background border-r-2 border-[#ddd] dark:border-[#333] flex flex-col',
				className
			)}
			{...props}
		>
			<TooltipProvider delayDuration={0}>
				<div className='space-y-4 py-4'>
					<div className='px-3 py-2 space-y-6'>
						<div>
							<Logo className='text-2xl ps-2 hidden md:block font-medium' />
							<Logo
								type='mobile'
								className='text-2xl grid justify-center md:hidden  font-medium'
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

const playlists: string[] = ['fkllmfke'];
const library = [
	{ title: 'Playlists', icon: ListMusic, path: '/player/library/playlists' },
	{ title: 'Songs', icon: Music2, path: '/player/library' },
	{ title: 'Artists', icon: Mic2, path: '/player/library' },
	{ title: 'Albums', icon: Library, path: '/player/library' },
];
const mainNav = [
	{ title: 'Home', icon: Home, path: '/player' },
	{ title: 'Browse', icon: LayoutGrid, path: '/player/browse' },
	{ title: 'Favorites', icon: Heart, path: '/player/library' },
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
				<Button
					variant={path === currentPath ? 'secondary' : 'ghost'}
					className='justify-start'
				>
					<Icon className='md:mr-2 h-4 w-4' />
					<p className='hidden md:block'>{title}</p>
				</Button>
			</TooltipTrigger>
			<TooltipContent
				side='right'
				className='flex items-center gap-4 md:hidden'
			>
				{title}
			</TooltipContent>
		</Tooltip>
	);
}

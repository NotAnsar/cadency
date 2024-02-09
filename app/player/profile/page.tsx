import { getCurrentUser } from '@/lib/session';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Chart } from '@/types/music';
import ListPlaylists from '@/components/ui/player/profile/ListPlaylists';
import ListFollowedArtists from '@/components/ui/player/profile/ListFollowedArtists';
import { getChart } from '@/lib/db';

export default async function page() {
	const user = await getCurrentUser();
	const { albums, artists }: Chart = await getChart();

	return (
		<main>
			<div
				className='bg-noise w-full relative'
				style={{
					background:
						' linear-gradient(180deg, rgba(225,29,72,.8) 0%, rgba(225,29,72,.25) 100%)',
				}}
			>
				<div className='flex flex-col items-center text-center justify-center p-8'>
					{user ? (
						<Image
							alt={user.name ? user.name : ''}
							src={user.image ? user.image : ''}
							className={cn(
								'h-44 w-44 md:h-52 md:w-52 bg-noise rounded-full mx-auto md:me-auto bg-[#e11d48]'
							)}
							width={208}
							height={208}
						/>
					) : (
						<div
							className={cn(
								'h-44 w-44 md:h-52 md:w-52 z-10 rounded-full mx-auto md:me-auto md:ms-0  bg-[#e11d48]'
							)}
						/>
					)}

					<div className='flex flex-col md:flex-row md:items-center md:justify-between mt-2 gap-4 w-full'>
						<div className='md:mb-0 md:text-left'>
							<h2 className='text-3xl font-semibold'>Ansar Karrouach</h2>
							<p className='text-muted-foreground'>karrouach.ansar@gmail.com</p>
						</div>
						<Link
							href={'/player/setting'}
							className='bg-primary px-4 py-2 rounded-full text-white '
						>
							Settings
						</Link>
					</div>
				</div>
			</div>

			<div
				className='p-8'
				style={{
					background:
						' linear-gradient(180deg, rgba(225,29,72,.2) 0%, rgba(225,29,72,0) 50%)',
				}}
			>
				<Tabs defaultValue='playlist' className='w-full'>
					<TabsList className='flex w-full bg-transparent justify-normal gap-4 mb-8'>
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.value}
								className='text-[15px] data-[state=active]:bg-foreground data-[state=active]:text-background px-6 py-2 hover:bg-secondary rounded-md'
								value={tab.value}
							>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value='playlist'>
						<ListPlaylists albums={albums} />
					</TabsContent>
					<TabsContent value='following'>
						<ListFollowedArtists artists={artists} />
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}

const tabs = [
	{ value: 'playlist', label: 'Playlist' },
	{ value: 'following', label: 'Following' },
];

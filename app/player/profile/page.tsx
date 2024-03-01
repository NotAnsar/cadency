import { getCurrentUser } from '@/lib/session';

import Link from 'next/link';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ListPlaylists from '@/components/ui/player/profile/ListPlaylists';
import ListFollowedArtists from '@/components/ui/player/profile/ListFollowedArtists';
import ProfileDialog from '@/components/ui/player/profile/Profile-dialog';

export default async function Page() {
	const user = await getCurrentUser();

	return (
		<main>
			<div className='w-full relative'>
				<div className='flex flex-col items-center justify-center p-8'>
					<ProfileDialog user={user} />
					<div className='flex flex-col md:flex-row md:items-center md:justify-between mt-2 gap-4 w-full text-center'>
						<div className='md:mb-0 md:text-left'>
							<h2 className='text-3xl font-semibold'>{user?.name}</h2>
							<p className='text-muted-foreground'>{user?.email}</p>
						</div>
						<Link
							href={'/player/setting'}
							className='bg-primary px-4 py-2 rounded-full text-white  '
						>
							Settings
						</Link>
					</div>
				</div>
			</div>

			<div className='p-8'>
				<Tabs defaultValue='following' className='w-full'>
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
					<TabsContent value='following'>
						<ListFollowedArtists />
					</TabsContent>
					{/* <TabsContent value='playlist'>
						<ListPlaylists albums={albums} />
					</TabsContent> */}
				</Tabs>
			</div>
		</main>
	);
}

const tabs = [
	{ value: 'following', label: 'Following' },
	// { value: 'playlist', label: 'Playlist' },
];

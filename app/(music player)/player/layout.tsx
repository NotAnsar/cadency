import AudioPlayer from '@/components/ui/player/audio-player/audio-player';
import SideBarNav from '@/components/ui/player/sidebar-nav';
import TopNav from '@/components/ui/player/top-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

type PlayerLayoutProps = { children: React.ReactNode };

export default async function PlayerLayout({ children }: PlayerLayoutProps) {
	return (
		<>
			<div className='flex bg-background h-screen'>
				<SideBarNav />
				<div className='w-full'>
					<TopNav />
					<div>
						<ScrollArea style={{ height: 'calc(100vh - 56px)' }}>
							<main className='p-8 pb-20'>{children}</main>
							<AudioPlayer />
						</ScrollArea>
					</div>
				</div>
			</div>
		</>
	);
}

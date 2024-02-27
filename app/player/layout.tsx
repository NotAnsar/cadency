import AudioPlayer from '@/components/ui/player/audio-player/audio-player';
import SideBarNav from '@/components/ui/player/sidebar-nav';
import TopNav from '@/components/ui/player/top-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

type PlayerLayoutProps = { children: React.ReactNode };

export default async function PlayerLayout({ children }: PlayerLayoutProps) {
	return (
		<div className=''>
			<SideBarNav />
			<div className='ml-[72px] md:ml-52 w-[calc(100%-4.5rem)] md:w-[calc(100%-13rem)] bg-background'>
				<TopNav />

				<ScrollArea className='h-[calc(100vh-8.5rem)] w-full mx-auto max-w-[1500px]'>
					{children}
				</ScrollArea>
				<AudioPlayer />
			</div>
		</div>
	);
}

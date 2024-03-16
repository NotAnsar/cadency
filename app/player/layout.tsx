import AudioPlayer from '@/components/ui/player/audio-player/audio-player';
import SideBarNav from '@/components/ui/player/sidebar-nav';
import TopNav from '@/components/ui/player/top-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AudioPlayerProvider } from '@/context/music-player';
import NextTopLoader from 'nextjs-toploader';

type PlayerLayoutProps = { children: React.ReactNode };

export default async function PlayerLayout({ children }: PlayerLayoutProps) {
	return (
		<div>
			<NextTopLoader
				color='#e11d48'
				initialPosition={0.08}
				crawlSpeed={200}
				height={4}
				crawl={true}
				showSpinner={false}
				easing='ease'
				speed={200}
				shadow='0 0 10px #e11d48,0 0 5px #e11d48'
			/>

			<SideBarNav />

			<div className='ml-[72px] md:ml-52 w-[calc(100%-4.5rem)] md:w-[calc(100%-13rem)] bg-background'>
				<TopNav />

				<AudioPlayerProvider>
					<ScrollArea className='h-[calc(100vh-8.5rem)] w-full mx-auto max-w-[1500px]'>
						{children}
					</ScrollArea>
					<AudioPlayer />
				</AudioPlayerProvider>
			</div>
		</div>
	);
}

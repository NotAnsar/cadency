import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProvider from '@/components/session-provider';
import { getServerSession } from 'next-auth';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Cadency | Find Your Perfect Pulse.',
	description: `Cadency is more than just a music app; it's your gateway to a world of rhythmic bliss. Immerse yourself in a seamless audio experience where every note resonates with perfection. Discover curated playlists, explore new beats, and effortlessly sync with your favorite melodies. With Cadency, the harmony is in your hands, offering a smooth and personalized journey through the heart of your music.`,
};

type LayoutProps = { children: React.ReactNode };

export default async function RootLayout({ children }: LayoutProps) {
	const session = await getServerSession();

	return (
		<html
			lang='en'
			suppressHydrationWarning={true}
			className='scroll-smooth overflow-x-hidden'
		>
			<head />
			<body
				className={cn(montserrat.className, 'bg-noise')}
				suppressHydrationWarning={true}
			>
				<SessionProvider session={session}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}

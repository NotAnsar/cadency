import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProvider from '@/components/session-provider';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Cadency | Find Your Perfect Pulse.',
	description: `Cadency is more than just a music app; it's your gateway to a world of rhythmic bliss. Immerse yourself in a seamless audio experience where every note resonates with perfection. Discover curated playlists, explore new beats, and effortlessly sync with your favorite melodies. With Cadency, the harmony is in your hands, offering a smooth and personalized journey through the heart of your music.`,
};

type LayoutProps = { children: React.ReactNode };

export default async function RootLayout({ children }: LayoutProps) {
	const session = await getServerSession();

	return (
		<html lang='en' suppressHydrationWarning={true}>
			<head />
			<body className={inter.className} suppressHydrationWarning={true}>
				<SessionProvider session={session}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}

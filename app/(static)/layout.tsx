import Footer from '@/components/ui/static/footer';
import Header from '@/components/ui/static/header';

type LayoutProps = { children: React.ReactNode };

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<div>
			<Header />
			<main className='mt-[65px]'>{children}</main>

			<Footer />
		</div>
	);
}

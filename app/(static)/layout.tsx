import Header from '@/components/ui/static/header';

type LayoutProps = { children: React.ReactNode };

export default async function RootLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}

type LayoutProps = { children: React.ReactNode };

export default async function PlayerLayout({ children }: LayoutProps) {
	return <div className='px-8 py-6 mb-16'>{children}</div>;
}

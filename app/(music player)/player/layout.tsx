import SideBarNav from '@/components/ui/player/sidebar-nav';
import Menu from '@/components/ui/player/sidebar-nav';

type PlayerLayoutProps = { children: React.ReactNode };

export default async function PlayerLayout({ children }: PlayerLayoutProps) {
	return (
		<div className='flex bg-background'>
			<SideBarNav />
			{children}
		</div>
	);
}

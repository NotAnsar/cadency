import SettingNav from '@/components/ui/player/setting/SettingNav';

type LayoutProps = { children: React.ReactNode };
export default function page({ children }: LayoutProps) {
	return (
		<div className='space-y-6 p-10 pb-16 '>
			<div className='space-y-0.5'>
				<h2 className='text-3xl font-bold tracking-tight'>Settings</h2>
				<p className='text-muted-foreground'>
					Manage your account settings and set Theme preferences.
				</p>
			</div>
			<SettingNav />
			<main className='mt-4'>{children}</main>
		</div>
	);
}

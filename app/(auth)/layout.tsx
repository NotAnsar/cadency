import AuthLeftSection from '@/components/ui/auth/auth-left-section';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type AuthLayoutProps = { children: React.ReactNode };

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const session = await getServerSession();

	if (session) {
		redirect('/');
	}

	return (
		<div className='container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 '>
			<AuthLeftSection />
			{children}
		</div>
	);
}

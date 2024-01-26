import FormSection from '@/components/ui/auth/form-section';
import { Metadata } from 'next';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import SignInLeftSection from '@/components/ui/auth/signin-left-section';

export const metadata: Metadata = {
	title: 'Cadency | Sign in page',
	description: 'Sign in to have Access.',
};

export default async function page() {
	const user = await getCurrentUser();

	if (user) redirect('/player');

	return (
		<div className='container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 '>
			<SignInLeftSection />
			<FormSection />
			<div className='absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2'>
				<ModeToggle />
			</div>
		</div>
	);
}

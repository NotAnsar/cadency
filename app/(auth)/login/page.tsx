import FormSection from '@/components/ui/auth/form-section';

import AuthLink from '@/components/ui/auth/auth-link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account',
};

export default function page() {
	return (
		<>
			<FormSection type='login' />
			<AuthLink type='login' />
		</>
	);
}

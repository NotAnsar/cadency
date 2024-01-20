import FormSection from '@/components/ui/auth/form-section';

import AuthLink from '@/components/ui/auth/auth-link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create an account',
	description: 'Create an account to get started.',
};

export default function page() {
	return (
		<>
			<FormSection type='register' />
			<AuthLink type='register' />
		</>
	);
}

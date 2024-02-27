import { getCurrentUserData } from '@/actions/user-actions';
import SettingForm from '@/components/ui/player/setting/SettingForm';
import { redirect } from 'next/navigation';
import { use } from 'react';

export default async function Page() {
	const user = await getCurrentUserData();

	if (!user) {
		redirect('/signin');
	}

	return <SettingForm user={user} />;
}

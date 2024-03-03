import SettingForm from '@/components/ui/player/setting/SettingForm';
import { getCurrentUserData } from '@/lib/db/user';

import { notFound } from 'next/navigation';

export default async function Page() {
	const user = await getCurrentUserData();

	if (!user) notFound();

	return <SettingForm {...user} />;
}

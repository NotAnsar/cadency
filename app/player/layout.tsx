import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type PlayerLayoutProps = { children: React.ReactNode };

export default async function PlayerLayout({ children }: PlayerLayoutProps) {
	const session = await getServerSession();

	if (!session || !session.user) {
		redirect('/login');
	}

	return <>{children}</>;
}

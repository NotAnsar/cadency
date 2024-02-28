import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);
	return session?.user as
		| {
				name?: string | null | undefined;
				email?: string | null | undefined;
				image?: string | null | undefined;
				id?: string | null | undefined;
		  }
		| undefined;
}

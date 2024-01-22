import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';

// import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/register',
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			if (!profile?.email) {
				console.log('error');

				throw new Error('No Profile');
			}

			// create or update user
			await prisma.user.upsert({
				where: {
					email: profile.email,
				},
				create: {
					email: profile.email,
					name: profile.name,
					image: profile.image,
				},
				update: {
					name: profile.name,
				},
			});

			return true;
		},
	},
};

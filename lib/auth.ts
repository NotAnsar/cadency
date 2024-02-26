import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

import { prisma } from './prisma';
import { sendVerificationRequest } from '../lib/email-provider-utils';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma as any),
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: 'jwt' },
	pages: { signIn: '/signin', newUser: '/player' },
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			allowDangerousEmailAccountLinking: true,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
			allowDangerousEmailAccountLinking: true,
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
			sendVerificationRequest,
		}),
	],
	callbacks: {
		session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					email: token.email,
					image: token.picture,
					name: token.name,
					// add subscription type
				},
			};
		},
		async jwt({ token, user }) {
			const u = await prisma.user.findFirst({
				where: { email: token.email || undefined },
			});

			if (!u) {
				if (user) token.id = user.id;
				return token;
			}

			// we add id to the token
			return {
				...token,
				email: u.email,
				id: u.id,
				name: u.name,
				picture: u.image,
				// and add subscription type
			};
		},
	},
};

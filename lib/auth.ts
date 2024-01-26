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
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
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
		async signIn({ profile, account }) {
			if (account?.provider === 'github' || account?.provider === 'google') {
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
					update: {},
				});
			}

			return true;
		},

		session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					email: token.email,
					image: token.picture,
					name: token.name,
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
			};
		},
	},
};

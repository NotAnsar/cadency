import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
// import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,

	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID as string,
			clientSecret: process.env.FACEBOOK_SECRET as string,
		}),
		// EmailProvider({
		// 	server: process.env.EMAIL_SERVER,
		// 	from: process.env.EMAIL_FROM,
		// }),
	],
};

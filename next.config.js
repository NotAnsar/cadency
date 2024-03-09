/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['@prisma/client'], // do not load those pachages in the client
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
				port: '',
				pathname: '/image/**',
			},

			{
				protocol: 'https',
				hostname: 'api.deezer.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'e-cdns-images.dzcdn.net',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cadency.s3.eu-west-3.amazonaws.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;

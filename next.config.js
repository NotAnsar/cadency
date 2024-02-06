/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['@prisma/client'], // do not load those pachages in the client
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
				port: '',
				pathname: '/image/**',
			},
			{
				protocol: 'https',
				hostname: 'is1-ssl.mzstatic.com',
				port: '',
				pathname: '/image/**',
			},
		],
	},
};

module.exports = nextConfig;

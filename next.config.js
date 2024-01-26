/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['@prisma/client'], // do not load those pachages in the client
	},
};

module.exports = nextConfig;

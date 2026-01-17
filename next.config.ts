/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
			},
		],
	},
	env: {
		// NPM Download Statistics API
		NEXT_PUBLIC_NPM_API_ENDPOINT: "https://api.npmjs.org",
		// NPM.IO API Endpoint for search and analysis
		NEXT_PUBLIC_NPMIO_API_ENDPOINT: "https://api.npms.io",
		// NPM Registry API Endpoint
		NEXT_PUBLIC_NPM_REGISTRY_API_ENDPOINT: "https://registry.npmjs.org",
		// BundlePhobia API Endpoint for bundle size analysis
		NEXT_PUBLIC_BUNDLEPHOBIA_API_ENDPOINT: "https://bundlephobia.com",
	},
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
			},
			{
				hostname: "api.producthunt.com",
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
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error"],
					}
				: false,
	},

	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
					// Add preconnect for ProductHunt API
					{
						key: "Link",
						value: "<https://api.producthunt.com>; rel=preconnect; crossorigin",
					},
					// Optimize cache headers for static assets
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			// Specific cache headers for different asset types
			{
				source: "/_next/static/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=300, s-maxage=600",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;

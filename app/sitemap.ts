import type { MetadataRoute } from "next";

const BASE_URL = "https://npmstats.ingeniousclan.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: `${BASE_URL}/package`,
			lastModified: new Date(),
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/package/sitemap.xml`,
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/catalog`,
			lastModified: new Date(),
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/catalog/sitemap.xml`,
			lastModified: new Date(),
			priority: 0.8,
		},
	];

	return staticPages;
}

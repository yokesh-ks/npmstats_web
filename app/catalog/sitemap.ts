import type { MetadataRoute } from "next";
import { catalog } from "@/src/constants/npm-catalog";

const BASE_URL = "https://npmstats.ingeniousclan.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	// Dynamic catalog pages
	const catalogPages: MetadataRoute.Sitemap = catalog.map((item) => ({
		url: `${BASE_URL}/catalog/${item.slug}`,
		lastModified: new Date(),
		priority: 0.7,
	}));

	return catalogPages;
}

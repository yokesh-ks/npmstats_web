import type { MetadataRoute } from "next";
import { packages } from "@/src/constants/popular-packages";

const BASE_URL = "https://npmstats.ingeniousclan.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	// Dynamic package pages
	const packagePages: MetadataRoute.Sitemap = packages.map((pkg) => ({
		url: `${BASE_URL}/package/${pkg}`,
		lastModified: new Date(),
		priority: 0.7,
	}));

	return packagePages;
}

import type { Metadata } from "next";
import { DownloadLytics } from "./_sections/download-analytics";
import { siteConfig } from "@/config/site";

interface PackagePageProps {
	params: Promise<{ slug: string[] }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
	params,
}: PackagePageProps): Promise<Metadata> {
	const { slug } = await params;
	const packageName = slug.join("/");

	return {
		title: `${packageName} - NPM Package Statistics | NpmStats`,
		description: `Get detailed insights into ${packageName} package statistics, download analytics, bundle size analysis, and more on NpmStats.`,
		alternates: {
			canonical: `${siteConfig.url}/package/${packageName}`,
		},
	};
}

export default async function IndexPage() {
	return <DownloadLytics />;
}

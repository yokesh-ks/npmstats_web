import API from "@/services/API";
import { PackageJsonLd } from "@/src/components/json-ld";
import { TopPackageHead } from "@/src/components/card/top-package-head";
import MaxWidthWrapper from "@/src/components/max-width-wrapper";
import { About } from "@/src/components/sections/package/about";
import { DownloadLytics } from "@/src/components/sections/package/download-analytics";
import { PackageNotFound } from "@/src/components/sections/package/not-found";
import { Version } from "@/src/components/sections/package/version";
import { Card } from "@/src/components/ui/card";
import { Tabs, TabsContent } from "@/src/components/ui/tabs";
import { siteConfig } from "@/config/site";

import "@/styles/markdown.css";

interface PackageLayoutProps {
	bundle: React.ReactNode;
	similar: React.ReactNode;
	params: {
		slug: string[];
	};
}

export default async function PackageLayout({
	bundle,
	similar,
	params,
}: PackageLayoutProps) {
	const resolvedParams = await params;
	const packageName = decodeURIComponent(resolvedParams?.slug.join("/"));
	const data = await API.getPackageDetails(packageName);

	if (!data?._id) {
		return <PackageNotFound />;
	}

	return (
		<>
			<PackageJsonLd
				name={packageName}
				description={data.description}
				url={siteConfig.url + "/package/" + encodeURIComponent(packageName)}
				version={data["dist-tags"]?.latest}
				author={data.author?.name}
				license={data.license}
				keywords={data.keywords}
			/>
			<div className="min-h-screen bg-muted/50 h-full w-full">
				<MaxWidthWrapper className="py-14">
					<Card className="p-6">
						<Tabs defaultValue="downloads" className="space-y-6">
							<TopPackageHead data={data} />

							<TabsContent value="downloads">
								<DownloadLytics />
							</TabsContent>

							<TabsContent value="bundle">{bundle}</TabsContent>

							<TabsContent value="similar">{similar}</TabsContent>

							<TabsContent value="versions">
								<Version versions={data?.time} tags={data?.["dist-tags"]} />
							</TabsContent>

							<TabsContent value="about">
								<About data={data} />
							</TabsContent>
						</Tabs>
					</Card>
				</MaxWidthWrapper>
			</div>
		</>
	);
}

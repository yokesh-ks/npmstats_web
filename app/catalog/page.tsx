import type { Metadata } from "next";
import Link from "next/link";
import { CatalogCard } from "@/src/components/card/catalog-card";
import { CatalogJsonLd } from "@/src/components/json-ld";
import MaxWidthWrapper from "@/src/components/max-width-wrapper";
import { getCatalogData } from "./actions";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: "NPM Package Catalog | NpmStats",
	description:
		"Browse our comprehensive catalog of tools and resources to enhance your development workflow and make better package decisions.",
	alternates: {
		canonical: `${siteConfig.url}/catalog`,
	},
};

export default async function CatalogPage() {
	const catalog = await getCatalogData();

	return (
		<>
			<CatalogJsonLd
				title="NPM Package Catalog"
				description="Browse our comprehensive catalog of tools and resources to enhance your development workflow and make better package decisions."
				url={`${siteConfig.url}/catalog`}
			/>
			<div className="relative">
				{/* Background gradient */}
				<div className="absolute inset-0 h-[50vh] bg-gradient-to-b from-primary/5 to-transparent" />

				<MaxWidthWrapper className="relative">
					{/* Header Section */}
					<div className="flex flex-col items-center text-center py-20">
						<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/80 md:text-5xl lg:text-6xl">
							NPM Package Catalog
						</h1>
						<p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
							Browse our comprehensive catalog of tools and resources to enhance
							your development workflow and make better package decisions.
						</p>
					</div>

					{/* Cards Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
						{catalog.map((item) => {
							return (
								<Link href={`/catalog/${item.slug}`} key={item.slug}>
									<CatalogCard item={item} />
								</Link>
							);
						})}
					</div>
				</MaxWidthWrapper>
			</div>
		</>
	);
}

import type { Metadata } from "next";
import { ChevronRight, Package, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogCategoryJsonLd } from "@/src/components/json-ld";
import { PopularPackageCard } from "@/src/components/card/popular-package-card";
import MaxWidthWrapper from "@/src/components/max-width-wrapper";
import { Badge } from "@/src/components/ui/badge";
import { getCatalogData, getCatalogItem } from "../actions";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
	const catalog = await getCatalogData();
	return catalog.map((item) => ({
		slug: item.slug,
	}));
}

const features = [
	"Real-time analysis",
	"Detailed insights",
	"Performance metrics",
	"Security scanning",
];

interface CatalogDetailPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: CatalogDetailPageProps): Promise<Metadata> {
	const { slug } = await params;
	const data = await getCatalogItem(slug);

	if (!data) {
		return {
			title: "Category Not Found | NpmStats",
		};
	}

	return {
		title: `${data.name} | NpmStats`,
		description: data.description,
		alternates: {
			canonical: `${siteConfig.url}/catalog/${slug}`,
		},
	};
}

export default async function CatalogDetailPage({
	params,
}: CatalogDetailPageProps) {
	const { slug } = await params;
	const data = await getCatalogItem(slug);

	if (!data) {
		notFound();
	}

	return (
		<>
			<CatalogCategoryJsonLd
				name={data.name}
				description={data.description}
				url={`${siteConfig.url}/catalog/${slug}`}
				packages={data.packages || []}
			/>
			<div className="relative min-h-screen">
				{/* Hero Section with Gradient */}
				<section className="relative overflow-hidden bg-gradient-to-b from-primary to-primary/90 pb-24 pt-24 md:pb-32 md:pt-28">
					<div className="absolute inset-0 bg-grid-white/10" />
					<div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />

					{/* Decorative blobs */}
					<div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 blur-3xl">
						<div className="aspect-square h-[24rem] rounded-full bg-white/10 opacity-50" />
					</div>
					<div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 blur-3xl">
						<div className="aspect-square h-[24rem] rounded-full bg-white/10 opacity-50" />
					</div>

					<MaxWidthWrapper className="relative">
						<div className="flex flex-col items-center text-center">
							{/* Badge */}
							<Badge className="mb-8 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
								IngeniousClan - NpmStats
							</Badge>

							{/* Title */}
							<h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
								{data.name}
							</h1>

							{/* Description */}
							<p className="mt-8 max-w-3xl text-lg text-white/90 md:text-xl lg:text-2xl">
								{data.description}
							</p>

							{/* Features list */}
							<div className="mt-12 flex flex-wrap justify-center gap-3">
								{features.map((feature) => (
									<span
										key={feature}
										className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm"
									>
										<ChevronRight className="h-3.5 w-3.5" />
										{feature}
									</span>
								))}
							</div>

							{/* Stats */}
							<div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
								{[
									{ label: "Active Users", value: "10,000+", icon: Users },
									{ label: "Packages Analyzed", value: "1M+", icon: Package },
									{ label: "User Rating", value: "4.9/5", icon: Star },
									{ label: "Daily Scans", value: "50K+", icon: Zap },
								].map((stat) => (
									<div key={stat.label} className="flex flex-col items-center">
										<stat.icon className="mb-2 h-6 w-6 text-white/80" />
										<div className="text-2xl font-bold text-white">
											{stat.value}
										</div>
										<div className="text-sm text-white/80">{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</MaxWidthWrapper>
				</section>

				{/* Packages Section */}
				{data.packages && data.packages.length > 0 && (
					<section className="py-20">
						<MaxWidthWrapper>
							<div className="flex flex-col items-center text-center mb-12">
								<Badge variant="outline" className="mb-4">
									Popular Packages
								</Badge>
								<h2 className="text-3xl font-bold md:text-4xl">
									Most Analyzed Packages
								</h2>
								<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
									Discover the most frequently analyzed npm packages using{" "}
									{data.name}. Get comprehensive insights and make informed
									decisions.
								</p>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{data.packages.map((pkg) => (
									<Link href={`/package/${pkg}`} key={pkg}>
										<PopularPackageCard pkg={pkg} />
									</Link>
								))}
							</div>
						</MaxWidthWrapper>
					</section>
				)}
			</div>
		</>
	);
}

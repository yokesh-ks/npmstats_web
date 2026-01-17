import { siteConfig } from "@/config/site";

interface BaseJsonLdProps {
	type: string;
	data: Record<string, any>;
}

export function JsonLd({ type, data }: BaseJsonLdProps) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": type,
		...data,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
			}}
		/>
	);
}

// Specific JSON-LD components for different page types
export function CatalogJsonLd({
	title,
	description,
	url,
}: {
	title: string;
	description: string;
	url: string;
}) {
	return (
		<JsonLd
			type="CollectionPage"
			data={{
				name: title,
				description,
				url,
				isPartOf: {
					"@type": "WebSite",
					"@id": siteConfig.url + "/#website",
				},
				publisher: {
					"@id": siteConfig.url + "/#organization",
				},
				inLanguage: "en-US",
			}}
		/>
	);
}

export function CatalogCategoryJsonLd({
	name,
	description,
	url,
	packages = [],
}: {
	name: string;
	description: string;
	url: string;
	packages?: string[];
}) {
	return (
		<JsonLd
			type="CollectionPage"
			data={{
				name,
				description,
				url,
				isPartOf: {
					"@type": "WebSite",
					"@id": siteConfig.url + "/#website",
				},
				publisher: {
					"@id": siteConfig.url + "/#organization",
				},
				mainEntity:
					packages.length > 0
						? {
								"@type": "ItemList",
								numberOfItems: packages.length,
								itemListElement: packages.map((pkg, index) => ({
									"@type": "ListItem",
									position: index + 1,
									item: {
										"@type": "SoftwareSourceCode",
										name: pkg,
										url: siteConfig.url + "/package/" + pkg,
									},
								})),
							}
						: undefined,
				inLanguage: "en-US",
			}}
		/>
	);
}

export function PackageJsonLd({
	name,
	description,
	url,
	version,
	author,
	license,
	keywords = [],
}: {
	name: string;
	description?: string;
	url: string;
	version?: string;
	author?: string;
	license?: string;
	keywords?: string[];
}) {
	return (
		<JsonLd
			type="SoftwareSourceCode"
			data={{
				name,
				description,
				url,
				codeRepository: "https://www.npmjs.com/package/" + name,
				programmingLanguage: "JavaScript",
				runtimePlatform: "Node.js",
				...(version && { softwareVersion: version }),
				...(author && {
					author: {
						"@type": "Person",
						name: author,
					},
				}),
				...(license && { license }),
				...(keywords.length > 0 && { keywords: keywords.join(", ") }),
				isPartOf: {
					"@type": "WebSite",
					"@id": siteConfig.url + "/#website",
				},
				publisher: {
					"@id": siteConfig.url + "/#organization",
				},
				provider: {
					"@id": siteConfig.url + "/#organization",
				},
				inLanguage: "en-US",
			}}
		/>
	);
}

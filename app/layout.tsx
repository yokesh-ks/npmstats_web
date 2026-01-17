import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";

import { siteConfig } from "@/config/site";
import { Footer } from "@/src/components/landing/footer";
import { Header } from "@/src/components/landing/header";
import { ThemeProvider } from "@/src/components/theme-provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	alternates: {
		canonical: siteConfig.url,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.title,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@npmstats",
		creator: "@npmstats",
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="scrollbar-hide">
			<body
				className={`${inter.variable} antialiased min-h-screen flex flex-col`}
			>
				{/* Google Analytics */}
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-HM24ZE69KK"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-HM24ZE69KK');
					`}
				</Script>

				{/* Microsoft Clarity */}
				<Script id="microsoft-clarity" strategy="afterInteractive">
					{`
						(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
						})(window, document, "clarity", "script", "ptc2mhocgm");
					`}
				</Script>

				{/* JSON-LD Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@graph": [
								{
									"@type": "WebSite",
									"@id": siteConfig.url + "/#website",
									url: siteConfig.url,
									name: siteConfig.title,
									description: siteConfig.description,
									publisher: {
										"@id": siteConfig.url + "/#organization",
									},
									potentialAction: [
										{
											"@type": "SearchAction",
											target: {
												"@type": "EntryPoint",
												urlTemplate:
													siteConfig.url + "/package/{search_term_string}",
											},
											"query-input": "required name=search_term_string",
										},
									],
									inLanguage: "en-US",
								},
								{
									"@type": "Organization",
									"@id": siteConfig.url + "/#organization",
									name: "Ingenious Clan",
									url: "https://www.ingeniousclan.com",
									sameAs: ["https://www.linkedin.com/company/ingeniousclan"],
									logo: {
										"@type": "ImageObject",
										url: siteConfig.url + "/favicon.ico",
									},
								},
								{
									"@type": "SoftwareApplication",
									"@id": siteConfig.url + "/#softwareapplication",
									name: "NpmStats",
									description: siteConfig.description,
									url: siteConfig.url,
									applicationCategory: "DeveloperApplication",
									operatingSystem: "Web Browser",
									offers: {
										"@type": "Offer",
										price: "0",
										priceCurrency: "USD",
									},
									provider: {
										"@id": siteConfig.url + "/#organization",
									},
									featureList: [
										"NPM Package Statistics",
										"Download Analytics",
										"Bundle Size Analysis",
										"Dependency Analysis",
										"Package Comparison",
										"Security Scanning",
									],
									keywords: siteConfig.keywords.join(", "),
								},
							],
						}).replace(/</g, "\\u003c"),
					}}
				/>

				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="flex-1 pt-16">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

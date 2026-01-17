import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
	return {
		rules: [
			// AI Crawlers - Allow all for AEO optimization
			{ userAgent: "GPTBot", allow: ["/"] },
			{ userAgent: "ChatGPT-User", allow: ["/"] },
			{ userAgent: "ClaudeBot", allow: ["/"] },
			{ userAgent: "CCBot", allow: ["/"] },
			{ userAgent: "PerplexityBot", allow: ["/"] },
			{ userAgent: "Google-Extended", allow: ["/"] },
			{ userAgent: "GoogleOther", allow: ["/"] },
			{ userAgent: "Bytespider", allow: ["/"] },
			{ userAgent: "FacebookBot", allow: ["/"] },
			{ userAgent: "cohere-ai", allow: ["/"] },
			{ userAgent: "Omgilibot", allow: ["/"] },
			{ userAgent: "Applebot", allow: ["/"] },
			{ userAgent: "Diffbot", allow: ["/"] },
			// Traditional search engine crawlers
			{ userAgent: "Googlebot", allow: ["/"] },
			{ userAgent: "Bingbot", allow: ["/"] },
			{ userAgent: "Slurp", allow: ["/"] },
			{ userAgent: "DuckDuckBot", allow: ["/"] },
			{ userAgent: "YandexBot", allow: ["/"] },
			{ userAgent: "Baiduspider", allow: ["/"] },
			// Default rule - allow all
			{ userAgent: "*", allow: ["/"] },
		],
		sitemap: "https://npmstats.ingeniousclan.com/sitemap.xml",
	};
};

export default robots;

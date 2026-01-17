import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1)}M`;
	}
	if (num >= 1000) {
		return `${(num / 1000).toFixed(1)}K`;
	}
	return num.toString();
}

export function addUtmParameters(url: string): string {
	const utmParams = new URLSearchParams({
		utm_source: "npmstats.ingeniousclan.com",
		utm_medium: "website",
		ref: "npmstats.ingeniousclan.com",
	});

	try {
		const urlObj = new URL(url);
		// Add UTM parameters to existing search params
		for (const [key, value] of utmParams) {
			urlObj.searchParams.set(key, value);
		}
		return urlObj.toString();
	} catch {
		// If URL is invalid, return as is
		return url;
	}
}

import Fetch from "@/services/fetch";
import { getDownloadRange, getPackageStats } from "@/services/npm-api";

export interface PackageAnalysis {
	score?: number;
	collected?: {
		metadata?: {
			name?: string;
			version?: string;
			description?: string;
		};
		github?: {
			starsCount?: number;
			forksCount?: number;
			issues?: {
				count?: number;
			};
		};
	};
	[key: string]: any;
}

class API {
	static async getDownloadData(period: string, packageName: string) {
		try {
			const response = await getDownloadRange(period, packageName);
			return response;
		} catch {
			// continue regardless of error
		}
	}

	static async searchSuggestion(searchText: string) {
		try {
			const url = `${process.env.NEXT_PUBLIC_NPMIO_API_ENDPOINT}/search/suggestions`;
			const response = await Fetch.getJSON(`${url}?q=${searchText}`, {
				next: { revalidate: 1800 },
			});
			return response;
		} catch {
			// continue regardless of error
		}
	}

	static async packageAnalysis(
		packageName: string,
	): Promise<PackageAnalysis | undefined> {
		try {
			const url = `${process.env.NEXT_PUBLIC_NPMIO_API_ENDPOINT}/package`;
			const response = await Fetch.getJSON(`${url}/${packageName}`, {
				next: { revalidate: 3600 },
			});
			return response as PackageAnalysis;
		} catch {
			// continue regardless of error
		}
	}

	static async getPackageStats(packageName: string) {
		try {
			const response = await getPackageStats(packageName);
			return response;
		} catch {
			// continue regardless of error
		}
	}
}

export default API;

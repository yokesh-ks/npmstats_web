import Fetch from "@/services/fetch";

const apiUrl = (path: string) =>
	`${process.env.NEXT_PUBLIC_APP_URL}/api/${path}`;

class API {
	static async getPackageDetails(packageName: string) {
		try {
			const response = await Fetch.getJSON(apiUrl(`npm/${packageName}`), {
				next: { revalidate: 3600 },
			});
			return response?.result;
		} catch {
			// continue regardless of error
		}
	}

	static async getSimilarPackages(packageName: string) {
		try {
			const response = await Fetch.getJSON(
				apiUrl(`npm/similar/${packageName}`),
				{
					next: { revalidate: 3600 },
				},
			);
			return response?.result;
		} catch {
			// continue regardless of error
		}
	}

	static async getDownloadData(period: string, packageName: string) {
		try {
			const response = await Fetch.getJSON(
				apiUrl(`npm/range/${period}/${packageName}`),
				{
					next: { revalidate: 3600 },
				},
			);
			return response?.result;
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

	static async packageAnalysis(packageName: string) {
		try {
			const url = `${process.env.NEXT_PUBLIC_NPMIO_API_ENDPOINT}/package`;
			const response = await Fetch.getJSON(`${url}/${packageName}`, {
				next: { revalidate: 3600 },
			});
			return response;
		} catch {
			// continue regardless of error
		}
	}

	static async getBundleSize(packageName: string) {
		try {
			const url = `${process.env.NEXT_PUBLIC_BUNDLEPHOBIA_API_ENDPOINT}/api/size`;
			const response = await Fetch.getJSON(
				`${url}/?package=${packageName}&record=true`,
				{
					next: { revalidate: 3600 },
				},
			);
			return response;
		} catch {
			// continue regardless of error
		}
	}

	static async getPackageStats(packageName: string) {
		try {
			const response = await Fetch.getJSON(apiUrl(`npm/stats/${packageName}`), {
				next: { revalidate: 3600 },
			});
			return response?.result;
		} catch {
			// continue regardless of error
		}
	}
}

export default API;

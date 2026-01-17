import Fetch from "@/services/fetch";

export interface BundleData {
	size: number;
	gzip: number;
	dependencyCount?: number;
	dependencySizes?: Record<string, number>;
}

export async function getBundleSize(
	packageName: string,
): Promise<BundleData | null> {
	try {
		const url = `${process.env.NEXT_PUBLIC_BUNDLEPHOBIA_API_ENDPOINT}/api/size`;
		const response = await Fetch.getJSON(
			`${url}/?package=${packageName}&record=true`,
			{
				next: { revalidate: 3600 },
			},
		);
		return response as BundleData;
	} catch {
		// continue regardless of error
		return null;
	}
}

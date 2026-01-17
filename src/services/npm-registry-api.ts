import Fetch from "@/services/fetch";

const NPM_REGISTRY_ENDPOINT = process.env.NEXT_PUBLIC_NPM_REGISTRY_API_ENDPOINT;

export interface PackageDetails {
	_id: string;
	name: string;
	description?: string;
	keywords?: string[];
	version: string;
	"dist-tags": {
		latest: string;
		[key: string]: string;
	};
	homepage?: string;
	repository?: {
		url?: string;
	};
	time?: {
		modified?: string;
		created?: string;
		[key: string]: string | undefined;
	};
	maintainers?: Array<{ name: string }>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	license?: string;
	author?: {
		name?: string;
	};
	// Add other properties as needed
	[key: string]: any;
}

export async function getPackageDetails(packageName: string): Promise<PackageDetails> {
	const url = `${NPM_REGISTRY_ENDPOINT}/${packageName}`;
	const response = await Fetch.getJSON(url) as any;

	if (!response?._id) {
		throw new Error("Package Details Not Found");
	}

	return response as PackageDetails;
}

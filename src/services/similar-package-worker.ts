const SIMILAR_PACKAGE_WORKER_URL =
	process.env.NEXT_PUBLIC_SIMILAR_PACKAGE_WORKER_URL;

export async function getSimilarPackages(packageName: string) {
	if (!SIMILAR_PACKAGE_WORKER_URL) return [];
	const response = await fetch(SIMILAR_PACKAGE_WORKER_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			package: packageName,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch similar packages: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

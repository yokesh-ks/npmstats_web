"use server";

import { getSimilarPackages as fetchSimilarPackages } from "@/services/similar-package-worker";

export async function getSimilarPackages(packageName: string) {
	return await fetchSimilarPackages(packageName);
}

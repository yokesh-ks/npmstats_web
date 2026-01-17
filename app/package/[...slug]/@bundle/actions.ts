"use server";

import { getBundleSize as getBundleSizeFromAPI } from "@/services/bundlephobia-api";

export async function getBundleSize(packageName: string) {
	return await getBundleSizeFromAPI(packageName);
}

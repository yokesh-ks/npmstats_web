"use server";

import { getDownloadRange } from "@/services/npm-api";
import { getPackageDetails } from "@/services/npm-registry-api";

export async function getPackageData(packageName: string) {
	try {
		return await getPackageDetails(packageName);
	} catch (error) {
		console.error(`Error fetching package data for ${packageName}:`, error);
		throw new Error(
			`Failed to fetch package data: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export async function getDownloadData(period: string, packageName: string) {
	try {
		const response = await getDownloadRange(period, packageName);
		return response;
	} catch (error) {
		console.error(`Error fetching download data for ${packageName}:`, error);
		return null;
	}
}

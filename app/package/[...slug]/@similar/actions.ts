"use server";

import dayjs from "dayjs";
import { getCategory } from "@/helpers/get-category";
import API from "@/services/API";
import { getDownloadPoint } from "@/services/npm-api";
import { categories } from "@/src/constants/fixtures";
import { getBundleSize } from "@/services/bundlephobia-api";
import { getPackageDetails } from "@/services/npm-registry-api";

const djsToStartDate = (djs: any) => djs.startOf("week").format("YYYY-MM-DD");

export async function getSimilarPackages(packageName: string) {
	const response = await getPackageDetails(packageName);
	const description = response?.description || "";
	const keywords = response?.keywords || [];
	const matchedCategory: any = await getCategory(
		packageName,
		description,
		keywords,
	);
	if (matchedCategory.label) {
		const value = categories[matchedCategory.label as keyof typeof categories];

		const similar = value.similar.filter(
			(pack: string) => pack !== packageName,
		);

		const detailedAnalysis = await Promise.all(
			similar?.map(async (item) => {
				try {
					const startDate = djsToStartDate(dayjs("2015-01-10"));
					const endDate = dayjs().format("YYYY-MM-DD");
					const period = `${startDate}:${endDate}`;

					const [res, pointsResponse, bundleResponse] = await Promise.all([
						API.packageAnalysis(item),
						getDownloadPoint(period, item),
						getBundleSize(item),
					]);
					if (res?.score) {
						return {
							...res,
							downloads: pointsResponse?.downloads,
							size: bundleResponse?.size,
						};
					}
				} catch (error) {
					console.error(`Error fetching data for ${item}:`, error);
					return null;
				}
			}),
		);

		const finalResult = similar?.map((item) => {
			const foundDetail = detailedAnalysis?.find(
				(i) => i?.collected?.metadata?.name === item,
			);
			return {
				name: item,
				version: foundDetail?.collected?.metadata?.version || "1.0.0",
				description: foundDetail?.collected?.metadata?.description || "",
				score: foundDetail?.score ? {
					final: foundDetail.score,
					detail: {
						quality: foundDetail.score * 0.4, // Approximate distribution
						popularity: foundDetail.score * 0.4,
						maintenance: foundDetail.score * 0.2,
					},
				} : {
					final: 0,
					detail: {
						quality: 0,
						popularity: 0,
						maintenance: 0,
					},
				},
				stats: [
					{ label: "Weekly Downloads", value: foundDetail?.downloads || 0 },
					{ label: "Bundle Size", value: foundDetail?.size || 0 },
					{
						label: "GitHub Stars",
						value: foundDetail?.collected?.github?.starsCount || 0,
					},
					{
						label: "Last Release",
						value: Date.now(), // Placeholder - would need actual release date
					},
				],
			};
		});

		return finalResult;
	} else {
		return [];
	}
}

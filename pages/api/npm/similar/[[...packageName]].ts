import dayjs from "dayjs";
import { getCategory } from "@/helpers/get-category";
import API from "@/services/API";
import Fetch from "@/services/fetch";
import { categories } from "@/src/constants/fixtures";

const NPM_API_ENDPOINT = `${process.env.NEXT_PUBLIC_NPM_API_ENDPOINT}/downloads`;

export const djsToStartDate = (djs: any) =>
	djs.startOf("week").format("YYYY-MM-DD");

export default async function handler(_req: any, res: any) {
	const { packageName } = await _req.query;
	const name = packageName?.join("/");

	const response = await API.getPackageDetails(name);
	const description = response?.description || "";
	const keywords = response?.keywords || [];
	const matchedCategory: any = await getCategory(name, description, keywords);
	if (matchedCategory.label) {
		const value = categories[matchedCategory.label as keyof typeof categories];

		const similar = value.similar.filter((pack: string) => pack !== name);

		const detailedAnalysis = await Promise.all(
			similar?.map(async (item) => {
				try {
					const startDate = djsToStartDate(dayjs("2015-01-10"));
					const endDate = dayjs().format("YYYY-MM-DD");
					const period = `${startDate}:${endDate}`;
					const pointsApiUrl = `${NPM_API_ENDPOINT}/point/${period}/${item}`;

					const [res, pointsResponse, bundleResponse] = await Promise.all([
						API.packageAnalysis(item),
						Fetch.getJSON(pointsApiUrl),
						API.getBundleSize(item),
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
				version: foundDetail?.collected?.metadata?.version,
				description: foundDetail?.collected?.metadata?.description,
				score: foundDetail?.score,
				stats: [
					{ label: "Downloads", value: foundDetail?.downloads || 0 },
					{ label: "Bundle Size", value: foundDetail?.size || 0 },
					{
						label: "Stars",
						value: foundDetail?.collected?.github?.starsCount || "-",
					},
					{
						label: "Forks",
						value: foundDetail?.collected?.github?.forksCount || "-",
					},
					{
						label: "Issues",
						value: foundDetail?.collected?.github?.issues?.count || "-",
					},
				],
			};
		});

		res.status(200).json({
			result: finalResult,
		});
	} else {
		res.status(200).json({
			result: [],
		});
	}
	return res.end();
}

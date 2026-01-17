import Fetch from "@/services/fetch";
import dayjs from "dayjs";

const NPM_API_ENDPOINT = `${process.env.NEXT_PUBLIC_NPM_API_ENDPOINT}/downloads`;

export interface DownloadPoint {
	downloads: number;
	package: string;
	start: string;
	end: string;
	[key: string]: any;
}

export async function getDownloadPoint(period: string, packageName: string): Promise<DownloadPoint | null> {
	try {
		const url = `${NPM_API_ENDPOINT}/point/${period}/${packageName}`;
		const response = await Fetch.getJSON(url);
		return response as DownloadPoint;
	} catch (error) {
		console.error(`Error fetching download point for ${packageName}:`, error);
		return null;
	}
}

export interface DownloadRange {
	downloads: Array<{
		day: string;
		downloads: number;
	}>;
	package: string;
	start: string;
	end: string;
	[key: string]: any;
}

export async function getDownloadRange(period: string, packageName: string): Promise<DownloadRange | null> {
	try {
		const url = `${NPM_API_ENDPOINT}/range/${period}/${packageName}`;
		const response = await Fetch.getJSON(url);
		return response as DownloadRange;
	} catch (error) {
		console.error(`Error fetching download range for ${packageName}:`, error);
		return null;
	}
}

export async function getPackageStats(packageName: string) {
	try {
		const startDate = djsToStartDate(dayjs("2015-01-10"));
		const endDate = dayjs().format("YYYY-MM-DD");
		const period = `${startDate}:${endDate}`;

		const pointsApiUrl = `${NPM_API_ENDPOINT}/point/${period}/${packageName}`;
		const pointsResponse = await Fetch.getJSON(pointsApiUrl) as DownloadPoint;

		// Get package analysis from npm.io API
		const analysisUrl = `${process.env.NEXT_PUBLIC_NPMIO_API_ENDPOINT}/package/${packageName}`;
		const packageDetails = await Fetch.getJSON(analysisUrl) as any;

		return [
			{ label: "Download", value: pointsResponse?.downloads },
			{
				label: "Stars",
				value: packageDetails?.collected?.github?.starsCount || "-",
			},
			{
				label: "Forks",
				value: packageDetails?.collected?.github?.forksCount || "-",
			},
			{
				label: "Issues",
				value: packageDetails?.collected?.github?.issues?.count || "-",
			},
		];
	} catch (error) {
		console.error(`Error fetching package stats for ${packageName}:`, error);
		return null;
	}
}

const djsToStartDate = (djs: dayjs.Dayjs) =>
	djs.startOf("week").format("YYYY-MM-DD");

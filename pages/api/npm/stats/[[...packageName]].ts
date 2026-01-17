import dayjs from "dayjs";
import API from "@/services/API";
import Fetch from "@/services/fetch";

const NPM_API_ENDPOINT = `${process.env.NEXT_PUBLIC_NPM_API_ENDPOINT}/downloads`;

export const djsToStartDate = (djs: dayjs.Dayjs) =>
	djs.startOf("week").format("YYYY-MM-DD");

export default async function handler(_req: any, res: any) {
	const { packageName } = _req.query;
	const name = packageName?.join("/");

	const startDate = djsToStartDate(dayjs("2015-01-10"));
	const endDate = dayjs().format("YYYY-MM-DD");
	const period = `${startDate}:${endDate}`;

	const pointsApiUrl = `${NPM_API_ENDPOINT}/point/${period}/${name}`;
	const pointsResponse = await Fetch.getJSON(pointsApiUrl);

	const packageDetails = await API.packageAnalysis(name);

	res.status(200).json({
		result: [
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
		],
	});
	return res.end();
}

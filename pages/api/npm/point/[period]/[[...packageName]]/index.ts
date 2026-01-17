import Fetch from "@/services/fetch";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_NPM_API_ENDPOINT}/downloads/point`;

export default async function handler(_req: any, res: any) {
	const { packageName, period } = await _req.query;
	const name = packageName?.join("/");

	const url = `${API_ENDPOINT}/${period}/${name}`;

	const response = await Fetch.getJSON(url);
	res.status(200).json({
		response,
	});
	return res.end();
}

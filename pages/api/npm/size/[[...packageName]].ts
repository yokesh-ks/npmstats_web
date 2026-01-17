import API from "@/services/API";

export default async function handler(_req: any, res: any) {
	const { packageName } = await _req.query;
	const name = packageName?.join("/");

	const response = await API.getBundleSize(name);
	res.status(200).json({
		result: response,
	});
	return res.end();
}

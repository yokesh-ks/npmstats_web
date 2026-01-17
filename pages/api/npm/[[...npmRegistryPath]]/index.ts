import Fetch from "@/services/fetch";

const NPM_REGISTRY_ENDPOINT = process.env.NEXT_PUBLIC_NPM_REGISTRY_API_ENDPOINT;

export default async function handler(_req: any, res: any) {
	const { npmRegistryPath } = await _req.query;
	const packageName = npmRegistryPath?.join("/");

	const url = `${NPM_REGISTRY_ENDPOINT}/${packageName}`;
	const response = await Fetch.getJSON(url);

	if (!response?._id) {
		return res.status(401).json({
			message: "Package Details Not Found",
		});
	}

	res.status(200).json({
		result: response,
	});
	return res.end();
}

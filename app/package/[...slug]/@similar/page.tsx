import API from "@/services/API";

import { SimilarPackage } from "@/src/components/sections/package/similar-package";

export default async function IndexPage({ params }: any) {
	const packageName = decodeURIComponent(params?.slug.join("/"));
	const data = await API.getSimilarPackages(packageName);
	return <SimilarPackage data={data} />;
}

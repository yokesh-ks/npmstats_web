import API from "@/services/API";

import { BundleCheck } from "@/src/components/sections/package/bundle-check";

export default async function IndexPage({ params }: any) {
	const resolvedParams = await params;
	const packageName = decodeURIComponent(resolvedParams?.slug.join("/"));
	const data = await API.getBundleSize(packageName);

	return <BundleCheck data={data} />;
}

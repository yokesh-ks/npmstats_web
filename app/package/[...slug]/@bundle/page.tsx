import { getBundleSize } from "./actions";

import { BundleCheck } from "./page-client";

export default async function IndexPage({ params }: any) {
	const resolvedParams = await params;
	const packageName = decodeURIComponent(resolvedParams?.slug.join("/"));
	const data = await getBundleSize(packageName);

	return <BundleCheck data={data} />;
}

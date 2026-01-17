import { getSimilarPackages } from "./actions";
import { PageClient } from "./page-client";

export default async function IndexPage({ params }: any) {
	const resolvedParams = await params;
	const packageName = decodeURIComponent(resolvedParams?.slug.join("/"));
	const data = await getSimilarPackages(packageName);
	return <PageClient data={data} />;
}

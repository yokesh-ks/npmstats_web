import Link from "next/link";
import { PopularPackageCard } from "@/src/components/card/popular-package-card";
import MaxWidthWrapper from "@/src/components/max-width-wrapper";
import { packages } from "@/src/constants/popular-packages";

export default function IndexPage() {
	return (
		<section className="py-14">
			<MaxWidthWrapper>
				<div className="flex flex-col items-center text-center pb-10">
					<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/80 md:text-5xl lg:text-6xl">
						Popular NPM Packages
					</h1>
				</div>
				<div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
					{packages.slice(0, 40).map((feature) => {
						return (
							<Link href={`/package/${feature}`} key={feature}>
								<PopularPackageCard pkg={feature} />
							</Link>
						);
					})}
				</div>
			</MaxWidthWrapper>
		</section>
	);
}

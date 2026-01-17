import { PackageX } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/src/components/max-width-wrapper";
import { Button } from "@/src/components/ui/button";

export default function NotFoundPage() {
	return (
		<MaxWidthWrapper className="py-14">
			<div className="flex h-[450px] shrink-0 items-center justify-center rounded-lg border bg-card p-8">
				<div className="mx-auto flex max-w-[400px] flex-col items-center justify-center text-center">
					<div className="rounded-full bg-muted p-4">
						<PackageX className="h-12 w-12 text-muted-foreground" />
					</div>
					<h3 className="mt-6 text-2xl font-semibold">Package Not Found</h3>
					<p className="mt-2 text-sm text-muted-foreground">
						The npm package you were looking for doesn&apos;t exist or has been
						unpublished.
					</p>
					<Button asChild className="mt-6" variant="outline">
						<Link href="/catalog">Browse Catalog</Link>
					</Button>
				</div>
			</div>
		</MaxWidthWrapper>
	);
}

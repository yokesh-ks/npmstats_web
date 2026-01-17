import { ExternalLink, Package } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/src/components/ui/card";

export function PopularPackageCard({ pkg }: { pkg: string }) {
	return (
		<Card className="group relative h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
			{/* Gradient Hover Effect */}
			<div
				aria-hidden="true"
				className="absolute inset-0 -translate-y-full bg-gradient-to-b from-primary/25 to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
			/>

			<CardContent className="p-6">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-primary/10 p-2.5">
							<Package className="h-5 w-5 text-primary" />
						</div>
						<CardTitle className="group-hover:text-primary transition-colors">
							{pkg}
						</CardTitle>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						aria-label="View package details"
					>
						<ExternalLink className="h-4 w-4" />
					</Button>
				</div>
				<CardDescription className="line-clamp-2">
					Get detailed analytics and insights about {pkg}. View download trends,
					security analysis, and more.
				</CardDescription>
			</CardContent>
		</Card>
	);
}

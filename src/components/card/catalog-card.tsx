import {
	BarChart,
	Download,
	FileCode,
	GitCompare,
	Package,
	Search,
	Shield,
	Zap,
} from "lucide-react";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";

const iconMap = {
	package: Package,
	search: Search,
	shield: Shield,
	zap: Zap,
	chart: BarChart,
	compare: GitCompare,
	download: Download,
	code: FileCode,
} as const;

export function CatalogCard({ item }: { item: any }) {
	const Icon = iconMap[item.icon as keyof typeof iconMap] || Package;

	return (
		<Card className="group relative h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
			{/* Gradient Hover Effect */}
			<div
				aria-hidden="true"
				className="absolute inset-0 -translate-y-full rounded-[inherit] bg-gradient-to-b from-primary/25 to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
			/>

			<CardContent className="p-6">
				{/* Icon */}
				<div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
					<Icon className="h-6 w-6 text-primary" />
				</div>

				{/* Content */}
				<CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
					{item.name}
				</CardTitle>
				<p className="text-muted-foreground text-sm line-clamp-2">
					{item.description}
				</p>

				{/* Packages */}
				{item.packages && item.packages.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{item.packages.slice(0, 3).map((pkg: any) => (
							<span
								key={pkg}
								className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
							>
								{pkg}
							</span>
						))}
						{item.packages.length > 3 && (
							<span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
								+{item.packages.length - 3} more
							</span>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

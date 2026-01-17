"use client";

import { FileCode2, Package2, Timer, Zap } from "lucide-react";
import { formatSize } from "@/lib/format-size";
import { formatTime } from "@/lib/format-time";
import { getTimeFromSize } from "@/lib/get-time-from-size";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { TreemapSection } from "./treemap";

interface BundleData {
	size: number;
	gzip: number;
	dependencyCount?: number;
	dependencySizes?: Record<string, number>;
}

interface BundleCheckProps {
	data: BundleData | null;
}

export const BundleCheck = ({ data }: BundleCheckProps) => {
	if (!data) return null;

	const minifiedSize = formatSize(data?.size);
	const gzippedSize = formatSize(data?.gzip);
	const threeGTime = formatTime(getTimeFromSize(data?.gzip)?.threeG);
	const fourGTime = formatTime(getTimeFromSize(data?.gzip)?.fourG);

	// Calculate percentage for progress bars (assuming 1MB as max for visualization)
	const maxSize = 1024 * 1024; // 1MB in bytes
	const minifiedProgress = (data?.size / maxSize) * 100;
	const gzippedProgress = (data?.gzip / maxSize) * 100;

	return (
		<div className="space-y-6">
			<div className="grid gap-6 md:grid-cols-2">
				{/* Bundle Size Card */}
				<Card className="shadow-none">
					<CardHeader>
						<div className="flex items-center gap-2">
							<FileCode2 className="h-5 w-5 text-primary" />
							<CardTitle>Bundle Size</CardTitle>
						</div>
						<CardDescription>
							Minified and gzipped sizes of the package
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<div>
								<div className="mb-2 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Package2 className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Minified</span>
									</div>
									<span className="text-2xl font-bold">
										{parseFloat(minifiedSize?.size.toFixed(1))}
										<span className="text-muted-foreground ml-1 text-lg">
											{minifiedSize?.unit}
										</span>
									</span>
								</div>
								<Progress value={minifiedProgress} className="h-2" />
							</div>
							<div>
								<div className="mb-2 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Zap className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">
											Minified + Gzipped
										</span>
									</div>
									<span className="text-2xl font-bold">
										{parseFloat(gzippedSize?.size.toFixed(1))}
										<span className="text-muted-foreground ml-1 text-lg">
											{gzippedSize?.unit}
										</span>
									</span>
								</div>
								<Progress value={gzippedProgress} className="h-2" />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Download Time Card */}
				<Card className="shadow-none">
					<CardHeader>
						<div className="flex items-center gap-2">
							<Timer className="h-5 w-5 text-primary" />
							<CardTitle>Download Time</CardTitle>
						</div>
						<CardDescription>
							Estimated download times on different network conditions
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4">
							<div className="flex items-center justify-between rounded-lg border p-4">
								<div className="space-y-1">
									<p className="text-sm font-medium">Slow 3G</p>
									<p className="text-xs text-muted-foreground">
										(~400 Kbps download)
									</p>
								</div>
								<div className="text-right">
									<p className="text-2xl font-bold">
										{parseFloat(threeGTime?.size.toFixed(2))}
										<span className="text-muted-foreground ml-1 text-lg">
											{threeGTime?.unit}
										</span>
									</p>
								</div>
							</div>
							<div className="flex items-center justify-between rounded-lg border p-4">
								<div className="space-y-1">
									<p className="text-sm font-medium">Emerging 4G</p>
									<p className="text-xs text-muted-foreground">
										(~4 Mbps download)
									</p>
								</div>
								<div className="text-right">
									<p className="text-2xl font-bold">
										{parseFloat(fourGTime?.size.toFixed(2))}
										<span className="text-muted-foreground ml-1 text-lg">
											{fourGTime?.unit}
										</span>
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Treemap Section */}
			<Card className="shadow-none">
				<CardHeader>
					<CardTitle>Dependencies Breakdown</CardTitle>
					<CardDescription>
						Visual representation of package dependencies and their sizes
					</CardDescription>
				</CardHeader>
				<CardContent>
					<TreemapSection data={data} />
				</CardContent>
			</Card>
		</div>
	);
};

"use client";

import { format } from "date-fns";
import { Calendar, Clock, History, Tag } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/ui/table";

interface VersionTags {
	[key: string]: string;
}

interface VersionDates {
	modified?: string;
	created?: string;
	[key: string]: string | undefined;
}

interface VersionProps {
	versions: VersionDates | undefined;
	tags: VersionTags | undefined;
}

const formatDate = (date: string | undefined, formatStr: string) => {
	if (!date) return "Unknown";
	return format(new Date(date), formatStr);
};

export const Version = ({ versions, tags }: VersionProps) => {
	const safeVersions = versions || {};
	const safeTags = tags || {};

	const sortedVersions = Object.entries(safeVersions)
		.filter(([key]) => !["modified", "created"].includes(key))
		.sort(([, a], [, b]) => {
			if (!a || !b) return 0;
			return new Date(b).getTime() - new Date(a).getTime();
		});

	const latestVersion = safeTags?.latest;
	const latestDate = safeVersions[latestVersion];

	return (
		<div className="space-y-6">
			{/* Latest Version Card */}
			<Card className="shadow-none">
				<CardHeader>
					<div className="flex items-center gap-2">
						<Tag className="h-5 w-5 text-primary" />
						<CardTitle>Latest Release</CardTitle>
					</div>
					<CardDescription>Most recent stable version</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
						<div className="flex items-center gap-2">
							<History className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Version</span>
							<Badge variant="default" className="text-lg">
								{latestVersion}
							</Badge>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Released</span>
							<span className="font-medium">
								{formatDate(latestDate, "MMMM d, yyyy")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Time</span>
							<span className="font-medium">
								{formatDate(latestDate, "h:mm a")}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Distribution Tags */}
			<Card className="shadow-none">
				<CardHeader>
					<div className="flex items-center gap-2">
						<Tag className="h-5 w-5 text-primary" />
						<CardTitle>Distribution Tags</CardTitle>
					</div>
					<CardDescription>
						NPM distribution tags for different versions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tag</TableHead>
								<TableHead>Version</TableHead>
								<TableHead>Published</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Object.entries(safeTags).map(([key, value]) => (
								<TableRow key={key}>
									<TableCell>
										<Badge
											variant={key === "latest" ? "default" : "secondary"}
											className="font-medium"
										>
											{key}
										</Badge>
									</TableCell>
									<TableCell className="font-medium">{value}</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(safeVersions[value], "PPP 'at' p")}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Version History */}
			<Card className="shadow-none">
				<CardHeader>
					<div className="flex items-center gap-2">
						<History className="h-5 w-5 text-primary" />
						<CardTitle>Version History</CardTitle>
					</div>
					<CardDescription>
						Complete release history of the package
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px] pr-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Version</TableHead>
									<TableHead>Published</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedVersions.map(([version, date]) => (
									<TableRow key={version}>
										<TableCell>
											<div className="flex items-center gap-2">
												<span className="font-medium">{version}</span>
												{version === latestVersion && (
													<Badge variant="default" className="text-xs">
														latest
													</Badge>
												)}
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{formatDate(date, "PPP 'at' p")}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
};

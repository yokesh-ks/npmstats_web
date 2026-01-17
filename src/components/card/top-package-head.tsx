"use client";

import { formatDistanceToNow } from "date-fns";
import {
	ArrowUpRight,
	ChartLine,
	Clock,
	Download,
	FileCode,
	FileCode2,
	History,
	Info,
	Package,
	Package2,
	Shield,
	Star,
	Terminal,
	Users,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { TabsList, TabsTrigger } from "@/src/components/ui/tabs";

interface PackageData {
	_id: string;
	description: string;
	"dist-tags": {
		latest: string;
		[key: string]: string;
	};
	homepage?: string;
	repository?: {
		url?: string;
	};
	time?: {
		modified?: string;
		created?: string;
	};
	maintainers?: Array<{ name: string }>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	license?: string;
	version?: string;
}

interface PackageStatsCardProps {
	data: PackageData;
}

export function TopPackageHead({ data }: PackageStatsCardProps) {
	const lastPublished = new Date(
		data.time?.modified || data.time?.created || Date.now(),
	);
	const weeklyDownloads = 1000000; // This should come from your API
	const monthlyDownloads = 4000000; // This should come from your API
	const stars = 5000; // This should come from your API
	const forks = 500; // This should come from your API
	const dependencyCount = Object.keys(data.dependencies || {}).length;
	const devDependencyCount = Object.keys(data.devDependencies || {}).length;

	return (
		<div className="flex flex-col gap-4 space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<h1 className="text-2xl font-bold md:text-3xl">{data._id}</h1>
						<Badge variant="secondary" className="h-6">
							v{data["dist-tags"]?.latest}
						</Badge>
						{data.license && (
							<Badge
								variant="outline"
								className="h-6 border-primary/20 text-primary"
							>
								{data.license}
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground max-w-2xl">
						{data.description}
					</p>
					<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
						<div className="flex items-center gap-1.5">
							<Package className="h-4 w-4" />
							<span>Version {data["dist-tags"]?.latest}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Clock className="h-4 w-4" />
							<span>Updated {formatDistanceToNow(lastPublished)} ago</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Users className="h-4 w-4" />
							<span>{data.maintainers?.length || 0} maintainers</span>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<Button asChild variant="outline" size="sm" className="gap-1.5">
						<a
							href={`https://npmjs.com/package/${data._id}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Terminal className="h-4 w-4" />
							npm install
						</a>
					</Button>
					{data.homepage && (
						<Button asChild variant="outline" size="sm" className="gap-1.5">
							<a href={data.homepage} target="_blank" rel="noopener noreferrer">
								Homepage
								<ArrowUpRight className="h-3.5 w-3.5" />
							</a>
						</Button>
					)}
					{data.repository?.url && (
						<Button asChild variant="outline" size="sm" className="gap-1.5">
							<a
								href={data.repository.url
									.replace("git+", "")
									.replace(".git", "")}
								target="_blank"
								rel="noopener noreferrer"
							>
								Repository
								<ArrowUpRight className="h-3.5 w-3.5" />
							</a>
						</Button>
					)}
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				<div className="rounded-lg border bg-accent/50 p-4 hover:bg-accent transition-colors">
					<div className="flex items-center gap-2">
						<Download className="h-4 w-4 text-muted-foreground" />
						<span className="text-xs font-medium">Weekly Downloads</span>
					</div>
					<p className="mt-2 text-2xl font-bold">
						{formatNumber(weeklyDownloads)}
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{formatNumber(monthlyDownloads)} monthly
					</p>
				</div>
				<div className="rounded-lg border bg-accent/50 p-4 hover:bg-accent transition-colors">
					<div className="flex items-center gap-2">
						<Star className="h-4 w-4 text-muted-foreground" />
						<span className="text-xs font-medium">GitHub Stars</span>
					</div>
					<p className="mt-2 text-2xl font-bold">{formatNumber(stars)}</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{formatNumber(forks)} forks
					</p>
				</div>
				<div className="rounded-lg border bg-accent/50 p-4 hover:bg-accent transition-colors">
					<div className="flex items-center gap-2">
						<FileCode className="h-4 w-4 text-muted-foreground" />
						<span className="text-xs font-medium">Dependencies</span>
					</div>
					<p className="mt-2 text-2xl font-bold">{dependencyCount}</p>
					<p className="mt-1 text-xs text-muted-foreground">
						{devDependencyCount} dev dependencies
					</p>
				</div>
				<div className="rounded-lg border bg-accent/50 p-4 hover:bg-accent transition-colors">
					<div className="flex items-center gap-2">
						<Shield className="h-4 w-4 text-muted-foreground" />
						<span className="text-xs font-medium">Security Score</span>
					</div>
					<p className="mt-2 text-2xl font-bold">A+</p>
					<p className="mt-1 text-xs text-green-500">No vulnerabilities</p>
				</div>
			</div>

			{/* Navigation Tabs */}
			<TabsList className="scrollbar-hide flex w-full items-start justify-start gap-4 overflow-scroll bg-transparent p-0">
				<TabsTrigger
					value="downloads"
					className="inline-flex items-center justify-center gap-1 flex-1 p-0 bg-secondary data-[state=active]:bg-primary data-[state=active]:text-super-primary p-2 cursor-pointer"
				>
					<ChartLine className="h-4 w-4" />
					Download Analytics
				</TabsTrigger>
				<TabsTrigger
					value="bundle"
					className="inline-flex items-center justify-center gap-1 flex-1 p-0  bg-secondary data-[state=active]:bg-primary data-[state=active]:text-super-primary p-2 cursor-pointer"
				>
					<FileCode2 className="h-4 w-4" />
					Bundle Check
				</TabsTrigger>
				<TabsTrigger
					value="similar"
					className="inline-flex items-center justify-center gap-1 flex-1 p-0 bg-secondary data-[state=active]:bg-primary data-[state=active]:text-super-primary p-2 cursor-pointer"
				>
					<Package2 className="h-4 w-4" />
					Similar Packages
				</TabsTrigger>
				<TabsTrigger
					value="versions"
					className="inline-flex items-center justify-center gap-1 flex-1 p-0 bg-secondary data-[state=active]:bg-primary data-[state=active]:text-super-primary p-2 cursor-pointer"
				>
					<History className="h-4 w-4" />
					Version History
				</TabsTrigger>
				<TabsTrigger
					value="about"
					className="inline-flex items-center justify-center gap-1 flex-1 p-0 bg-secondary data-[state=active]:bg-primary data-[state=active]:text-super-primary p-2 cursor-pointer"
				>
					<Info className="h-4 w-4" />
					About
				</TabsTrigger>
			</TabsList>
		</div>
	);
}

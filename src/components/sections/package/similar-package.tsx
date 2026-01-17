"use client";

import { Calendar, Download, FileCode, Star } from "lucide-react";
import millify from "millify";
import Link from "next/link";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatSize } from "@/lib/format-size";
import "react-circular-progressbar/dist/styles.css";

interface PackageScore {
	final: number;
	detail: {
		quality: number;
		popularity: number;
		maintenance: number;
	};
}

interface PackageStat {
	label: string;
	value: number;
}

interface SimilarPackageData {
	name: string;
	version: string;
	description: string;
	score: PackageScore;
	stats: PackageStat[];
}

interface SimilarPackageProps {
	data: SimilarPackageData[] | null;
}

export const SimilarPackage = ({ data }: SimilarPackageProps) => {
	if (!data) return null;

	return (
		<div className="flex flex-col gap-4">
			{data?.map((item) => (
				<Link href={`/package/${item.name}`} key={item.name}>
					<Card className="group relative overflow-hidden transition-all hover:shadow-md shadow-none">
						<div className="flex flex-col gap-4 p-6 md:flex-row md:items-start">
							{/* Package Icon */}
							<div className="shrink-0">
								<div className="size-[100px] rounded-lg bg-[#CC0100] p-4 transition-transform group-hover:scale-105">
									<div className="flex size-full items-center justify-center rounded-md bg-white">
										<Icon name="npm" />
									</div>
								</div>
							</div>

							{/* Package Info */}
							<div className="flex-1 space-y-4">
								<CardHeader className="p-0">
									<div className="flex items-start justify-between gap-4">
										<div className="space-y-2">
											<div className="flex items-center gap-2">
												<CardTitle className="text-xl">{item.name}</CardTitle>
												<Badge variant="secondary">v{item.version}</Badge>
											</div>
											<CardDescription className="text-sm">
												{item.description}
											</CardDescription>
										</div>
									</div>
								</CardHeader>

								{/* Stats Grid */}
								<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
									{item.stats.map((stat) => (
										<StatCard key={stat.label} stat={stat} />
									))}
								</div>
							</div>

							{/* Scores */}
							<div className="flex gap-2">
								<ScoreCircle
									value={item?.score?.detail?.quality}
									label="Q"
									color="#0969DA"
								/>
								<ScoreCircle
									value={item?.score?.detail?.popularity}
									label="P"
									color="#1A7F37"
								/>
								<ScoreCircle
									value={item?.score?.detail?.maintenance}
									label="M"
									color="#9B4DCA"
								/>
								<div className="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-600 ring-1 ring-emerald-600/20">
									{(item?.score?.final * 100).toFixed(0)}
								</div>
							</div>
						</div>
					</Card>
				</Link>
			))}
		</div>
	);
};

interface StatCardProps {
	stat: PackageStat;
}

const StatCard = ({ stat }: StatCardProps) => {
	const getIcon = (label: string) => {
		switch (label) {
			case "Weekly Downloads":
				return <Download className="h-4 w-4" />;
			case "GitHub Stars":
				return <Star className="h-4 w-4" />;
			case "Bundle Size":
				return <FileCode className="h-4 w-4" />;
			case "Last Release":
				return <Calendar className="h-4 w-4" />;
			default:
				return null;
		}
	};

	return (
		<div className="space-y-1">
			<div className="flex items-center gap-1.5 text-muted-foreground">
				{getIcon(stat.label)}
				<span className="text-xs font-medium">{stat.label}</span>
			</div>
			<p className="text-sm font-semibold">
				{stat.label === "Bundle Size"
					? `${parseFloat(formatSize(stat.value).size.toFixed(1))}${
							formatSize(stat.value).unit
						}`
					: millify(stat.value)}
			</p>
		</div>
	);
};

interface ScoreCircleProps {
	value: number;
	label: string;
	color: string;
}

const ScoreCircle = ({ value, label, color }: ScoreCircleProps) => (
	<div className="size-9">
		<CircularProgressbar
			value={value * 100}
			text={label}
			styles={buildStyles({
				textSize: "32px",
				pathColor: color,
				textColor: color,
				trailColor: `${color}20`,
			})}
		/>
	</div>
);

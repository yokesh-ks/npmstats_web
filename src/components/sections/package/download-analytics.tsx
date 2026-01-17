"use client";

import dayjs, { type Dayjs } from "dayjs";
import ReactECharts from "echarts-for-react";
import { ArrowRight, ChartLine, TrendingDown, TrendingUp } from "lucide-react";
import millify from "millify";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import API from "@/services/API";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

interface DownloadData {
	day: string;
	downloads: number;
}

interface Period {
	key: string;
	label: string;
	days?: number;
}

export const djsToStartDate = (djs: Dayjs) =>
	djs.startOf("week").format("YYYY-MM-DD");

const periods: Period[] = [
	{ key: "7D", label: "7 days", days: 7 },
	{ key: "28D", label: "28 days", days: 28 },
	{ key: "3M", label: "3 months", days: 90 },
	{ key: "6M", label: "6 months", days: 180 },
	{ key: "1Y", label: "1 year", days: 365 },
	{ key: "Max", label: "All Time" },
];

export const DownloadLytics = () => {
	const [activePeriod, setActivePeriod] = useState("7D");
	const [downloadData, setDownloadData] = useState<DownloadData[]>([]);
	const pathName = usePathname() || "";
	const packageName = pathName.replace("/package", "");

	useEffect(() => {
		(async () => {
			let period;
			const endDate = dayjs().format("YYYY-MM-DD");
			if (activePeriod === "7D") {
				period = "last-week";
			} else if (activePeriod === "28D") {
				period = "last-month";
			} else if (activePeriod === "3M") {
				const startDate = djsToStartDate(dayjs().subtract(3, "month"));
				period = `${startDate}:${endDate}`;
			} else if (activePeriod === "6M") {
				const startDate = djsToStartDate(dayjs().subtract(6, "month"));
				period = `${startDate}:${endDate}`;
			} else if (activePeriod === "1Y") {
				const startDate = djsToStartDate(dayjs().subtract(1, "year"));
				period = `${startDate}:${endDate}`;
			} else if (activePeriod === "Max") {
				const startDate = djsToStartDate(dayjs("2015-01-10"));
				period = `${startDate}:${endDate}`;
			}
			const response = await API.getDownloadData(period!, packageName);
			setDownloadData(response?.downloads || []);
		})();
	}, [activePeriod, packageName]);

	const totalDownloads = downloadData.reduce(
		(acc, item) => acc + item.downloads,
		0,
	);
	const averageDownloads = Math.round(totalDownloads / downloadData.length);
	const lastDayDownloads =
		downloadData[downloadData.length - 1]?.downloads || 0;
	const previousDayDownloads =
		downloadData[downloadData.length - 2]?.downloads || 0;
	const downloadTrend =
		((lastDayDownloads - previousDayDownloads) / previousDayDownloads) * 100;

	const chartData = downloadData.map((item) => ({
		name: dayjs(item.day).format("MMM D"),
		value: item.downloads,
	}));

	const chartOptions = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis" as const,
			formatter: (params: { name: string; value: number }[]) => {
				const data = params[0];
				return `${data.name}<br/>${millify(data.value)} downloads`;
			},
		},
		grid: {
			left: "3%",
			right: "3%",
			bottom: "3%",
			top: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category" as const,
			boundaryGap: false,
			data: chartData.map((item) => item.name),
			axisLabel: {
				color: "#888",
				interval: Math.floor(chartData.length / 8),
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: {
			type: "value" as const,
			axisLabel: {
				color: "#888",
				formatter: (value: number) => millify(value),
			},
			splitLine: {
				lineStyle: {
					color: "rgba(140, 140, 140, 0.1)",
				},
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		series: [
			{
				name: "Downloads",
				type: "line" as const,
				smooth: true,
				showSymbol: false,
				symbolSize: 0,
				lineStyle: {
					width: 3,
					color: "#0091FF",
				},
				areaStyle: {
					color: "#0091FF",
					opacity: 0.1,
				},
				emphasis: {
					focus: "series",
				},
				data: chartData.map((item) => item.value),
			},
		],
	};

	return (
		<div className="space-y-6">
			{/* Header with Period Selection */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2">
					<div className="rounded-md bg-primary/10 p-2">
						<ChartLine className="h-5 w-5 text-primary" />
					</div>
					<h2 className="text-xl font-semibold">Download Analytics</h2>
				</div>
				<div className="flex flex-wrap gap-2">
					{periods.map((item) => (
						<Button
							size="sm"
							key={item.key}
							onClick={() => setActivePeriod(item.key)}
							variant={item.key === activePeriod ? "default" : "secondary"}
							className={cn(
								"h-8 min-w-[48px]",
								item.key === activePeriod && "bg-primary",
							)}
						>
							{item.key}
						</Button>
					))}
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card className="shadow-none">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Total Downloads
							</p>
							<ArrowRight className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className="mt-2 text-2xl font-bold">{millify(totalDownloads)}</p>
						<p className="mt-1 text-xs text-muted-foreground">
							in past {periods.find((p) => p.key === activePeriod)?.label}
						</p>
					</CardContent>
				</Card>

				<Card className="shadow-none">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Daily Average
							</p>
							<ArrowRight className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className="mt-2 text-2xl font-bold">
							{millify(averageDownloads)}
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							downloads per day
						</p>
					</CardContent>
				</Card>

				<Card className="shadow-none">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Latest Downloads
							</p>
							<ArrowRight className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className="mt-2 text-2xl font-bold">
							{millify(lastDayDownloads)}
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							on{" "}
							{dayjs(downloadData[downloadData.length - 1]?.day).format(
								"MMM D, YYYY",
							)}
						</p>
					</CardContent>
				</Card>

				<Card className="shadow-none">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								24h Trend
							</p>
							{downloadTrend > 0 ? (
								<TrendingUp className="h-4 w-4 text-green-500" />
							) : (
								<TrendingDown className="h-4 w-4 text-red-500" />
							)}
						</div>
						<p className="mt-2 text-2xl font-bold">
							{downloadTrend > 0 ? "+" : ""}
							{downloadTrend.toFixed(1)}%
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							compared to previous day
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Chart */}
			<Card className="shadow-none">
				<CardContent className="p-6">
					<ReactECharts
						option={chartOptions as any}
						style={{ height: "400px" }}
						notMerge={true}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

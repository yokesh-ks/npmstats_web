"use client";

import {
	Check,
	Download,
	Menu,
	Search,
	Share2,
	Shield,
	Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

export function HowItWorks() {
	return (
		<section id="how-it-works" className="bg-muted/50 py-20">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl animate__animated animate__fadeIn">
						How NpmStats Works
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground animate__animated animate__fadeIn">
						A simple 3-step process to get comprehensive insights for any npm
						package
					</p>
				</div>

				<div className="flex flex-col items-center">
					{/* Timeline Steps */}
					<div className="relative">
						{/* Step 1 */}
						<Step
							number={1}
							title="Search Your Package"
							description="Enter the name of any npm package you want to analyze in our powerful search bar. Whether it's a popular library like React or a niche utility, NpmStats has you covered."
							features={[
								"Fuzzy search functionality",
								"Auto-suggestions as you type",
								"Search by keywords and tags",
							]}
							isLeft={true}
							demo={
								<Card className="animate__animated animate__fadeInRight">
									<CardContent className="p-4">
										<div className="relative">
											<Input
												type="text"
												className="pl-12 pr-12"
												placeholder="Search for npm packages..."
												defaultValue="react"
											/>
											<Search className="absolute left-4 top-3.5 h-5 w-5 text-primary" />
											<Menu className="absolute right-4 top-3.5 h-5 w-5 text-secondary" />
										</div>
										<div className="mt-2 text-left divide-y divide-border">
											<SearchResult name="react" downloads="18.4M" />
											<SearchResult name="react-dom" downloads="17.9M" />
											<SearchResult name="react-router" downloads="8.2M" />
										</div>
									</CardContent>
								</Card>
							}
						/>

						{/* Step 2 */}
						<Step
							number={2}
							title="Our Engines Analyze"
							description="Once you select a package, our powerful analytics engine goes to work. We gather comprehensive data from npm registries, GitHub, and other sources to compile a complete picture."
							features={[
								"In-depth data processing",
								"Real-time calculations",
								"Multi-source verification",
							]}
							isLeft={true}
							demo={
								<Card className="overflow-hidden animate__animated animate__fadeInLeft">
									<CardHeader className="bg-primary text-primary-foreground flex flex-row justify-between items-center p-4">
										<span className="font-bold">NpmStats Analysis</span>
										<Badge variant="secondary">Processing</Badge>
									</CardHeader>
									<CardContent className="p-4">
										<div className="flex justify-between items-center mb-4">
											<div>
												<h4 className="font-bold">react</h4>
												<div className="text-xs text-muted-foreground">
													v18.2.0
												</div>
											</div>
											<div className="animate-pulse">
												<div className="w-8 h-8 bg-secondary opacity-80 rounded-full flex items-center justify-center">
													<Zap className="h-5 w-5 text-primary" />
												</div>
											</div>
										</div>

										<ProgressBar
											label="Analyzing download trends"
											progress={80}
											isAnimated={true}
										/>
										<ProgressBar
											label="Bundle size calculation"
											progress={100}
											isAnimated={false}
										/>
										<ProgressBar
											label="Security scan"
											progress={75}
											isAnimated={true}
										/>
										<ProgressBar
											label="Finding similar packages"
											progress={50}
											isAnimated={true}
										/>
									</CardContent>
								</Card>
							}
						/>

						{/* Step 3 */}
						<Step
							number={3}
							title="View Comprehensive Results"
							description="Access a detailed dashboard with all the information you need to make informed decisions about the npm packages you use. Save, export, and share your results with your team."
							features={[
								"Interactive data visualization",
								"Export to PDF, CSV, or JSON",
								"Team collaboration features",
							]}
							isLeft={true}
							demo={
								<Card className="overflow-hidden animate__animated animate__fadeInRight">
									<CardHeader className="bg-primary text-primary-foreground flex flex-row justify-between items-center p-3">
										<span className="font-bold">React Package Analysis</span>
										<div className="flex space-x-2">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												aria-label="Share analysis"
											>
												<Share2 className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												aria-label="Download report"
											>
												<Download className="h-4 w-4" />
											</Button>
										</div>
									</CardHeader>
									<CardContent className="p-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<MetricCard
												title="Download Trend"
												chart={<DownloadChart />}
												stats={
													<div className="mt-2 flex justify-between text-xs text-muted-foreground">
														<span>+7.2% growth</span>
														<span>18.4M weekly</span>
													</div>
												}
											/>
											<MetricCard
												title="Bundle Size"
												chart={<BundleSizeChart />}
												stats={
													<div className="mt-2 flex justify-center text-xs text-muted-foreground">
														<span>33% smaller than average UI library</span>
													</div>
												}
											/>
											<MetricCard
												title="Security"
												chart={
													<div className="flex items-center justify-center h-20">
														<div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
															<Shield className="h-10 w-10 text-green-700" />
														</div>
													</div>
												}
												stats={
													<div className="mt-2 flex justify-center text-xs text-muted-foreground">
														<span>No vulnerabilities detected</span>
													</div>
												}
											/>
											<MetricCard
												title="Alternatives"
												chart={<AlternativesChart />}
												stats={null}
											/>
										</div>
									</CardContent>
									<CardFooter className="bg-muted/50 justify-between">
										<span className="text-xs text-muted-foreground">
											Updated 2 minutes ago
										</span>
										<Button variant="secondary" size="sm">
											Full Report
										</Button>
									</CardFooter>
								</Card>
							}
						/>
					</div>
				</div>

				<div className="mt-16 text-center">
					<Button size="lg" variant="default">
						Ready to Get Started? Try It Now
					</Button>
				</div>
			</div>
		</section>
	);
}

function Step({
	number,
	title,
	description,
	features,
	isLeft,
	demo,
}: {
	number: number;
	title: string;
	description: string;
	features: string[];
	isLeft: boolean;
	demo: React.ReactNode;
}) {
	return (
		<div className="flex flex-col md:flex-row items-center md:items-start mb-16 md:mb-24">
			{/* Left side (for desktop) */}
			<div
				className={cn("hidden md:block md:w-1/2", {
					"md:pr-12 text-right": isLeft,
					"md:pl-12 text-left": !isLeft,
					"order-1": true,
				})}
			>
				{isLeft ? (
					<>
						<h3 className="text-2xl font-bold text-primary mb-4 animate__animated animate__fadeInLeft">
							{number}. {title}
						</h3>
						<p
							className="text-muted-foreground mb-4 animate__animated animate__fadeInLeft"
							style={{ animationDelay: "0.1s" }}
						>
							{description}
						</p>
						<div className="flex justify-end">
							<ul
								className="text-muted-foreground text-sm space-y-2 animate__animated animate__fadeInLeft"
								style={{ animationDelay: "0.2s" }}
							>
								{features.map((feature, index) => (
									<li key={index} className="flex items-center justify-end">
										<span>{feature}</span>
										<Check className="ml-2 h-4 w-4 text-primary" />
									</li>
								))}
							</ul>
						</div>
					</>
				) : (
					<>
						<h3 className="text-2xl font-bold text-primary mb-4 animate__animated animate__fadeInRight">
							{number}. {title}
						</h3>
						<p
							className="text-muted-foreground mb-4 animate__animated animate__fadeInRight"
							style={{ animationDelay: "0.1s" }}
						>
							{description}
						</p>
						<ul
							className="text-muted-foreground text-sm space-y-2 animate__animated animate__fadeInRight"
							style={{ animationDelay: "0.2s" }}
						>
							{features.map((feature, index) => (
								<li key={index} className="flex items-center">
									<Check className="mr-2 h-4 w-4 text-primary" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</>
				)}
			</div>

			{/* Center (for mobile and desktop) */}
			<div className="w-20 md:w-auto flex flex-col items-center order-1 md:order-2">
				<div
					className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg animate__animated animate__zoomIn"
					style={{ animationDelay: `${(number - 1) * 0.4}s` }}
				>
					{number}
				</div>
				{number < 3 && (
					<div className="h-24 md:h-full w-1 bg-primary/20 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-16 md:bottom-0" />
				)}
			</div>

			{/* Right side (for desktop) */}
			<div
				className={cn("md:w-1/2", {
					"md:pl-12": isLeft,
					"md:pr-12": !isLeft,
					"order-2": true,
				})}
			>
				{demo}
			</div>

			{/* Mobile version */}
			<div className="md:hidden w-full mb-8">
				<h3 className="text-2xl font-bold text-primary mb-4 text-center">
					{number}. {title}
				</h3>
				<p className="text-muted-foreground mb-4 text-center">{description}</p>
				<ul className="text-muted-foreground text-sm space-y-2 mb-8">
					{features.map((feature, index) => (
						<li key={index} className="flex items-center justify-center">
							<Check className="mr-2 h-4 w-4 text-primary" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
				{demo}
			</div>
		</div>
	);
}

function SearchResult({
	name,
	downloads,
}: {
	name: string;
	downloads: string;
}) {
	return (
		<div className="flex items-center justify-between p-2 hover:bg-muted/50">
			<span className="font-medium">{name}</span>
			<span className="text-sm text-muted-foreground">{downloads} weekly</span>
		</div>
	);
}

function ProgressBar({
	label,
	progress,
	isAnimated,
}: {
	label: string;
	progress: number;
	isAnimated: boolean;
}) {
	return (
		<div className="space-y-1 mb-3">
			<div className="w-full bg-gray-200 rounded-full h-1.5">
				<div
					className={cn("bg-primary h-1.5 rounded-full", {
						"animate-pulse": isAnimated,
					})}
					style={{ width: `${progress}%` }}
				/>
			</div>
			<div className="flex justify-between items-center text-xs">
				<span className="text-muted-foreground">{label}</span>
				<span className="text-muted-foreground">
					{progress === 100 ? "Complete" : `${progress}%`}
				</span>
			</div>
		</div>
	);
}

function MetricCard({
	title,
	chart,
	stats,
}: {
	title: string;
	chart: React.ReactNode;
	stats: React.ReactNode | null;
}) {
	return (
		<Card className="bg-card">
			<CardHeader className="pb-2">
				<h4 className="text-sm font-medium">{title}</h4>
			</CardHeader>
			<CardContent>
				{chart}
				{stats}
			</CardContent>
		</Card>
	);
}

function DownloadChart() {
	return (
		<div className="h-20 flex items-end space-x-1">
			{[...Array(12)].map((_, i) => (
				<div
					key={i}
					className="bg-primary/20 hover:bg-primary/30 transition-colors w-full"
					style={{ height: `${40 + Math.random() * 60}%` }}
				/>
			))}
		</div>
	);
}

function BundleSizeChart() {
	return (
		<div className="h-20 flex items-center justify-center">
			<div className="w-20 h-20 rounded-full border-8 border-primary/20 relative">
				<div
					className="absolute inset-0 rounded-full border-8 border-primary"
					style={{
						clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
					}}
				/>
			</div>
		</div>
	);
}

function AlternativesChart() {
	return (
		<div className="h-20 flex items-end justify-between space-x-2">
			<div className="flex-1">
				<div className="bg-primary h-16" />
				<div className="text-xs text-center mt-1 text-muted-foreground">
					React
				</div>
			</div>
			<div className="flex-1">
				<div className="bg-primary/60 h-12" />
				<div className="text-xs text-center mt-1 text-muted-foreground">
					Preact
				</div>
			</div>
			<div className="flex-1">
				<div className="bg-primary/40 h-8" />
				<div className="text-xs text-center mt-1 text-muted-foreground">
					Solid
				</div>
			</div>
		</div>
	);
}

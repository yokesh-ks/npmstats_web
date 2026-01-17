"use client";

import {
	BarChart,
	Bell,
	Clock,
	Search,
	Settings,
	Shield,
	TrendingUp,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

export function Demo() {
	return (
		<section id="demo" className="bg-background py-20">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl animate__animated animate__fadeIn">
						See NpmStats in Action
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground animate__animated animate__fadeIn">
						Explore our interactive demo and discover how NpmStats can transform
						your npm package decision-making
					</p>
				</div>

				<div className="flex flex-col items-center gap-12 lg:flex-row">
					<div className="lg:w-1/2 animate__animated animate__fadeInLeft">
						{/* Interactive Dashboard Demo */}
						<Card className="overflow-hidden">
							{/* Dashboard Header */}
							<CardHeader className="flex flex-row items-center justify-between bg-primary p-4 text-primary-foreground py-2">
								<div className="flex items-center">
									<span className="font-bold text-secondary">NpmStats</span>
									<Badge variant="secondary" className="ml-2">
										Dashboard
									</Badge>
								</div>
								<div className="flex space-x-2">
									<Button
										variant="ghost"
										size="icon"
										className="hover:bg-primary-foreground/10"
										aria-label="Settings"
									>
										<Settings className="h-5 w-5" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="hover:bg-primary-foreground/10"
										aria-label="Notifications"
									>
										<Bell className="h-5 w-5" />
									</Button>
								</div>
							</CardHeader>

							{/* Search Bar */}
							<div className="border-b bg-muted/50 p-4">
								<div className="flex items-center">
									<div className="relative flex-grow">
										<Input
											type="text"
											defaultValue="react"
											className="pl-10"
											placeholder="Search npm packages..."
										/>
										<Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
									</div>
									<Button className="ml-2">Analyze</Button>
								</div>
							</div>

							{/* Main Dashboard Content */}
							<CardContent className="p-5">
								{/* Package Header */}
								<div className="mb-6 flex items-center justify-between">
									<div>
										<h3 className="text-2xl font-bold">react</h3>
										<p className="text-sm text-muted-foreground">
											v18.2.0 • Published 10 months ago
										</p>
									</div>
									<div className="flex space-x-2">
										<Badge
											variant="secondary"
											className="bg-green-100 text-green-800"
										>
											Popular
										</Badge>
										<Badge variant="secondary">Stable</Badge>
									</div>
								</div>

								{/* Stats Overview */}
								<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
									<Card className="bg-muted/50">
										<CardContent className="p-4">
											<p className="mb-1 text-xs text-muted-foreground">
												Weekly Downloads
											</p>
											<p className="text-xl font-bold">18.4M</p>
											<p className="mt-1 text-xs text-green-700">↑ 7.2%</p>
										</CardContent>
									</Card>
									<Card className="bg-muted/50">
										<CardContent className="p-4">
											<p className="mb-1 text-xs text-muted-foreground">
												Bundle Size
											</p>
											<p className="text-xl font-bold">42.7 kB</p>
											<p className="mt-1 text-xs text-muted-foreground">
												gzipped
											</p>
										</CardContent>
									</Card>
									<Card className="bg-muted/50">
										<CardContent className="p-4">
											<p className="mb-1 text-xs text-muted-foreground">
												Dependencies
											</p>
											<p className="text-xl font-bold">3</p>
											<p className="mt-1 text-xs text-green-700">
												All up to date
											</p>
										</CardContent>
									</Card>
									<Card className="bg-muted/50">
										<CardContent className="p-4">
											<p className="mb-1 text-xs text-muted-foreground">
												Health Score
											</p>
											<p className="text-xl font-bold">98/100</p>
											<p className="mt-1 text-xs text-green-700">Excellent</p>
										</CardContent>
									</Card>
								</div>

								{/* Similar Packages */}
								<div>
									<h4 className="mb-3 text-sm font-medium">Similar Packages</h4>
									<Card>
										<div className="grid grid-cols-3 bg-muted/50 p-3 text-xs font-medium text-muted-foreground">
											<div>Package</div>
											<div>Weekly Downloads</div>
											<div>Size</div>
										</div>
										<div className="divide-y divide-border">
											<div className="grid grid-cols-3 items-center p-3 hover:bg-muted/50">
												<div className="font-medium">preact</div>
												<div>2.9M</div>
												<div>10.4 kB</div>
											</div>
											<div className="grid grid-cols-3 items-center p-3 hover:bg-muted/50">
												<div className="font-medium">inferno</div>
												<div>398K</div>
												<div>9.2 kB</div>
											</div>
											<div className="grid grid-cols-3 items-center p-3 hover:bg-muted/50">
												<div className="font-medium">solid-js</div>
												<div>345K</div>
												<div>7.8 kB</div>
											</div>
										</div>
									</Card>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="lg:w-1/2 animate__animated animate__fadeInRight">
						<h3 className="mb-4 text-2xl font-bold text-primary">
							Why Our Dashboard Matters
						</h3>

						<div className="space-y-6">
							<Feature
								icon={BarChart}
								title="Real-time Analytics"
								description="View up-to-date download statistics and growth trends to understand package popularity and community adoption."
							/>
							<Feature
								icon={Clock}
								title="Performance Insights"
								description="Evaluate bundle size and dependency impact to make informed decisions about your application's performance."
							/>
							<Feature
								icon={TrendingUp}
								title="Competitive Analysis"
								description="Compare similar packages side-by-side to identify the best fit for your specific project requirements."
							/>
							<Feature
								icon={Shield}
								title="Security Assessment"
								description="Automatically identify potential vulnerabilities and ensure your dependencies meet your security standards."
							/>
						</div>

						<div className="mt-8">
							<Button
								size="lg"
								variant="secondary"
								className="bg-super-primary text-primary hover:bg-super-primary/90"
							>
								Try the Dashboard
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Feature({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) {
	return (
		<div className="flex items-start space-x-4">
			<div className="rounded-lg bg-primary p-3">
				<Icon className="h-6 w-6 text-white" />
			</div>
			<div>
				<h4 className="mb-2 text-lg font-semibold">{title}</h4>
				<p className="text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}

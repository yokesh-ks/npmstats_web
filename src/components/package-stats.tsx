"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs";

export function PackageStats() {
	return (
		<div className="mt-8">
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="downloads">Downloads</TabsTrigger>
					<TabsTrigger value="size">Package Size</TabsTrigger>
					<TabsTrigger value="similar">Similar Packages</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Package Information</CardTitle>
							<CardDescription>
								Search for a package to view its details
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<div className="space-y-2">
									<h4 className="font-medium">Description</h4>
									<p className="text-sm text-muted-foreground">
										No package selected
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">Latest Version</h4>
									<p className="text-sm text-muted-foreground">-</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">License</h4>
									<p className="text-sm text-muted-foreground">-</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="downloads" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Download Statistics</CardTitle>
							<CardDescription>
								Weekly download trends and statistics
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[200px] w-full" />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="size" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Package Size Analysis</CardTitle>
							<CardDescription>Bundle size and dependencies</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[200px] w-full" />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="similar" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Similar Packages</CardTitle>
							<CardDescription>
								Packages with similar functionality
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<p className="text-sm text-muted-foreground">
									Search for a package to see similar alternatives
								</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

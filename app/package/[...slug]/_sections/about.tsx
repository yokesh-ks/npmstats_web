"use client";

import { ExternalLink, FileText, Github, Tag } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";

interface PackageData {
	name: string;
	readme?: string;
	keywords?: string[];
	repository?: {
		url?: string;
	};
	homepage?: string;
}

interface AboutProps {
	data: PackageData;
}

export const About = ({ data }: AboutProps) => {
	const githubUrl = data.repository?.url
		?.replace("git+", "")
		.replace(".git", "");

	return (
		<div className="space-y-6">
			{/* Links Section */}
			<Card className="shadow-none">
				<CardHeader>
					<div className="flex items-center gap-2">
						<ExternalLink className="h-5 w-5 text-primary" />
						<CardTitle>Links</CardTitle>
					</div>
					<CardDescription>
						External resources and documentation
					</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-3">
					{githubUrl && (
						<Button asChild variant="outline" size="sm" className="gap-2">
							<a href={githubUrl} target="_blank" rel="noopener noreferrer">
								<Github className="h-4 w-4" />
								GitHub Repository
							</a>
						</Button>
					)}
					{data.homepage && (
						<Button asChild variant="outline" size="sm" className="gap-2">
							<a href={data.homepage} target="_blank" rel="noopener noreferrer">
								<ExternalLink className="h-4 w-4" />
								Homepage
							</a>
						</Button>
					)}
				</CardContent>
			</Card>

			{/* Keywords Section */}
			{data.keywords && data.keywords.length > 0 && (
				<Card className="shadow-none">
					<CardHeader>
						<div className="flex items-center gap-2">
							<Tag className="h-5 w-5 text-primary" />
							<CardTitle>Keywords</CardTitle>
						</div>
						<CardDescription>
							Package categories and related terms
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{[...new Set(data.keywords)].map((keyword) => (
								<Badge
									key={keyword}
									variant="secondary"
									className="rounded-md px-2 py-1 text-sm"
								>
									{keyword}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* README Section */}
			{data.readme && (
				<Card>
					<CardHeader className="border-b">
						<div className="flex items-center gap-2">
							<FileText className="h-5 w-5 text-primary" />
							<CardTitle>README</CardTitle>
						</div>
						<CardDescription>
							Package documentation and usage instructions
						</CardDescription>
					</CardHeader>
					<ScrollArea className="h-[600px]">
						<CardContent className="markdown-body preview [data-theme=light] p-6">
							<Markdown remarkPlugins={[remarkGfm]}>{data.readme}</Markdown>
						</CardContent>
					</ScrollArea>
				</Card>
			)}
		</div>
	);
};

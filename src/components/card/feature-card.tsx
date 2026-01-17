"use client";

import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/src/components/ui/card";

interface FeatureCardProps {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	details: string[];
	delay?: string;
}

export function FeatureCard({
	title,
	description,
	icon: Icon,
	details,
	delay,
}: FeatureCardProps) {
	return (
		<Card
			className={cn(
				"animate-fadeInUp border-x-0 border-b-0 border-t-4 border-super-primary p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2",
				"bg-card text-card-foreground",
			)}
			style={{ animationDelay: delay }}
		>
			<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
				<Icon className="h-7 w-7 text-primary" />
			</div>
			<h3 className="mb-3 text-xl font-bold text-primary">{title}</h3>
			<p className="mb-4 text-muted-foreground">{description}</p>
			<ul className="space-y-2 text-sm text-muted-foreground">
				{details.map((detail, i) => (
					<li key={i} className="flex items-center">
						<CheckCircle className="mr-2 h-4 w-4 text-super-primary" />
						{detail}
					</li>
				))}
			</ul>
		</Card>
	);
}

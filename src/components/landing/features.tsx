"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { features } from "@/src/constants/features";
import { FeatureCard } from "../card/feature-card";

export function Features() {
	return (
		<section className="bg-muted/50 py-20">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
						Powerful Features for Package Analysis
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Discover everything you need to know about npm packages with our
						comprehensive feature set
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} />
					))}
				</div>

				<div className="mt-16 text-center">
					<Button
						variant="link"
						className="text-primary hover:text-primary/90"
						asChild
					>
						<a href="#" className="inline-flex items-center font-bold">
							See these features in action
							<ArrowRight className="ml-1 h-5 w-5" />
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}

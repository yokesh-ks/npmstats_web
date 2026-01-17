"use client";

import { Button } from "@/src/components/ui/button";
import { CodePreview } from "./code-preview";
import { CompanyLogos } from "./company-logos";

interface HeroMetric {
	value: string;
	label: string;
}

const metrics: HeroMetric[] = [
	{ value: "1M+", label: "Packages Analyzed" },
	{ value: "50K+", label: "Daily Users" },
	{ value: "100%", label: "Free Forever" },
];

function HeroMetrics() {
	return (
		<div className="mt-8 flex flex-wrap gap-8">
			{metrics.map((metric) => (
				<div key={metric.label} className="text-center">
					<div className="text-2xl font-bold text-super-primary">
						{metric.value}
					</div>
					<div className="text-sm text-white/70">{metric.label}</div>
				</div>
			))}
		</div>
	);
}

export function Hero() {
	return (
		<section className="relative min-h-[70vh] bg-gradient-primary pt-20 pb-32">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center justify-between md:flex-row">
					{/* Left Column */}
					<div className="mb-10 animate-fadeInLeft md:mb-0 md:w-1/2">
						<h1 className="mb-6 text-4xl font-bold leading-[1.2] md:text-5xl md:leading-[1.15] lg:text-6xl lg:leading-[1.1] text-white">
							Make Better Package Decisions with{" "}
							<span className="text-super-primary">NpmStats</span>
						</h1>
						<p className="mb-8 max-w-lg text-lg text-white/80 md:text-xl">
							Gain detailed insights into your package&apos;s download metrics,
							analyze size and exports, discover similar packages, and optimize
							your development workflow with precise, actionable data.
						</p>
						<div className="flex flex-col gap-4 sm:flex-row">
							<Button
								size="lg"
								variant="secondary"
								className="bg-super-primary text-primary hover:bg-super-primary/90"
							>
								Analyze Your Package
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="bg-transparent text-super-primary border-super-primary hover:bg-super-primary/10"
							>
								Explore Features
							</Button>
						</div>
						<HeroMetrics />
					</div>

					{/* Right Column */}
					<div className="animate-fadeInRight flex w-full flex-col items-center md:w-1/2">
						<div className="w-full md:w-[480px]">
							<CodePreview />
							<CompanyLogos />
						</div>
					</div>
				</div>

				{/* Wave divider */}
				<WaveDivider />
			</div>
		</section>
	);
}

function WaveDivider() {
	return (
		<div className="absolute bottom-0 left-0 w-full overflow-hidden">
			<svg
				preserveAspectRatio="none"
				width="100%"
				height="70"
				viewBox="0 0 1440 74"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0 50L48 44C96 38 192 26 288 32C384 38 480 62 576 68C672 74 768 62 864 56C960 50 1056 50 1152 53C1248 56 1344 62 1392 65L1440 68V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V50Z"
					fill="hsl(var(--background))"
				/>
			</svg>
		</div>
	);
}

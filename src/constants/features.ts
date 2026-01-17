import {
	BarChart3,
	GitCompare,
	PackageSearch,
	Scale,
	Search,
	Zap,
} from "lucide-react";

interface Feature {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	details: string[];
	delay?: string;
}

export const features: Feature[] = [
	{
		title: "Download Statistics",
		description:
			"Track daily, weekly, and monthly download trends with interactive charts and historical data comparison.",
		icon: BarChart3,
		details: [
			"Historical growth patterns",
			"Comparative analysis",
			"Usage prediction algorithms",
		],
	},
	{
		title: "Size Analysis",
		description:
			"Analyze package size impact on your applications with bundle size metrics and optimization recommendations.",
		icon: Scale,
		details: [
			"Minified and gzipped metrics",
			"Tree-shaking evaluation",
			"Import cost calculations",
		],
		delay: "0.2s",
	},
	{
		title: "Dependency Analysis",
		description:
			"Identify and analyze all dependencies with security vulnerability scanning and version monitoring.",
		icon: PackageSearch,
		details: [
			"Dependency tree visualization",
			"Security vulnerability alerts",
			"Outdated package detection",
		],
		delay: "0.4s",
	},
	{
		title: "Performance Metrics",
		description:
			"Evaluate package performance impact with load time analysis and runtime benchmarks across environments.",
		icon: Zap,
		details: [
			"Import performance analysis",
			"Runtime benchmarking",
			"CPU and memory profiling",
		],
		delay: "0.6s",
	},
	{
		title: "Similar Package Finder",
		description:
			"Discover and compare alternative packages with comprehensive feature comparisons and community insights.",
		icon: Search,
		details: [
			"Side-by-side comparisons",
			"Feature matrix evaluation",
			"Community sentiment analysis",
		],
		delay: "0.8s",
	},
	{
		title: "Package Comparison",
		description:
			"Compare multiple packages side by side to make informed decisions about your dependencies.",
		icon: GitCompare,
		details: [
			"CVE database integration",
			"Automated security alerts",
			"Remediation recommendations",
		],
		delay: "1s",
	},
];

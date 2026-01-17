"use client";

interface PackageAnalysis {
	name: string;
	version: string;
	weeklyDownloads: number;
	monthlyGrowth: string;
	bundleSize: {
		minified: string;
		gzipped: string;
	};
	dependencies: number;
	security: string;
	popularity: number;
}

const sampleAnalysis: PackageAnalysis = {
	name: "react",
	version: "18.2.0",
	weeklyDownloads: 18473251,
	monthlyGrowth: "+7.2%",
	bundleSize: {
		minified: "128.4kb",
		gzipped: "42.7kb",
	},
	dependencies: 3,
	security: "no issues found",
	popularity: 98,
};

export function CodePreview() {
	return (
		<div className="relative">
			<div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4 shadow-2xl">
				{/* Window Controls */}
				<div className="mb-4 flex items-center">
					<div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
					<div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
					<div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
					<div className="ml-2 rounded bg-neutral-800 px-3 py-1 text-xs text-neutral-400">
						npmstats analyze
					</div>
				</div>

				{/* Code Content */}
				<pre className="overflow-x-auto rounded bg-neutral-800 p-4 text-left text-sm text-neutral-100">
					<code className="language-json text-xs md:text-sm text-neutral-100">
						{`{`}
						<JsonProperty
							name="name"
							value={sampleAnalysis.name}
							type="string"
						/>
						<JsonProperty
							name="version"
							value={sampleAnalysis.version}
							type="string"
						/>
						<JsonProperty
							name="weeklyDownloads"
							value={sampleAnalysis.weeklyDownloads}
							type="number"
						/>
						<JsonProperty
							name="monthlyGrowth"
							value={sampleAnalysis.monthlyGrowth}
							type="string"
						/>
						<JsonProperty name="bundleSize" value={null}>
							{`{`}
							<JsonProperty
								name="minified"
								value={sampleAnalysis.bundleSize.minified}
								type="string"
								indent={2}
							/>
							<JsonProperty
								name="gzipped"
								value={sampleAnalysis.bundleSize.gzipped}
								type="string"
								indent={2}
								isLast
							/>
							{`  },`}
						</JsonProperty>
						<JsonProperty
							name="dependencies"
							value={sampleAnalysis.dependencies}
							type="number"
						/>
						<JsonProperty
							name="security"
							value={sampleAnalysis.security}
							type="string"
						/>
						<JsonProperty
							name="popularity"
							value={`${sampleAnalysis.popularity}/100`}
							type="string"
							isLast
						/>
						{`}`}
					</code>
				</pre>

				{/* Status Bar */}
				<div className="mt-4 flex justify-between text-xs text-neutral-400">
					<div>Analysis complete</div>
					<div className="flex items-center">
						<span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-400"></span>
						All checks passed
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-super-primary opacity-30 blur-xl"></div>
			<div className="absolute -top-5 -left-5 h-16 w-16 rounded-full bg-super-primary opacity-20 blur-lg"></div>
		</div>
	);
}

interface JsonPropertyProps {
	name: string;
	value?: string | number | null;
	type?: "string" | "number";
	indent?: number;
	isLast?: boolean;
	children?: React.ReactNode;
}

function JsonProperty({
	name,
	value,
	type = "string",
	indent = 1,
	isLast = false,
	children,
}: JsonPropertyProps) {
	const indentation = "  ".repeat(indent);
	const comma = isLast ? "" : ",";
	const valueColor = type === "string" ? "text-green-400" : "text-blue-400";

	return (
		<>
			{`\n${indentation}`}
			<span className="text-super-primary">&quot;{name}&quot;</span>
			{": "}
			{value !== null ? (
				<span className={valueColor}>
					{type === "string" ? `"${value}"` : value}
				</span>
			) : null}
			{children}
			{value !== null && comma}
		</>
	);
}

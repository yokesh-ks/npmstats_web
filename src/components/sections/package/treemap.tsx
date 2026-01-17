"use client";

import { useEffect, useRef, useState } from "react";

import { formatSize } from "@/lib/format-size";
import { Treemap, TreemapSquare } from "@/src/components/Treemap";
import { CardTitle } from "@/src/components/ui/card";

const colors = [
	"#718af0",
	"#6e98e6",
	"#79c0f2",
	"#7dd6fa",
	"#6ed0db",
	"#59b3aa",
	"#7ebf80",
	"#9bc26b",
	"#dee675",
	"#fff080",
	"#ffd966",
	"#ffbf66",
	"#ff8a66",
	"#ed7872",
	"#db6b8f",
	"#bd66cc",
	"#cae0eb",
];

export const TreemapSection = ({ data }: any) => {
	const packageName = data.name;
	const packageSize = data.size;
	const dependencySizes = data.dependencySizes;
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const treemapSectionRef = useRef(null);

	useEffect(() => {
		const { width } = (
			treemapSectionRef.current as any
		).getBoundingClientRect();
		let heightMultiplier = 1;

		if (dependencySizes.length < 5) {
			heightMultiplier = 0.5;
		} else if (dependencySizes.length <= 10) {
			heightMultiplier = 0.7;
		} else if (dependencySizes.length <= 15) {
			heightMultiplier = 1.1;
		}

		let height = 250 * heightMultiplier;

		if (window.innerWidth <= 640) {
			height = window.innerHeight * 0.65 * heightMultiplier;
		} else if (window.innerWidth <= 768) {
			height = window.innerHeight * 0.45 * heightMultiplier;
		}

		setDimensions({ width, height });
	}, [dependencySizes]);

	const getFormattedSize = (value: any) => {
		const { size, unit } = formatSize(value);
		return `${size.toFixed(2)} ${unit}`;
	};

	let dependenciesCopy = [...dependencySizes];
	dependenciesCopy.forEach((dep) => {
		if (dep.name === packageName) {
			dep.name = "(self)";
			dep.isSelf = true;
		}
	});

	const sizeSum = dependenciesCopy.reduce(
		(acc, dep) => acc + dep.approximateSize,
		0,
	);
	dependenciesCopy = dependenciesCopy
		.map((dep) => ({
			...dep,
			percentShare: (dep.approximateSize / sizeSum) * 100,
			sizeShare: (dep.approximateSize / sizeSum) * packageSize,
		}))
		.map((dep) => ({
			...dep,
			tooltip: `${dep.name} ｜ ${dep.percentShare.toFixed(1)}% ｜ ~ ${getFormattedSize(dep.sizeShare)}`,
		}));

	dependenciesCopy.sort((depA, depB) => depB.percentShare - depA.percentShare);

	let compactedDependencies: any = [];
	const compactLimit = window.innerWidth <= 768 ? 8 : 16;
	const ellipsizeLimit = window.innerWidth <= 768 ? 3.5 : 1.5;

	if (dependenciesCopy.length > compactLimit) {
		const otherDependencies = dependenciesCopy.slice(compactLimit);
		compactedDependencies = dependenciesCopy.slice(0, compactLimit);

		const approximateSize = otherDependencies.reduce(
			(acc, dep) => acc + dep.approximateSize,
			0,
		);
		const percentShare = otherDependencies.reduce(
			(acc, dep) => acc + dep.percentShare,
			0,
		);
		const sizeShare = otherDependencies.reduce(
			(acc, dep) => acc + dep.sizeShare,
			0,
		);

		compactedDependencies.push({
			name: "(others)",
			approximateSize,
			percentShare,
			sizeShare,
			isOthers: true,
			tooltip: otherDependencies
				.map(
					(dep) =>
						`${dep.name} ｜ ${dep.percentShare.toFixed(1)}% ｜ ~ ${getFormattedSize(dep.sizeShare)} min`,
				)
				.join(" \u000D\u000A  \u000D\u000A "),
		});
	} else {
		compactedDependencies = dependenciesCopy;
	}

	return (
		<section ref={treemapSectionRef} className="mt-4">
			<CardTitle className="mb-4">Composition</CardTitle>
			<Treemap width={dimensions.width} height={400} className="treemap w-full">
				{compactedDependencies.map((dep: any, index: any) => (
					<TreemapSquare
						key={dep?.name}
						value={dep.percentShare}
						style={{ background: colors[index % colors.length] }}
						data-balloon={dep.tooltip}
						data-balloon-pos="top"
						className="treemap__square"
					>
						{dep.percentShare > ellipsizeLimit &&
						dep.name.length < dep.percentShare * (12 / ellipsizeLimit) ? (
							<div className="treemap__content">
								<div className="text-accent-foreground">
									{dep.isSelf || dep.isOthers ? (
										<span>{dep.name}</span>
									) : (
										<a
											href={`/package/${dep.name}`}
											target="_blank"
											rel="noreferrer"
										>
											{dep.name}
										</a>
									)}
								</div>
								<div
									className="treemap__percent"
									style={{
										fontSize: `${14 + Math.min(dep.percentShare * 1.2, 25)}px`,
									}}
								>
									{dep.percentShare.toFixed(1)}
									<span className="treemap__percent-sign">%</span>
								</div>
							</div>
						) : (
							<span className="treemap__ellipsis">&hellip;</span>
						)}
					</TreemapSquare>
				))}
			</Treemap>
		</section>
	);
};

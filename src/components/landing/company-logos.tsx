interface Company {
	name: string;
}

const companies: Company[] = [
	{ name: "Microsoft" },
	{ name: "Airbnb" },
	{ name: "Netflix" },
	{ name: "GitHub" },
];

export function CompanyLogos() {
	return (
		<div className="mt-8 text-center">
			<p className="text-sm font-semibold text-super-primary">
				Trusted by developers at
			</p>
			<div className="mt-4 flex justify-center space-x-6">
				{companies.map((company) => (
					<div
						key={company.name}
						className="font-mono text-gray-300 transition-opacity hover:opacity-100"
						style={{ opacity: 0.8 }}
					>
						{company.name}
					</div>
				))}
			</div>
		</div>
	);
}

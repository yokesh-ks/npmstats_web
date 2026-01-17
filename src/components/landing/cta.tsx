import { Check, Star } from "lucide-react";

export function CTA() {
	return (
		<section
			id="cta"
			className="relative py-20 bg-gradient-to-b from-[#000080] to-[#000055]"
		>
			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden animate__animated animate__fadeInUp">
					<div className="grid md:grid-cols-2">
						{/* Left Side: Form */}
						<div className="p-8 md:p-12">
							<h2 className="text-3xl font-bold text-[#000080] mb-6">
								Start Your Free Trial Today
							</h2>
							<p className="text-gray-600 mb-8">
								Get instant access to comprehensive npm package insights. No
								credit card required.
							</p>

							<form className="space-y-4">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Email Address
									</label>
									<input
										type="email"
										id="email"
										name="email"
										placeholder="you@example.com"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-transparent"
									/>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Password
									</label>
									<input
										type="password"
										id="password"
										name="password"
										placeholder="Choose a secure password"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-transparent"
									/>
								</div>

								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-[#000080] focus:ring-[#000080] border-gray-300 rounded"
									/>
									<label
										htmlFor="remember-me"
										className="ml-2 block text-sm text-gray-700"
									>
										I agree to the{" "}
										<a href="#" className="text-[#000080] hover:underline">
											Terms of Service
										</a>{" "}
										and{" "}
										<a href="#" className="text-[#000080] hover:underline">
											Privacy Policy
										</a>
									</label>
								</div>

								<button
									type="submit"
									className="w-full bg-[#000080] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
								>
									Create Your Free Account
								</button>
							</form>

							<div className="mt-6 text-center text-sm text-gray-500">
								Already have an account?{" "}
								<a
									href="#"
									className="text-[#000080] font-medium hover:underline"
								>
									Sign in
								</a>
							</div>
						</div>

						{/* Right Side: Benefits */}
						<div className="bg-gray-50 p-8 md:p-12 flex flex-col">
							<h3 className="text-xl font-bold text-[#000080] mb-6">
								Why Choose NpmStats
							</h3>

							<ul className="space-y-4 mb-8">
								{benefits.map((benefit, index) => (
									<li key={index} className="flex">
										<div className="flex-shrink-0">
											<Check className="h-6 w-6 text-super-primary" />
										</div>
										<div className="ml-3">
											<span className="font-medium">{benefit.title}</span>
											<p className="text-sm text-gray-500 mt-1">
												{benefit.description}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Social Proof Section */}
				<div
					className="mt-16 text-center text-white animate__animated animate__fadeIn"
					style={{ animationDelay: "0.5s" }}
				>
					<h3 className="text-2xl font-bold mb-4">
						Join Thousands of Satisfied Developers
					</h3>
					<p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
						From solo developers to enterprise teams, NpmStats is the trusted
						solution for making informed package decisions.
					</p>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute bottom-0 left-0 w-40 h-40 bg-super-primary opacity-10 rounded-full blur-3xl" />
			<div className="absolute top-1/3 right-10 w-60 h-60 bg-super-primary opacity-10 rounded-full blur-3xl" />
		</section>
	);
}

const benefits = [
	{
		title: "Comprehensive Analysis",
		description: "Get detailed insights into any npm package in seconds.",
	},
	{
		title: "Make Informed Decisions",
		description: "Choose the right packages for your projects with confidence.",
	},
	{
		title: "Enhance Security",
		description:
			"Identify potential vulnerabilities before they impact your apps.",
	},
	{
		title: "Improve Performance",
		description: "Optimize your bundle size and application speed.",
	},
];

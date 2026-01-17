"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
	return (
		<section id="faq" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#000080] animate__animated animate__fadeIn">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto animate__animated animate__fadeIn">
						Everything you need to know about NpmStats
					</p>
				</div>

				<div className="max-w-3xl mx-auto">
					<div className="space-y-6 animate__animated animate__fadeInUp">
						{faqs.map((faq, index) => (
							<FAQItem
								key={index}
								question={faq.question}
								answer={faq.answer}
							/>
						))}
					</div>

					<div
						className="mt-12 text-center animate__animated animate__fadeIn"
						style={{ animationDelay: "0.5s" }}
					>
						<p className="text-gray-600 mb-4">
							Still have questions? We&apos;re here to help.
						</p>
						<a
							href="#cta"
							className="inline-flex items-center text-[#000080] font-bold hover:underline"
						>
							Contact our support team
							<svg
								className="ml-1 w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100">
			<button
				className="flex justify-between items-center w-full text-left px-6 py-4 focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
			>
				<span className="font-medium text-gray-800 text-lg">{question}</span>
				<ChevronDown
					className={`w-5 h-5 text-[#000080] transform transition-transform duration-300 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>
			<div
				className={`px-6 pb-4 transition-all duration-300 ease-in-out ${
					isOpen ? "block" : "hidden"
				}`}
			>
				<p className="text-gray-600">{answer}</p>
			</div>
		</div>
	);
}

const faqs = [
	{
		question: "What is NpmStats?",
		answer:
			"NpmStats is a comprehensive analytics tool that provides detailed insights into npm packages. It helps developers make informed decisions by offering real-time statistics, performance metrics, security analysis, and comparative data about npm packages.",
	},
	{
		question: "How accurate is the data in NpmStats?",
		answer:
			"NpmStats retrieves data directly from the npm registry and other reliable sources in real-time. We employ sophisticated algorithms and validation techniques to ensure the highest level of accuracy. Our download statistics, security scans, and package information are consistently up-to-date and reliable.",
	},
	{
		question: "Is NpmStats free to use?",
		answer:
			"NpmStats offers a free tier that includes basic package analytics and limited searches per day. For more advanced features, higher usage limits, and team collaboration, we offer Pro and Enterprise plans. Check out our pricing page for detailed information about each plan's features and limitations.",
	},
	{
		question: "How does the security scanning feature work?",
		answer:
			"Our security scanning feature automatically checks packages against multiple vulnerability databases, including the National Vulnerability Database (NVD) and other security advisories. We analyze both the direct package code and its dependencies to identify potential security risks, outdated components, and known vulnerabilities. The system provides a comprehensive security report with severity ratings and remediation recommendations.",
	},
	{
		question: "Can I integrate NpmStats with my CI/CD pipeline?",
		answer:
			"Yes, NpmStats offers a robust API that can be integrated with popular CI/CD tools like Jenkins, GitHub Actions, GitLab CI, and CircleCI. With our Enterprise plan, you can automate package analysis during your build process, set quality gates based on security scans, and generate comprehensive reports. We also provide official integrations for common development environments.",
	},
	{
		question: "How can NpmStats help improve my application's performance?",
		answer:
			"NpmStats provides detailed size analysis of packages, including minified and gzipped sizes, helping you understand the impact on your bundle size. Our performance metrics feature evaluates the runtime performance of packages, identifies potential bottlenecks, and suggests more efficient alternatives. By making data-driven package selections based on our insights, you can significantly improve your application's load time, runtime performance, and overall user experience.",
	},
	{
		question: "Can I compare multiple packages side by side?",
		answer:
			"Yes, NpmStats offers a powerful comparison feature that allows you to analyze multiple packages side by side. You can compare download trends, bundle sizes, dependency counts, security profiles, and performance metrics. This makes it easy to evaluate alternatives and choose the best package for your specific needs. The Pro and Enterprise plans allow comparing up to 5 and 10 packages simultaneously, respectively.",
	},
	{
		question: "How do I get support if I have questions or issues?",
		answer:
			"We offer multiple support channels depending on your plan. Free users can access our community forum and documentation. Pro users receive email support with a 24-hour response time. Enterprise customers get priority support with a dedicated account manager and 4-hour response time during business hours. All users can find helpful resources in our extensive documentation, video tutorials, and knowledge base.",
	},
];

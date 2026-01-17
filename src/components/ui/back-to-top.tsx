"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-8 right-8 bg-[#000080] text-white p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none hover:bg-opacity-90 ${
				showBackToTop ? "opacity-100 visible" : "opacity-0 invisible"
			}`}
			aria-label="Back to top"
		>
			<ArrowUp className="h-6 w-6" />
		</button>
	);
}

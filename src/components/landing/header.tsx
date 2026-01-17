"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AppLogo from "@/src/components/atom/logo";
import { Button } from "@/src/components/ui/button";

// Wrapper component that handles the search params
function HeaderContent() {
	const searchParams = useSearchParams();
	const isApp = searchParams?.get("isApp") === "true";
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Don't render the header if isApp is true
	if (isApp) {
		return null;
	}

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header
			id="header"
			className={cn(
				"fixed top-0 left-0 right-0 z-50 h-16 flex items-center",
				"bg-background",
				"transition-all duration-300",
				isScrolled && "border-b shadow-sm h-16",
			)}
		>
			<nav className="container flex items-center justify-between mx-auto px-4">
				<div className="flex items-center">
					<Link href="/" className="relative group" aria-label="npmstats home">
						<AppLogo />
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:flex space-x-1">
					<ul className="flex items-center space-x-1">
						{navigationLinks.map((link) => (
							<li key={link.name}>
								{link.isButton ? (
									<Button
										asChild
										variant="default"
										size="sm"
										className="bg-gradient-primary text-white hover:bg-gradient-primary/90"
									>
										<Link href={link.href}>{link.name}</Link>
									</Button>
								) : (
									<Button
										asChild
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary hover:bg-primary/10"
									>
										<Link href={link.href}>{link.name}</Link>
									</Button>
								)}
							</li>
						))}
					</ul>
				</div>

				{/* Mobile Navigation Button */}
				<Button
					onClick={toggleMobileMenu}
					variant="ghost"
					size="icon"
					className="md:hidden hover:bg-primary/10"
					aria-label="Toggle menu"
					aria-expanded={isMobileMenuOpen}
					aria-controls="mobile-menu"
				>
					<Menu className="h-5 w-5" />
				</Button>

				{/* Mobile Navigation Menu */}
				<div
					id="mobile-menu"
					className={cn(
						"md:hidden fixed top-[64px] inset-x-0 bottom-0 border-t",
						"bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
						"transition-all duration-300 ease-in-out",
						isMobileMenuOpen
							? "translate-y-0 opacity-100"
							: "translate-y-2 opacity-0 pointer-events-none",
					)}
					aria-hidden={!isMobileMenuOpen}
				>
					<ul className="container flex flex-col space-y-2 p-4">
						{navigationLinks.map((link) => (
							<li key={link.name}>
								{link.isButton ? (
									<Button
										asChild
										variant="default"
										className="w-full bg-gradient-primary text-white hover:bg-gradient-primary/90"
									>
										<Link href={link.href} tabIndex={isMobileMenuOpen ? 0 : -1}>
											{link.name}
										</Link>
									</Button>
								) : (
									<Button
										asChild
										variant="ghost"
										className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
									>
										<Link href={link.href} tabIndex={isMobileMenuOpen ? 0 : -1}>
											{link.name}
										</Link>
									</Button>
								)}
							</li>
						))}
					</ul>
				</div>
			</nav>
		</header>
	);
}

// Main Header component with Suspense
export function Header() {
	return (
		<Suspense fallback={null}>
			<HeaderContent />
		</Suspense>
	);
}

const navigationLinks = [
	{ name: "Home", href: "/" },
	{ name: "Features", href: "/#features" },
	{ name: "How It Works", href: "/#how-it-works" },
	{ name: "Catalog", href: "/catalog" },
	{ name: "Get Started", href: "/package", isButton: true },
];

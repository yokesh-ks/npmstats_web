"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export function SearchInput() {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement package search
		console.log("Searching for:", query);
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<Input
				type="text"
				placeholder="Search for an npm package..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="pr-12"
			/>
			<Button
				type="submit"
				size="icon"
				variant="ghost"
				className="absolute right-0 top-0 h-full px-3"
			>
				<Search className="h-4 w-4" />
				<span className="sr-only">Search</span>
			</Button>
		</form>
	);
}

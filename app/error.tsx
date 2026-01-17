"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen space-y-4">
			<AlertCircle className="h-12 w-12 text-destructive" />
			<h2 className="text-xl font-semibold">Something went wrong!</h2>
			<p className="text-muted-foreground text-center max-w-md">
				{error.message ||
					"An unexpected error occurred while loading the page."}
			</p>
			<Button onClick={reset} variant="outline">
				Try again
			</Button>
		</div>
	);
}

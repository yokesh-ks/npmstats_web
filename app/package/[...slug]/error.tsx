"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
			<AlertCircle className="h-12 w-12 text-destructive" />
			<h2 className="text-xl font-semibold">Something went wrong!</h2>
			<p className="text-muted-foreground text-center max-w-md">
				{error.message ||
					"An unexpected error occurred while loading this package."}
			</p>
			<Button onClick={reset} variant="outline">
				Try again
			</Button>
		</div>
	);
}

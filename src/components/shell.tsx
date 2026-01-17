import type { ReactNode } from "react";

interface ShellProps {
	children: ReactNode;
}

export function Shell({ children }: ShellProps) {
	return (
		<div className="relative flex min-h-screen flex-col">
			<main className="flex-1">{children}</main>
			<footer className="border-t py-6">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built with Next.js and Tailwind CSS. Data from npm registry.
					</p>
				</div>
			</footer>
		</div>
	);
}

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckIconProps extends React.ComponentProps<typeof Check> {
	className?: string;
}

export function CheckIcon({ className, ...props }: CheckIconProps) {
	return <Check className={cn("h-4 w-4", className)} {...props} />;
}

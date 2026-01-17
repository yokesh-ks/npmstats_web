import { icons } from "lucide-react";

const iconComponents: any = {};

export const Icon = (props: any) => {
	const LucideIcon = (icons as any)[props.name];
	const IconComponent = iconComponents[props.name];

	if (IconComponent) {
		return <IconComponent {...props} />;
	}

	if (LucideIcon) {
		return <LucideIcon {...props} />;
	}

	return null;
};

import { CTA } from "@/src/components/landing/cta";
import { Demo } from "@/src/components/landing/demo";
import { FAQ } from "@/src/components/landing/faq";
import { Features } from "@/src/components/landing/features";
import { Hero } from "@/src/components/landing/hero";
import { HowItWorks } from "@/src/components/landing/how-it-works";

export default function HomePage() {
	return (
		<>
			<Hero />
			<Features />
			<Demo />
			<HowItWorks />
			<CTA />
			<FAQ />
		</>
	);
}

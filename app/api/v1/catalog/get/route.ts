import { NextResponse } from "next/server";
import { catalog } from "@/constants/npm-catalog";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");

	if (!slug) {
		return NextResponse.json(
			{ error: "slug name is required" },
			{ status: 400 },
		);
	}

	const pkg = catalog.find((p) => p.slug === slug);
	return NextResponse.json(pkg);
}

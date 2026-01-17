import { NextResponse } from "next/server";
import { packages } from "@/constants/popular-packages";

export const dynamic = "force-dynamic";

export async function GET() {
	return NextResponse.json(packages);
}

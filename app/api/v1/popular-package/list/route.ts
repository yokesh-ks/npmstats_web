import { NextResponse } from "next/server";
import { packages } from "@/constants/popular-packages";

export async function GET() {
	return NextResponse.json(packages);
}

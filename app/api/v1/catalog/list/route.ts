import { NextResponse } from "next/server";
import { catalog } from "@/constants/npm-catalog";

export async function GET() {
	return NextResponse.json(catalog);
}

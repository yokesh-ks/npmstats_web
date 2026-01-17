"use server";

import { catalog } from "@/src/constants/npm-catalog";

export async function getCatalogData() {
	return catalog;
}

export async function getCatalogItem(slug: string) {
	return catalog.find((item) => item.slug === slug);
}

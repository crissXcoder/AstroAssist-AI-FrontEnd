import type { Product } from "@/features/catalog";
import productsData from "@/features/catalog/data/products.json";
import setupsData from "@/features/catalog/data/setups.json";

// Export the old CatalogProduct interface for backward compat with setup builder engine
export type { ProductCategory } from "@/features/catalog";
export type CatalogProduct = Product;

export const catalogData: Product[] = productsData as Product[];

import { appMode } from '@/lib/env';
import * as mock from './providers/mock';
import * as live from './providers/supabase';

export type ListParams = { page?: number; pageSize?: number; query?: string; filters?: Record<string, unknown> };

export type FeaturedProduct = { slug: string; name: string; image: string; priceCents: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  images: string[];
  priceCents: number;
  compareAtCents: number;
  variants: Array<{
    id: string;
    storage: number;
    color: string;
    sku: string;
    prices: Record<string, number>;
    inventory: Record<string, number>;
  }>;
  specs: Array<{ key: string; value: string }>;
  reviews: Array<{
    id: string;
    rating: number;
    title: string;
    body: string;
    author: string;
    date: string;
  }>;
};

export type ProductListResult = {
  products: Array<{
    slug: string;
    name: string;
    brand: string;
    image: string;
    priceCents: number;
    compareAtCents: number;
  }>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export const getFeaturedProducts = async (): Promise<FeaturedProduct[]> =>
  appMode === 'live' ? live.getFeaturedProducts() : mock.getFeaturedProducts();

export const getProductBySlug = async (slug: string): Promise<Product | null> =>
  appMode === 'live' ? live.getProductBySlug(slug) : mock.getProductBySlug(slug);

export const getProducts = async (params: ListParams = {}): Promise<ProductListResult> =>
  appMode === 'live' ? live.getProducts(params) : mock.getProducts(params);

// More functions will be added similarly: getProducts, getProductBySlug, createOrder, etc.

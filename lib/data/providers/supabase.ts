// lib/data/providers/supabase.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFeaturedProducts() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product")
    .select("slug,name,price_cents,images")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error || !data) return [];
  return data.map((p: any) => ({
    slug: p.slug,
    name: p.name,
    image: Array.isArray(p.images) ? p.images[0] ?? "" : "",
    priceCents: p.price_cents ?? 0,
  }));
}

export async function getProductBySlug(slug: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    brand: data.brand ?? "Unknown",
    description: data.description ?? "",
    images: Array.isArray(data.images) ? data.images : [],
    priceCents: data.price_cents ?? 0,
    compareAtCents: data.compare_at_cents ?? Math.round((data.price_cents ?? 0) * 1.25),
    variants: Array.isArray(data.variants) ? data.variants : [],
    specs: Array.isArray(data.specs) ? data.specs : [],
    reviews: Array.isArray(data.reviews) ? data.reviews : [],
  };
}

export async function getProducts(params: { page?: number; pageSize?: number; query?: string; filters?: Record<string, unknown> } = {}) {
  const { page = 1, pageSize = 12, query, filters } = params;
  const supabase = createSupabaseServerClient();

  let q = supabase
    .from("product")
    .select("slug,name,brand,price_cents,compare_at_cents,images", { count: "exact" })
    .eq("is_published", true);

  if (query) q = q.or(`name.ilike.%${query}%,brand.ilike.%${query}%`);
  if (filters?.brand) q = q.eq("brand", filters.brand);

  const { data, error, count } = await q
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error || !data) {
    return { products: [], total: 0, page, pageSize, totalPages: 0 };
  }

  return {
    products: data.map((p: any) => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand ?? "Unknown",
      image: Array.isArray(p.images) ? p.images[0] ?? "" : "",
      priceCents: p.price_cents ?? 0,
      compareAtCents: p.compare_at_cents ?? Math.round((p.price_cents ?? 0) * 1.25),
    })),
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

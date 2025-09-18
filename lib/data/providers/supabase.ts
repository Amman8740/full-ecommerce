import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getFeaturedProducts() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('product')
    .select('slug,name,image:image(url)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(8);
  if (error) {
    return [] as { slug: string; name: string; image: string; priceCents: number }[];
  }
  return (data || []).map((p: any) => ({ slug: p.slug, name: p.name, image: p.image?.[0]?.url ?? '', priceCents: 0 }));
}

export async function getProductBySlug(slug: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('product')
    .select('id,slug,name,image:image(url)')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return { slug: data.slug, name: data.name, images: (data.image || []).map((i: any) => i.url), priceCents: 0 };
}

export async function getProducts(params: { page?: number; pageSize?: number; query?: string; filters?: Record<string, unknown> } = {}) {
  const { page = 1, pageSize = 12, query, filters } = params;
  const supabase = createSupabaseServerClient();
  
  let query_builder = supabase
    .from('product')
    .select('slug,name,brand,image:image(url),price:price(amount_cents)')
    .eq('is_published', true);
    
  if (query) {
    query_builder = query_builder.or(`name.ilike.%${query}%,brand.ilike.%${query}%`);
  }
  
  if (filters?.brand) {
    query_builder = query_builder.eq('brand', filters.brand);
  }
  
  const { data, error, count } = await query_builder
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);
    
  if (error) {
    return {
      products: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0
    };
  }
  
  return {
    products: (data || []).map((p: any) => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand || 'Unknown',
      image: p.image?.[0]?.url || '',
      priceCents: p.price?.[0]?.amount_cents || 0,
      compareAtCents: Math.round((p.price?.[0]?.amount_cents || 0) * 1.25)
    })),
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize)
  };
}

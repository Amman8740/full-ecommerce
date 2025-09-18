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

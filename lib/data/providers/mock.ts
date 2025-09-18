import products from '@/data/products.json';

type ProductJson = {
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

export async function getFeaturedProducts() {
  const list = (products as ProductJson[]).slice(0, 8);
  return list.map((p) => ({ 
    slug: p.slug, 
    name: p.name, 
    image: p.images[0], 
    priceCents: p.priceCents 
  }));
}

export async function getProductBySlug(slug: string) {
  const list = products as ProductJson[];
  const found = list.find((p) => p.slug === slug);
  if (!found) return null;
  return found;
}

export async function getProducts(params: { page?: number; pageSize?: number; query?: string; filters?: Record<string, unknown> } = {}) {
  const { page = 1, pageSize = 12, query, filters } = params;
  let list = products as ProductJson[];
  
  if (query) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (filters?.brand) {
    list = list.filter(p => p.brand === filters.brand);
  }
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    products: list.slice(start, end).map(p => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      image: p.images[0],
      priceCents: p.priceCents,
      compareAtCents: p.compareAtCents
    })),
    total: list.length,
    page,
    pageSize,
    totalPages: Math.ceil(list.length / pageSize)
  };
}

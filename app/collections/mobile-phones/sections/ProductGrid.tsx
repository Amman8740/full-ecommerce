import Link from 'next/link';
import { getProducts } from '@/lib/data/provider';

type ProductGridProps = {
  page: number;
  filters?: Record<string, unknown>;
  query?: string;
};

export default async function ProductGrid({ page, filters, query }: ProductGridProps) {
  const result = await getProducts({ 
    page, 
    pageSize: 12, 
    query, 
    filters 
  });

  if (result.products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
        <p className="text-slate-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing {result.products.length} of {result.total} products
        </p>
        <select className="text-sm border rounded px-2 py-1">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {result.products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`} className="group">
            <div className="aspect-square rounded-lg border border-slate-200 bg-white overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-emerald-700">
                {product.name}
              </h3>
              <p className="text-xs text-slate-600">{product.brand}</p>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-emerald-700">
                  £{(product.priceCents/100).toFixed(0)}
                </span>
                {product.compareAtCents > product.priceCents && (
                  <span className="text-xs text-slate-500 line-through">
                    £{(product.compareAtCents/100).toFixed(0)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {result.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button 
            disabled={page === 1}
            className="px-3 py-2 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, result.totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                className={`px-3 py-2 text-sm border rounded ${
                  page === pageNum 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button 
            disabled={page === result.totalPages}
            className="px-3 py-2 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

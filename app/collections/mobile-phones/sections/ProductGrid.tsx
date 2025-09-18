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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {result.products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Refurbished
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600">{product.brand}</p>
                  </div>
                  
                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-2xl font-bold text-emerald-600">
                      £{(product.priceCents/100).toFixed(0)}
                    </span>
                    {product.compareAtCents > product.priceCents && (
                      <span className="text-sm text-slate-500 line-through">
                        £{(product.compareAtCents/100).toFixed(0)}
                      </span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">(4.8)</span>
                  </div>
                  
                  {/* Features */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      <span>13-month warranty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      <span>Free UK delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      <span>30-day returns</span>
                    </div>
                  </div>
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

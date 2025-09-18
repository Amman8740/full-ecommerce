import Link from 'next/link';
import type { FeaturedProduct } from '@/lib/data/provider';

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Deals</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hand-picked refurbished devices in excellent condition, all backed by our quality guarantee.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
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
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-emerald-600">
                    £{(product.priceCents/100).toFixed(0)}
                  </span>
                  <span className="text-slate-500 line-through">
                    £{Math.round(product.priceCents * 1.25 / 100)}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">(4.8)</span>
                </div>
                
                {/* Features */}
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span>13-month warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span>Free UK delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/collections/mobile-phones"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

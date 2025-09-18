import Link from 'next/link';

const categories = [
  {
    name: 'Mobile Phones',
    count: '24 items',
    gradient: 'from-pink-500 via-purple-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
    href: '/collections/mobile-phones',
    description: 'Latest smartphones'
  },
  {
    name: 'iPads',
    count: '32 items',
    gradient: 'from-blue-400 via-cyan-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop',
    href: '/collections/tablets',
    description: 'Apple tablets'
  },
  {
    name: 'AirPods',
    count: '1 item',
    gradient: 'from-yellow-400 via-green-500 to-emerald-600',
    image: 'https://images.unsplash.com/photo-1606229365485-93b23da3a36b?q=80&w=400&auto=format&fit=crop',
    href: '/collections/accessories',
    description: 'Wireless earbuds'
  },
  {
    name: 'Laptops',
    count: '6 items',
    gradient: 'from-purple-500 via-pink-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=400&auto=format&fit=crop',
    href: '/collections/laptops',
    description: 'MacBooks & more'
  }
];

export default function CategoryCards() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Shop by Category</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of refurbished electronics, all backed by our quality guarantee.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-48 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-2">{category.description}</p>
                  <div className="text-white/90 font-semibold">{category.count}</div>
                </div>
                
                {/* Product Image */}
                <div className="relative h-16 flex items-end">
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-12 h-12 object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Arrow Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

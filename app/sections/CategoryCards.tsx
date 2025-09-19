import Link from "next/link";

const categories = [
  {
    name: "Mobile Phones",
    count: "62 items",
    description: "Latest smartphones",
    href: "/collections/mobile-phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    // soft pastel like the reference
    bg: "from-amber-50 via-pink-50 to-fuchsia-100",
  },
  {
    name: "iPads",
    count: "32 items",
    description: "Apple tablets",
    href: "/collections/tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
    bg: "from-sky-50 via-cyan-50 to-blue-100",
  },
  {
    name: "AirPods",
    count: "1 item",
    description: "Wireless earbuds",
    href: "/collections/accessories",
    image: "https://images.unsplash.com/photo-1606229365485-93b23da3a36b?q=80&w=900&auto=format&fit=crop",
    bg: "from-yellow-50 via-lime-50 to-emerald-100",
  },
  {
    name: "Laptops",
    count: "6 items",
    description: "MacBooks & more",
    href: "/collections/laptops",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop",
    bg: "from-violet-50 via-fuchsia-50 to-purple-100",
  },
];

export default function CategoryCards() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Shop by Category</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of refurbished electronics, all backed by our quality guarantee.
          </p>
        </div>

        {/* 1 -> 2 -> 4 columns like the reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="
                group relative overflow-hidden rounded-3xl
                border border-slate-200 bg-gradient-to-br
                shadow-sm hover:shadow-md transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-slate-400/40
              "
            >
              {/* soft pastel background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${c.bg}`} />

              {/* content */}
              <div className="relative z-10 p-6 md:p-7 h-72 md:h-80 flex flex-col">
                {/* title/desc/count */}
                <div className="text-slate-900">
                  <h3 className="text-xl md:text-2xl font-bold">{c.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{c.description}</p>
                  <div className="text-sm font-medium text-slate-700 mt-2">{c.count}</div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <span
                    className="
                      inline-flex items-center justify-center px-4 py-2 rounded-md
                      bg-black text-white text-sm font-semibold
                      group-hover:bg-slate-900 transition-colors
                    "
                  >
                    Shop now
                  </span>
                </div>
              </div>

              {/* product image, large on the right, not rotated */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.name}
                className="
                  absolute right-4 md:right-5 bottom-5
                  w-32 md:w-40 lg:w-44
                  h-32 md:h-40 lg:h-44
                  object-contain
                  drop-shadow-xl
                "
              />

              {/* subtle inner highlight like the ref cards */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

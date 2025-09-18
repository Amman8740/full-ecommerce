import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/data/provider';

export default async function HomePage() {
  const products = await getFeaturedProducts();
  return (
    <div className="space-y-12">
      <section className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Premium refurbished phones, delivered free across the UK</h1>
            <p className="mt-3 text-slate-600">Save up to 40% vs new. 13-month seller warranty. 30-day returns.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/collections/mobile-phones" className="rounded-md bg-emerald-600 text-white px-5 py-2.5">Shop phones</Link>
              <Link href="/faqs" className="rounded-md border border-slate-300 px-5 py-2.5">Learn more</Link>
            </div>
          </div>
          <div className="h-48 md:h-64 rounded-lg bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"/>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-slate-600">
          <div className="rounded-md border border-slate-200 p-3 text-center">Free UK delivery 1–3 days</div>
          <div className="rounded-md border border-slate-200 p-3 text-center">30-day returns</div>
          <div className="rounded-md border border-slate-200 p-3 text-center">13-month seller warranty</div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
              <div className="aspect-square rounded-lg border border-slate-200 bg-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition"/>
              </div>
              <div className="mt-2 text-sm">
                <div className="font-medium line-clamp-1">{p.name}</div>
                <div className="text-emerald-700">£{(p.priceCents/100).toFixed(0)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Top brands</h2>
        <div className="flex flex-wrap gap-3 text-sm text-slate-700">
          {['Apple','Samsung','Google','OnePlus'].map((b)=> (
            <span key={b} className="rounded-full border border-slate-200 px-3 py-1">{b}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

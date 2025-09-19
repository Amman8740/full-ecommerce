'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[radial-gradient(120%_90%_at_0%_0%,#EEF5FF_0%,#E3EEFF_45%,#DAE7FF_100%)]
      "
    >
      {/* subtle texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,.6) 7%, rgba(255,255,255,0) 7%), linear-gradient(135deg, rgba(255,255,255,.35) 7%, rgba(255,255,255,0) 7%)",
          backgroundSize: "26px 26px, 52px 52px",
          backgroundPosition: "0 0, 13px 13px",
        }}
      />

      {/* Compact vertical spacing (shorter hero) */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-10 md:py-14">
          {/* Left */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              Buy &amp; Sell with the UK’s Top Refurbished Seller.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Premium refurbished electronics with 13-month warranty, free UK delivery, and 30-day returns.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/collections/mobile-phones"
                className="inline-flex items-center justify-center px-6 md:px-7 py-3 rounded-lg
                           bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                href="/trade-in"
                className="inline-flex items-center justify-center px-6 md:px-7 py-3 rounded-lg
                           bg-lime-400 text-slate-900 font-semibold hover:bg-lime-500 transition-colors"
              >
                Start Selling
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-6 pt-3">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 leading-none text-lg" aria-label="4.8 out of 5 stars">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <span className="text-sm text-slate-600">4.8/5 on Trustpilot</span>
              </div>
              <div className="text-sm text-slate-500">
                <span className="font-semibold">1,190+</span> reviews
              </div>
            </div>
          </div>

          {/* Right — neat grid collage (short & tidy) */}
          <div className="relative">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[320px] md:h-[400px]">
              {/* Top-left small pill (watch) */}
              <div className="col-span-2 row-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop"
                  alt="Apple Watch"
                  className="w-full h-full object-cover rounded-2xl shadow-lg ring-1 ring-black/5 bg-white"
                />
              </div>

              {/* Main hero tile (tablet) */}
              <div className="col-start-3 col-span-4 row-start-2 row-span-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop"
                  alt="iPad Pro"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl ring-1 ring-black/5"
                />
              </div>

              {/* Bottom-left wide (laptop) */}
              <div className="col-span-3 row-start-4 row-span-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=900&auto=format&fit=crop"
                  alt="MacBook"
                  className="w-full h-full object-cover rounded-2xl shadow-xl ring-1 ring-black/5 bg-white"
                />
              </div>

              {/* Floating phone badge (overlaps slightly) */}
              <div className="col-start-5 row-start-5 col-span-2 row-span-2 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=700&auto=format&fit=crop"
                  alt="iPhone"
                  className="w-full h-full object-cover rounded-xl shadow-lg ring-1 ring-black/5 bg-white"
                />
                {/* tiny price pill */}
                <div className="absolute -bottom-2 -right-2 bg-white text-blue-700 text-xs px-3 py-1 rounded-full shadow-md font-semibold">
                  From £799
                </div>
              </div>
            </div>

            {/* soft vignette at bottom for depth */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-16 bg-gradient-to-t from-white/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

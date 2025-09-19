// app/components/Header.tsx
import Link from "next/link";
import HeaderRight from "./HeaderRight";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
{/* Announcement bar (sliding) */}
<div className="w-full bg-slate-900 text-white text-sm">
  <div className="relative overflow-hidden annc">
    {/* edge fades */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-900 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-900 to-transparent" />

    {/* track (duplicate messages for seamless loop) */}
    <div className="py-2 animate-annc-reverse"> {/* use animate-annc for leftward */}
      <div className="annc-track">
        <span>Free delivery all over UK. For next day delivery, order before 3 PM (working days)</span>
        <span>13-month warranty on all devices</span>
        <span>30-day returns</span>

        {/* duplicates for seamless wrap */}
        <span aria-hidden="true">Free delivery all over UK. For next day delivery, order before 3 PM (working days)</span>
        <span aria-hidden="true">13-month warranty on all devices</span>
        <span aria-hidden="true">30-day returns</span>
      </div>
    </div>
  </div>
</div>


      {/* NOTE: remove justify-between and use ml-auto on the icons to push them all the way right */}
      <div className="container flex items-center h-20 gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Mobile Direct Online">
          <Image
            src="https://mobiledirectonline.co.uk/cdn/shop/files/Mobile-Direct-Official-Logo-1.svg?v=1716282489&width=272"
            alt="Mobile Direct Online"
            width={136}
            height={36}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
          <Link href="/collections/mobile-phones" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
            Mobile Phones
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link href="/collections/tablets" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
            Tablets
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link href="/collections/laptops" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Laptops</Link>
          <Link href="/collections/accessories" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Accessories</Link>
        </nav>

        {/* Sell Your Device CTA lives in the main header row */}
        <Link
          href="/trade-in"
          className="hidden md:inline-flex items-center gap-1 bg-lime-400 text-slate-900 px-2 py-1 rounded-lg font-semibold hover:bg-lime-500 transition-colors shadow-sm"
        >
          <Plus className="w-2 h-2" />
          Sell Your Device
        </Link>

        {/* Right icons only — pushed fully to the right */}
        <div className="ml-auto shrink-0 pr-1">
          <HeaderRight />
        </div>
      </div>
    </header>
  );
}

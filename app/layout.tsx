import './globals.css';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import CookieBanner from './components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Refurbished Phones UK – Refurb Store',
  description: 'Premium refurbished phones with free UK delivery and 13-month warranty.',
  keywords: 'refurbished phones, used phones, mobile phones, iPhone, Samsung, Google Pixel, UK delivery',
  openGraph: {
    title: 'Refurbished Phones UK – Refurb Store',
    description: 'Premium refurbished phones with free UK delivery and 13-month warranty.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refurbished Phones UK – Refurb Store',
    description: 'Premium refurbished phones with free UK delivery and 13-month warranty.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-white text-slate-900`}>        
        <div className="w-full bg-slate-900 text-white text-sm">
          <div className="container py-2 text-center">
            Free delivery all over UK. For next day delivery, order before 3 PM (working days)
          </div>
        </div>
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
          <div className="container flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-xl text-slate-900">REFURB</div>
                <div className="text-xs text-slate-600 -mt-1">STORE</div>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <div className="relative group">
                <Link href="/collections/mobile-phones" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                  Mobile Phones
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
              <div className="relative group">
                <Link href="/collections/tablets" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                  Tablets
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
              <Link href="/collections/laptops" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Laptops</Link>
              <Link href="/collections/accessories" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Accessories</Link>
            </nav>
            
            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Sell Device CTA */}
              <Link 
                href="/trade-in" 
                className="hidden sm:inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Sell Your Device
              </Link>
              
              {/* Search */}
              <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Account */}
              <Link href="/account" className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              
              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-12 border-t border-slate-200">
          <div className="container grid gap-6 py-10 md:grid-cols-4 text-sm">
            <div>
              <div className="font-semibold mb-3">Policies</div>
              <ul className="space-y-2">
                <li><Link href="/warranty">Warranty</Link></li>
                <li><Link href="/shipping">Shipping</Link></li>
                <li><Link href="/returns">Returns & Refunds</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/return-form">Return Form</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Company</div>
              <p>Refurb Store Ltd<br/>London, United Kingdom</p>
              <p className="mt-2">Email: hello@example.co.uk<br/>Phone: +44 20 1234 5678</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Support</div>
              <ul className="space-y-2">
                <li><Link href="/faqs">FAQs</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/trade-in">Trade-in</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">WhatsApp</div>
              <a href="https://wa.me/440000000000" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-emerald-600 text-white px-4 py-2">Chat on WhatsApp</a>
            </div>
          </div>
          <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Refurb Store Ltd. All rights reserved.</div>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}

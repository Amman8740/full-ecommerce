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
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="font-semibold text-lg">Refurb Store</Link>
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/collections/mobile-phones">Mobile Phones</Link>
              <Link href="/collections/tablets">Tablets</Link>
              <Link href="/collections/laptops">Laptops</Link>
              <Link href="/collections/accessories">Accessories</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/account" className="text-sm">Account</Link>
              <Link href="/cart" className="text-sm">Cart</Link>
            </div>
          </div>
        </header>
        <main className="container py-8">{children}</main>
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

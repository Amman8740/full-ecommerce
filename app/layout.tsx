import './globals.css';
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import CookieBanner from './components/CookieBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';


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
        <Header />
        <main>{children}</main>
        <Footer />
         <CartDrawer />
        <CookieBanner />
      </body>
    </html>
  );
}

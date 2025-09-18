import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/data/provider';
import HeroSection from './sections/HeroSection';
import CategoryCards from './sections/CategoryCards';
import FeaturedProducts from './sections/FeaturedProducts';
import TrustpilotSection from './sections/TrustpilotSection';
import FloatingReview from './sections/FloatingReview';

export default async function HomePage() {
  const products = await getFeaturedProducts();
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Category Cards */}
      <CategoryCards />
      
      {/* Featured Products */}
      <FeaturedProducts products={products} />
      
      {/* Trustpilot Section */}
      <TrustpilotSection />
      
      {/* Floating Review */}
      <FloatingReview />
    </div>
  );
}

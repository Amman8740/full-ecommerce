import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data/provider';
import ProductGallery from './sections/ProductGallery';
import ProductInfo from './sections/ProductInfo';
import ProductSpecs from './sections/ProductSpecs';
import ProductReviews from './sections/ProductReviews';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <ProductSpecs specs={product.specs} />
        <ProductReviews reviews={product.reviews} />
      </div>
    </div>
  );
}

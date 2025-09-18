'use client';
import { useCart } from '@/lib/store/cart';
import type { Product } from '@/lib/data/provider';

type AddToCartProps = {
  product: Product;
  variant: Product['variants'][0];
  grade: 'fair' | 'very-good' | 'excellent' | 'like-new';
  disabled?: boolean;
};

export default function AddToCart({ product, variant, grade, disabled }: AddToCartProps) {
  const addItem = useCart(s => s.addItem);
  const price = variant.prices[grade];
  
  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name: `${product.name} ${variant.storage}GB ${variant.color} (${grade})`,
      priceCents: price,
      image: product.images[0]
    }, 1);
  };
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className="w-full rounded-md bg-emerald-600 text-white px-6 py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors"
    >
      {disabled ? 'Out of stock' : `Add to cart - £${(price/100).toFixed(0)}`}
    </button>
  );
}

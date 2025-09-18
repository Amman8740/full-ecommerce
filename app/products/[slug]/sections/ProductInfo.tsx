'use client';
import { useState } from 'react';
import type { Product } from '@/lib/data/provider';
import AddToCart from './AddToCart';

export default function ProductInfo({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedGrade, setSelectedGrade] = useState<'fair' | 'very-good' | 'excellent' | 'like-new'>('excellent');
  
  const currentPrice = selectedVariant.prices[selectedGrade];
  const currentInventory = selectedVariant.inventory[selectedGrade];
  
  const grades = [
    { key: 'fair', label: 'Fair', description: 'Visible signs of use' },
    { key: 'very-good', label: 'Very Good', description: 'Light signs of use' },
    { key: 'excellent', label: 'Excellent', description: 'Minimal signs of use' },
    { key: 'like-new', label: 'Like New', description: 'Almost new' }
  ] as const;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-slate-600 mt-2">{product.brand}</p>
      </div>
      
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-emerald-700">£{(currentPrice/100).toFixed(0)}</span>
        {product.compareAtCents > currentPrice && (
          <span className="text-lg text-slate-500 line-through">£{(product.compareAtCents/100).toFixed(0)}</span>
        )}
      </div>
      
      <p className="text-slate-700">{product.description}</p>
      
      {/* Variant Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Storage</h3>
          <div className="flex gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-2 rounded border ${
                  selectedVariant.id === variant.id 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-slate-300'
                }`}
              >
                {variant.storage}GB
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-2 rounded border ${
                  selectedVariant.id === variant.id 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-slate-300'
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Condition</h3>
          <div className="space-y-2">
            {grades.map((grade) => (
              <label key={grade.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="grade"
                  value={grade.key}
                  checked={selectedGrade === grade.key}
                  onChange={(e) => setSelectedGrade(e.target.value as typeof selectedGrade)}
                  className="text-emerald-600"
                />
                <div className="flex-1">
                  <div className="font-medium">{grade.label}</div>
                  <div className="text-sm text-slate-600">{grade.description}</div>
                </div>
                <div className="font-medium">£{(selectedVariant.prices[grade.key]/100).toFixed(0)}</div>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stock Status */}
      <div className="text-sm">
        {currentInventory > 0 ? (
          <span className="text-emerald-700">✓ In stock ({currentInventory} available)</span>
        ) : (
          <span className="text-red-600">✗ Out of stock</span>
        )}
      </div>
      
      {/* Add to Cart */}
      <div className="pt-4">
        <AddToCart 
          product={product} 
          variant={selectedVariant} 
          grade={selectedGrade}
          disabled={currentInventory === 0}
        />
      </div>
      
      {/* Trust Badges */}
      <div className="pt-6 border-t border-slate-200">
        <div className="text-sm text-slate-600 space-y-1">
          <div>✓ 13-month seller warranty</div>
          <div>✓ 30-day returns</div>
          <div>✓ Free UK delivery</div>
          <div>✓ What's in the box: Phone, charger, cable</div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import type { Product } from '@/lib/data/provider';

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div>
      <div className="aspect-square rounded-lg border overflow-hidden mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.images[selectedImage]} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {product.images.map((src: string, i: number) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`aspect-square rounded border overflow-hidden ${
              selectedImage === i ? 'ring-2 ring-emerald-500' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

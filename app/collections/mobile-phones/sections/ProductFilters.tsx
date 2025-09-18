'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const brands = ['Apple', 'Samsung', 'Google', 'OnePlus'];
const conditions = [
  { key: 'fair', label: 'Fair' },
  { key: 'very-good', label: 'Very Good' },
  { key: 'excellent', label: 'Excellent' },
  { key: 'like-new', label: 'Like New' }
];
const storageOptions = [64, 128, 256, 512];
const priceRanges = [
  { min: 0, max: 100, label: '£0 - £100' },
  { min: 101, max: 250, label: '£101 - £250' },
  { min: 251, max: 500, label: '£251 - £500' },
  { min: 501, max: 9999, label: '£500+' }
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || '',
    condition: searchParams.get('condition') || '',
    storage: searchParams.get('storage') || '',
    priceRange: searchParams.get('priceRange') || ''
  });

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to page 1 when filtering
    
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({ brand: '', condition: '', storage: '', priceRange: '' });
    router.push('/collections/mobile-phones');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Filters</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Brand</h3>
          <div className="space-y-1">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => updateFilter('brand', e.target.value)}
                  className="text-emerald-600"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Condition</h3>
          <div className="space-y-1">
            {conditions.map((condition) => (
              <label key={condition.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value={condition.key}
                  checked={filters.condition === condition.key}
                  onChange={(e) => updateFilter('condition', e.target.value)}
                  className="text-emerald-600"
                />
                <span className="text-sm">{condition.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Storage</h3>
          <div className="space-y-1">
            {storageOptions.map((storage) => (
              <label key={storage} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="storage"
                  value={storage.toString()}
                  checked={filters.storage === storage.toString()}
                  onChange={(e) => updateFilter('storage', e.target.value)}
                  className="text-emerald-600"
                />
                <span className="text-sm">{storage}GB</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="space-y-1">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value={`${range.min}-${range.max}`}
                  checked={filters.priceRange === `${range.min}-${range.max}`}
                  onChange={(e) => updateFilter('priceRange', e.target.value)}
                  className="text-emerald-600"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';

export default function FloatingReview() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: 'Sneha J.',
      rating: 5,
      text: '...they work great!!',
      product: 'Apple AirPods Pro (2nd Gen)',
      image: 'https://images.unsplash.com/photo-1606229365485-93b23da3a36b?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Alex M.',
      rating: 5,
      text: 'Perfect condition, fast delivery!',
      product: 'iPhone 13 Pro',
      image: 'https://images.unsplash.com/photo-1631700611304-3bf264e80b6f?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Lisa T.',
      rating: 5,
      text: 'Amazing value for money!',
      product: 'Samsung Galaxy S21',
      image: 'https://images.unsplash.com/photo-1610945265070-9e8925f2f4b9?q=80&w=200&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    // Show after 3 seconds
    const showTimer = setTimeout(() => setIsVisible(true), 3000);
    
    // Rotate reviews every 5 seconds
    const rotateTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, [reviews.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium">Live Review</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Review Content */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Product Image */}
            <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={reviews[currentReview].image} 
                alt={reviews[currentReview].product}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Review Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-sm text-slate-600">just now</span>
              </div>
              
              <p className="text-slate-700 text-sm mb-2 line-clamp-2">
                &ldquo;{reviews[currentReview].text}&rdquo;
              </p>
              
              <div className="text-xs text-slate-600">
                <div className="font-semibold">{reviews[currentReview].name}</div>
                <div className="truncate">{reviews[currentReview].product}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">Verified purchase</span>
            <div className="flex gap-1">
              {reviews.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentReview ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

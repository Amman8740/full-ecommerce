'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentDevice, setCurrentDevice] = useState(0);
  
  const devices = [
    { name: 'iPhone 15 Pro', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop', price: 'From £899' },
    { name: 'Samsung Galaxy S24', image: 'https://images.unsplash.com/photo-1610945265070-9e8925f2f4b9?q=80&w=400&auto=format&fit=crop', price: 'From £699' },
    { name: 'Google Pixel 8', image: 'https://images.unsplash.com/photo-1664627936615-39ac78e1bd1b?q=80&w=400&auto=format&fit=crop', price: 'From £599' },
    { name: 'iPad Pro', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop', price: 'From £799' },
    { name: 'MacBook Air', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=400&auto=format&fit=crop', price: 'From £999' },
    { name: 'Apple Watch', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop', price: 'From £249' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDevice((prev) => (prev + 1) % devices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [devices.length]);

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-16">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Buy & Sell with the UK&apos;s Top Refurbished Seller
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Premium refurbished electronics with 13-month warranty, free UK delivery, and 30-day returns.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/collections/mobile-phones" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Shop Now
              </Link>
              <Link 
                href="/trade-in" 
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
              >
                Start Selling
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-sm">4.8/5 on Trustpilot</span>
              </div>
              <div className="text-sm text-blue-200">
                <span className="font-semibold">1,190+</span> reviews
              </div>
            </div>
          </div>
          
          {/* Right Content - Device Showcase */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Main Device Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={devices[currentDevice].image} 
                    alt={devices[currentDevice].name}
                    className="w-64 h-64 object-contain drop-shadow-2xl transition-all duration-500 transform hover:scale-110"
                  />
                  {/* Floating Price Tag */}
                  <div className="absolute -bottom-4 -right-4 bg-white text-blue-700 px-4 py-2 rounded-full shadow-lg font-semibold">
                    {devices[currentDevice].price}
                  </div>
                </div>
              </div>
              
              {/* Floating Devices */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=100&auto=format&fit=crop" alt="Apple Watch" className="w-8 h-8 object-contain" />
              </div>
              
              <div className="absolute bottom-8 left-4 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=100&auto=format&fit=crop" alt="iPad" className="w-12 h-12 object-contain" />
              </div>
              
              <div className="absolute top-1/2 -left-8 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=100&auto=format&fit=crop" alt="MacBook" className="w-10 h-10 object-contain" />
              </div>
            </div>
            
            {/* Device Selector Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {devices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDevice(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentDevice ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

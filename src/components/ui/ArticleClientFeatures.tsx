'use client';

import { useState, useEffect } from 'react';
import { Share2, Bookmark, Heart, ShoppingBag } from '@/components/ui/icons';
import Image from 'next/image';

export default function ArticleClientFeatures({ articleId }: { articleId: string }) {
  const [progress, setProgress] = useState(0);
  const [claps, setClaps] = useState(124);
  const [hasClapped, setHasClapped] = useState(false);

  // Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClap = () => {
    if (!hasClapped) {
      setClaps(prev => prev + 1);
      setHasClapped(true);
      console.log('Clapped for article:', articleId);
      // In a real app, fire API to Supabase
    } else {
      setClaps(prev => prev - 1);
      setHasClapped(false);
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-gold z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center gap-6 z-40">
        <button 
          onClick={handleClap}
          className={`flex items-center gap-2 transition-colors ${hasClapped ? 'text-brand-gold' : 'text-gray-500 hover:text-brand-black'}`}
        >
          <Heart width={20} height={20} className={hasClapped ? 'fill-current' : ''} />
          <span className="font-medium">{claps}</span>
        </button>
        
        <div className="w-px h-6 bg-gray-200"></div>
        
        <button className="text-gray-500 hover:text-brand-black transition-colors" aria-label="Save article">
          <Bookmark width={20} height={20} />
        </button>
        
        <button className="text-gray-500 hover:text-brand-black transition-colors" aria-label="Share article">
          <Share2 width={20} height={20} />
        </button>
      </div>

      {/* Shop The Look (Mockup) */}
      <div className="my-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
        <h4 className="font-serif text-2xl font-bold mb-6 flex items-center">
          <ShoppingBag className="mr-3 text-brand-gold" />
          Shop the Look
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4 items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image src="/images/designer-menswear.jpg" alt="Aso Oke Jacket" fill className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deola Sagoe</span>
              <h5 className="font-bold text-brand-black">Handwoven Aso Oke Jacket</h5>
              <p className="text-brand-gold font-medium mt-1">₦150,000</p>
            </div>
          </div>
          <div className="flex gap-4 items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image src="/images/designer-bridal.jpg" alt="Beaded Clutch" fill className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lisa Folawiyo</span>
              <h5 className="font-bold text-brand-black">Embellished Minaudiere</h5>
              <p className="text-brand-gold font-medium mt-1">₦85,000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

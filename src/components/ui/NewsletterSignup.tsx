'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from '@/components/ui/icons';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-neutral/30 p-8 rounded-xl text-center border border-brand-gold/20 my-12">
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
          <Mail width={24} height={24} />
        </div>
        <h4 className="font-serif text-2xl font-bold text-brand-black mb-2">You&apos;re on the list!</h4>
        <p className="text-gray-600">Check your inbox soon for the latest fashion insights.</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-black text-white p-8 md:p-12 rounded-xl shadow-lg my-12 relative overflow-hidden group">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gold/20 transition-colors duration-700"></div>
      
      <div className="relative z-10 max-w-2xl">
        <h4 className="font-serif text-3xl font-bold mb-3 flex items-center">
          <Mail className="mr-3 text-brand-gold" />
          The StyleAtlas Edit
        </h4>
        <p className="text-gray-300 mb-8 text-lg">
          Curated fashion intelligence, interviews with top designers, and exclusive marketplace drops delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow bg-white/10 border border-white/20 rounded text-white px-5 py-4 focus:outline-none focus:border-brand-gold placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            required
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-brand-gold text-brand-black font-bold px-8 py-4 rounded hover:bg-brand-gold/90 transition-colors flex items-center justify-center whitespace-nowrap disabled:opacity-70"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            {status !== 'loading' && <ArrowRight className="ml-2" width={18} height={18} />}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

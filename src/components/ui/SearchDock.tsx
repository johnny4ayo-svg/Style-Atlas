"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchDock() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('designers');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (location) params.append('location', location);
    
    // Use the active tab to determine base search context if needed
    if (activeTab === 'brands') params.append('type', 'brand');
    else if (activeTab === 'schools') params.append('type', 'school');
    else if (activeTab === 'stylists') params.append('type', 'stylist');
    
    router.push(`/directory?${params.toString()}`);
  };

  return (
    <form className="search-dock" onSubmit={handleSearch}>
      <div className="search-tabs">
        <button 
          type="button" 
          className={`search-tab ${activeTab === 'designers' ? 'active' : ''}`}
          onClick={() => setActiveTab('designers')}
        >
          A designer
        </button>
        <button 
          type="button" 
          className={`search-tab ${activeTab === 'brands' ? 'active' : ''}`}
          onClick={() => setActiveTab('brands')}
        >
          A brand
        </button>
        <button 
          type="button" 
          className={`search-tab ${activeTab === 'schools' ? 'active' : ''}`}
          onClick={() => setActiveTab('schools')}
        >
          A school
        </button>
        <button 
          type="button" 
          className={`search-tab ${activeTab === 'stylists' ? 'active' : ''}`}
          onClick={() => setActiveTab('stylists')}
        >
          A stylist
        </button>
      </div>
      <div className="search-row">
        <div className="search-field">
          <svg className="icon"><use href="/icons/sprite.svg#icon-search"></use></svg>
          <div>
            <label>What do you need?</label>
            <input 
              placeholder="Bridal designer, stylist, tailor..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-field">
          <svg className="icon"><use href="/icons/sprite.svg#icon-scissors"></use></svg>
          <div>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All categories</option>
              <option value="designers">Designers</option>
              <option value="brands">Brands</option>
              <option value="schools">Fashion schools</option>
            </select>
          </div>
        </div>
        <div className="search-field">
          <svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>
          <div>
            <label>Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All cities</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Benin City">Benin City</option>
            </select>
          </div>
        </div>
        <div className="search-field">
          <svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>
          <div>
            <label>Speciality</label>
            <select>
              <option>All styles</option>
              <option>Luxury bridal</option>
              <option>Menswear</option>
              <option>Ready-to-wear</option>
            </select>
          </div>
        </div>
        <button className="search-submit" aria-label="Search" type="submit">
          <svg className="icon"><use href="/icons/sprite.svg#icon-search"></use></svg>
        </button>
      </div>
    </form>
  );
}

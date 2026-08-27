"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchDock() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('designers');
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    const trimmedQuery = query.trim();
    if (trimmedQuery) params.append('q', trimmedQuery);
    
    // Use the active tab as the category
    let finalCategory = '';
    if (activeTab) {
      if (activeTab === 'designers') finalCategory = 'designers';
      if (activeTab === 'brands') finalCategory = 'brands';
      if (activeTab === 'schools') finalCategory = 'schools';
      if (activeTab === 'stylists') finalCategory = 'stylists';
    }

    if (finalCategory) params.append('category', finalCategory);
    if (city) params.append('city', city);
    
    // Convert values to URL-safe slugs in params is handled by the values we set in the state
    
    // Only navigate if at least one parameter is present
    if (params.toString()) {
      router.push(`/directory?${params.toString()}`);
    } else {
      router.push('/directory'); // Or just return to not reload homepage without filters
    }
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
          <svg className="icon" aria-hidden="true"><use href="/icons/sprite.svg#icon-search"></use></svg>
          <div>
            <label htmlFor="search-query">What do you need?</label>
            <input 
              id="search-query"
              name="q"
              placeholder="Bridal designer, stylist, tailor..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-field">
          <svg className="icon" aria-hidden="true"><use href="/icons/sprite.svg#icon-pin"></use></svg>
          <div>
            <label htmlFor="search-city">Location</label>
            <select id="search-city" name="city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All cities</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="benin-city">Benin City</option>
              <option value="port-harcourt">Port Harcourt</option>
              <option value="kano">Kano</option>
              <option value="enugu">Enugu</option>
            </select>
          </div>
        </div>
        <button className="search-submit" aria-label="Search directory" type="submit">
          <svg className="icon" aria-hidden="true"><use href="/icons/sprite.svg#icon-search"></use></svg>
        </button>
      </div>
    </form>
  );
}

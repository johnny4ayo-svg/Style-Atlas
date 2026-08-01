"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: 'Designers', href: '/directory' },
  { label: 'Brands', href: '/directory' },
  { label: 'Schools', href: '/directory' },
  { label: 'Professionals', href: '/directory' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Events', href: '/events' },
  { label: 'Inspiration', href: '/article' }
];

export function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 160);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Icon = ({ name, cls = "" }: { name: string; cls?: string }) => (
    <svg className={`icon ${cls}`} aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <>
      <header className={`site-header ${isSticky ? "is-sticky" : ""}`} id="siteHeader">
        <div className="utility-bar">
          <div className="container utility-inner">
            <span>Curated Nigerian fashion, mapped with purpose.</span>
            <div className="utility-links">
              <Link href="/about">About</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/help">Help centre</Link>
            </div>
          </div>
        </div>
        <div className="container header-main">
          <Link href="/" className="header-logo" aria-label="STYLEATLAS home">
            <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={235} height={40} priority />
          </Link>
          <nav className="main-nav" aria-label="Primary navigation">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              if (index < 4) {
                return (
                  <div className="nav-item" key={item.label}>
                    <Link href={item.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                      {item.label}
                      <Icon name="chevron" />
                    </Link>
                    <div className="mega-menu">
                      <div className="mega-col">
                        <h4>Discover</h4>
                        <Link href="/directory">Featured {item.label}</Link>
                        <Link href="/directory">Verified profiles</Link>
                        <Link href="/directory">Newly listed</Link>
                        <Link href="/directory">Most reviewed</Link>
                      </div>
                      <div className="mega-col">
                        <h4>Popular searches</h4>
                        <Link href="/directory">Bridal specialists</Link>
                        <Link href="/directory">Luxury ready-to-wear</Link>
                        <Link href="/directory">Menswear in Lagos</Link>
                        <Link href="/directory">Fashion schools in Abuja</Link>
                      </div>
                      <Link className="mega-promo" href="/directory" aria-label="Explore Nigerian craft"></Link>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.label} className={`nav-link ${isActive ? 'active' : ''}`} href={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Search"><Icon name="search" /></button>
            <Link className="icon-btn" href="/saved" aria-label="Saved profiles"><Icon name="heart" /><span className="count">0</span></Link>
            <Link className="icon-btn" href="/login" aria-label="Account"><Icon name="user" /></Link>
            <Link className="header-cta" href="/add-business">Add your business <Icon name="arrow" /></Link>
            <button className="icon-btn mobile-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <aside className={`mobile-panel ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-panel-top">
          <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={180} height={30} />
          <button className="icon-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
        </div>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.label}<Icon name="arrow" /></Link>
          ))}
        </nav>
        <div className="mobile-actions">
          <Link className="btn btn-gold" href="/add-business" onClick={() => setIsMobileMenuOpen(false)}>Add your business</Link>
          <Link className="btn btn-outline-light" href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in or sign up</Link>
        </div>
      </aside>
    </>
  );
}

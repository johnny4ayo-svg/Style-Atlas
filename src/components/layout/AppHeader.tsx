"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: 'Find Professionals', href: '/directory' },
  { label: 'Brands', href: '/directory?category=brands' },
  { label: 'Schools', href: '/directory?category=schools' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Journal', href: '/journal' },
  { label: 'Explore', href: '/directory' },
  { label: 'For Business', href: '/add-business' }
];

export function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Focus would be handled by refs ideally, omitting for simplicity
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const Icon = ({ name, cls = "" }: { name: string; cls?: string }) => (
    <svg className={`icon ${cls}`} aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <>
      <header className={`site-header ${isSticky ? "is-sticky" : ""}`} id="siteHeader" onMouseLeave={() => setActiveMegaMenu(null)}>
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
        <div className="container header-main" style={{ position: 'relative' }}>
          <Link href="/" className="header-logo" aria-label="STYLEATLAS home">
            <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={235} height={40} priority />
          </Link>
          <nav className="main-nav" aria-label="Primary navigation">
            {navItems.map((item, index) => {
              // Only consider the item active by default if the pathname matches
              // Note: since some hrefs include search params now, we split by '?' to compare the base path.
              const basePath = item.href.split('?')[0];
              const isActive = pathname === basePath && (basePath !== '/directory' || index === 0);
              const hasMegaMenu = item.label === 'Find Professionals' || item.label === 'Brands';
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const isSimpleDropdown = (item as any).isDropdown;
              
              return (
                <div 
                  className="nav-item" 
                  key={item.label}
                  onMouseEnter={() => (hasMegaMenu || isSimpleDropdown) ? setActiveMegaMenu(item.label) : setActiveMegaMenu(null)}
                  onFocus={() => (hasMegaMenu || isSimpleDropdown) ? setActiveMegaMenu(item.label) : setActiveMegaMenu(null)}
                >
                  <Link href={item.href} className={`nav-link ${isActive ? 'active' : ''}`} onClick={(e) => isSimpleDropdown && e.preventDefault()}>
                    {item.label}
                    {(hasMegaMenu || isSimpleDropdown) && <Icon name="chevron" />}
                  </Link>
                  
                  {isSimpleDropdown && (
                    <AnimatePresence>
                      {activeMegaMenu === item.label && (
                        <motion.div 
                          className="dropdown-menu"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '150px' }}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {((item as any).subItems || []).map((sub: any) => (
                            <Link key={sub.label} href={sub.href} style={{ color: '#111', fontWeight: 500 }}>{sub.label}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {hasMegaMenu && (
                    <AnimatePresence>
                      {activeMegaMenu === item.label && (
                        <motion.div 
                          className="mega-menu"
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{ display: 'grid' }}
                        >
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
                          <Link className="mega-promo" href="/directory" aria-label="Explore Nigerian craft" style={{ overflow: 'hidden' }}>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%', backgroundImage: 'url(/images/designer-blue.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Search"><Icon name="search" /></button>
            <Link className="icon-btn" href="/saved" aria-label="Saved profiles"><Icon name="heart" /><span className="count">0</span></Link>
            <Link className="icon-btn" href="/cart" aria-label="Cart"><Icon name="bag" />{cartCount > 0 && <span className="count">{cartCount}</span>}</Link>
            <Link className="icon-btn" href="/login" aria-label="Account"><Icon name="user" /></Link>
            <Link className="btn btn-gold" href="/add-business" style={{ padding: '0 24px', height: '44px', display: 'flex', alignItems: 'center', borderRadius: '24px', fontWeight: 600, fontSize: '14px' }}>List your business</Link>
            <button className="icon-btn mobile-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999 }}
            />
            <motion.aside 
              className="mobile-panel open"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              aria-hidden={!isMobileMenuOpen}
              style={{ display: 'block', visibility: 'visible' }}
            >
              <div className="mobile-panel-top">
                <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={180} height={30} />
                <button className="icon-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
              </div>
              <nav className="mobile-nav">
                <Link href="/directory" onClick={() => setIsMobileMenuOpen(false)}>Find Professionals<Icon name="arrow" /></Link>
                <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)}>Marketplace<Icon name="arrow" /></Link>
                <Link href="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs<Icon name="arrow" /></Link>
                <Link href="/directory?category=schools" onClick={() => setIsMobileMenuOpen(false)}>Schools<Icon name="arrow" /></Link>
                <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>Events<Icon name="arrow" /></Link>
                <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)}>Journal<Icon name="arrow" /></Link>
                <Link href="/saved" onClick={() => setIsMobileMenuOpen(false)}>Saved profiles<Icon name="heart" /></Link>
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>Shopping cart {cartCount > 0 && `(${cartCount})`}<Icon name="bag" /></Link>
              </nav>
              <div className="mobile-actions">
                <Link className="btn btn-gold" href="/add-business" onClick={() => setIsMobileMenuOpen(false)}>List Your Business</Link>
                <Link className="text-link" href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontWeight: 600 }}>Account</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

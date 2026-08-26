"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (section: string) => {
    if (!isMobile) return;
    setOpenSection(openSection === section ? null : section);
  };

  const isSectionOpen = (section: string) => !isMobile || openSection === section;

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={180} height={30} />
          <p>Nigeria&apos;s premium fashion discovery platform for trusted designers, brands, schools and creative professionals.</p>
          <div className="socials">
            {siteConfig.socials.instagram && (
              <Link className="social" href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</Link>
            )}
            {siteConfig.socials.tiktok && (
              <Link className="social" href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">TT</Link>
            )}
            {siteConfig.socials.youtube && (
              <Link className="social" href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</Link>
            )}
            {siteConfig.socials.linkedin && (
              <Link className="social" href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</Link>
            )}
          </div>
        </div>
        
        <div className="footer-col">
          <h4 onClick={() => toggleSection('directory')} style={{ cursor: isMobile ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Directory {isMobile && <span>{isSectionOpen('directory') ? '−' : '+'}</span>}
          </h4>
          {isSectionOpen('directory') && (
            <div className="footer-col-links">
              <Link href="/directory?category=designers">Designers</Link>
              <Link href="/directory?category=brands">Brands</Link>
              <Link href="/directory?category=stylists">Stylists</Link>
              <Link href="/directory?category=schools">Schools</Link>
              <Link href="/directory?category=photographers">Photographers</Link>
              <Link href="/directory?category=tailors">Tailors</Link>
            </div>
          )}
        </div>

        <div className="footer-col">
          <h4 onClick={() => toggleSection('explore')} style={{ cursor: isMobile ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Explore {isMobile && <span>{isSectionOpen('explore') ? '−' : '+'}</span>}
          </h4>
          {isSectionOpen('explore') && (
            <div className="footer-col-links">
              <Link href="/marketplace">Marketplace</Link>
              <Link href="/jobs">Fashion jobs</Link>
              <Link href="/events">Events</Link>
              <Link href="/journal">Journal</Link>
            </div>
          )}
        </div>

        <div className="footer-col">
          <h4 onClick={() => toggleSection('business')} style={{ cursor: isMobile ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            For business {isMobile && <span>{isSectionOpen('business') ? '−' : '+'}</span>}
          </h4>
          {isSectionOpen('business') && (
            <div className="footer-col-links">
              <Link href="/add-business">Add a listing</Link>
              <Link href="/pricing">Membership plans</Link>
              <Link href="/dashboard">Business dashboard</Link>
              <Link href="/verification">Get verified</Link>
            </div>
          )}
        </div>

        <div className="footer-col">
          <h4>Stay in style</h4>
          <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '16px' }}>Get launch updates, new verified profiles, jobs, events and STYLEATLAS stories.</p>
          <form className="newsletter" style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="newsletter-email" style={{ fontSize: '12px', fontWeight: 'bold' }}>Email address</label>
            <div style={{ display: 'flex', width: '100%' }}>
              <input type="email" id="newsletter-email" name="email" autoComplete="email" required placeholder="Enter your email" aria-label="Email address" style={{ flexGrow: 1, padding: '10px' }} />
              <button type="submit" style={{ padding: '10px 16px' }}>Subscribe</button>
            </div>
          </form>
          <div className="footer-col-links">
            <Link href="/about">About STYLEATLAS</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/help">Help centre</Link>
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} STYLEATLAS. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
        </div>
      </div>
    </footer>
  );
}

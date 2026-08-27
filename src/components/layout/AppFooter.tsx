"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (section: string) => {
    if (!isMobile) return;
    setOpenSection(openSection === section ? null : section);
  };


  return (
    <footer className="site-footer" style={{ padding: '48px 20px 24px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-groups {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2rem;
        }
        .footer-newsletter-form {
          display: flex;
          gap: 8px;
        }
        .footer-newsletter-form input { flex-grow: 1; padding: 10px; min-height: 48px; }
        .footer-newsletter-form button { padding: 10px 16px; min-height: 48px; }
        
        @media (max-width: 767px) {
          .site-footer { padding: 48px 20px 24px !important; }
          .footer-brand { margin-bottom: 32px; }
          .footer-groups {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .footer-group {
            width: 100%;
            border-bottom: 1px solid rgba(255,255,255,.12);
          }
          .footer-group-trigger {
            width: 100%;
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0;
            background: transparent;
            color: inherit;
            border: none;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
          .footer-group-trigger:focus-visible { outline: 2px solid var(--gold); outline-offset: -2px; }
          .footer-group-content { padding: 0 0 20px; display: flex; flex-direction: column; gap: 12px; }
          .footer-newsletter { width: 100%; margin-top: 32px; }
          .footer-bottom { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.12); }
        }

        @media (max-width: 359px) {
          .footer-newsletter-form {
            flex-direction: column;
            gap: 12px;
          }
          .footer-newsletter-form input,
          .footer-newsletter-form button {
            width: 100%;
          }
        }
      ` }} />
      <div className="container">
        <div className="footer-brand" style={{ marginBottom: isMobile ? '32px' : '48px' }}>
          <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={180} height={30} style={{ marginBottom: '20px' }} />
          <p style={{ marginBottom: '20px', maxWidth: '400px' }}>Nigeria&apos;s premium fashion discovery platform for trusted designers, brands, schools and creative professionals.</p>
          <div className="socials" style={{ display: 'flex', gap: '16px' }}>
            {siteConfig.socials?.instagram && (
              <a href={siteConfig.socials.instagram} aria-label="STYLEATLAS on Instagram" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>IG</a>
            )}
            {siteConfig.socials?.tiktok && (
              <a href={siteConfig.socials.tiktok} aria-label="STYLEATLAS on TikTok" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>TT</a>
            )}
            {siteConfig.socials?.youtube && (
              <a href={siteConfig.socials.youtube} aria-label="STYLEATLAS on YouTube" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>YT</a>
            )}
            {siteConfig.socials?.linkedin && (
              <a href={siteConfig.socials.linkedin} aria-label="STYLEATLAS on LinkedIn" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>IN</a>
            )}
          </div>
        </div>

        <div className="footer-groups">
          <div className="footer-group">
            {isMobile ? (
              <button
                type="button"
                className="footer-group-trigger"
                aria-expanded={openSection === 'directory'}
                aria-controls="footer-directory-links"
                onClick={() => toggleSection('directory')}
              >
                <span>Directory</span>
                <span aria-hidden="true">{openSection === 'directory' ? '−' : '+'}</span>
              </button>
            ) : (
              <h4 style={{ marginBottom: '20px' }}>Directory</h4>
            )}
            <div id="footer-directory-links" className="footer-group-content" hidden={isMobile && openSection !== 'directory'}>
              <Link href="/directory?category=designers" style={{ opacity: 0.7, textDecoration: 'none' }}>Designers</Link>
              <Link href="/directory?category=brands" style={{ opacity: 0.7, textDecoration: 'none' }}>Brands</Link>
              <Link href="/directory?category=stylists" style={{ opacity: 0.7, textDecoration: 'none' }}>Stylists</Link>
              <Link href="/directory?category=schools" style={{ opacity: 0.7, textDecoration: 'none' }}>Schools</Link>
              <Link href="/directory?category=photographers" style={{ opacity: 0.7, textDecoration: 'none' }}>Photographers</Link>
              <Link href="/directory?category=tailors" style={{ opacity: 0.7, textDecoration: 'none' }}>Tailors</Link>
            </div>
          </div>

          <div className="footer-group">
            {isMobile ? (
              <button
                type="button"
                className="footer-group-trigger"
                aria-expanded={openSection === 'explore'}
                aria-controls="footer-explore-links"
                onClick={() => toggleSection('explore')}
              >
                <span>Explore</span>
                <span aria-hidden="true">{openSection === 'explore' ? '−' : '+'}</span>
              </button>
            ) : (
              <h4 style={{ marginBottom: '20px' }}>Explore</h4>
            )}
            <div id="footer-explore-links" className="footer-group-content" hidden={isMobile && openSection !== 'explore'}>
              <Link href="/marketplace" style={{ opacity: 0.7, textDecoration: 'none' }}>Marketplace</Link>
              <Link href="/jobs" style={{ opacity: 0.7, textDecoration: 'none' }}>Fashion jobs</Link>
              <Link href="/events" style={{ opacity: 0.7, textDecoration: 'none' }}>Events</Link>
              <Link href="/journal" style={{ opacity: 0.7, textDecoration: 'none' }}>Journal</Link>
            </div>
          </div>

          <div className="footer-group">
            {isMobile ? (
              <button
                type="button"
                className="footer-group-trigger"
                aria-expanded={openSection === 'business'}
                aria-controls="footer-business-links"
                onClick={() => toggleSection('business')}
              >
                <span>For business</span>
                <span aria-hidden="true">{openSection === 'business' ? '−' : '+'}</span>
              </button>
            ) : (
              <h4 style={{ marginBottom: '20px' }}>For business</h4>
            )}
            <div id="footer-business-links" className="footer-group-content" hidden={isMobile && openSection !== 'business'}>
              <Link href="/add-business" style={{ opacity: 0.7, textDecoration: 'none' }}>Add a listing</Link>
              <Link href="/pricing" style={{ opacity: 0.7, textDecoration: 'none' }}>Membership plans</Link>
              <Link href="/dashboard" style={{ opacity: 0.7, textDecoration: 'none' }}>Business dashboard</Link>
              <Link href="/verification" style={{ opacity: 0.7, textDecoration: 'none' }}>Get verified</Link>
            </div>
          </div>

          <div className="footer-group">
            {isMobile ? (
              <button
                type="button"
                className="footer-group-trigger"
                aria-expanded={openSection === 'company'}
                aria-controls="footer-company-links"
                onClick={() => toggleSection('company')}
              >
                <span>Company</span>
                <span aria-hidden="true">{openSection === 'company' ? '−' : '+'}</span>
              </button>
            ) : (
              <h4 style={{ marginBottom: '20px' }}>Company</h4>
            )}
            <div id="footer-company-links" className="footer-group-content" hidden={isMobile && openSection !== 'company'}>
              <Link href="/about" style={{ opacity: 0.7, textDecoration: 'none' }}>About STYLEATLAS</Link>
              <Link href="/contact" style={{ opacity: 0.7, textDecoration: 'none' }}>Contact</Link>
              <Link href="/help" style={{ opacity: 0.7, textDecoration: 'none' }}>Help centre</Link>
            </div>
          </div>
        </div>

        <div className="footer-newsletter">
          <section id="newsletter-email" aria-labelledby="newsletter-heading">
            <h4 id="newsletter-heading" style={{ marginBottom: '8px' }}>Stay in style</h4>
            <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '24px' }}>Get Nigerian fashion stories, events and opportunities in your inbox.</p>
            <form className="footer-newsletter-form">
              <input type="email" id="email-input-footer" name="email" autoComplete="email" required placeholder="Email address" aria-label="Email address" />
              <button type="submit" className="btn btn-gold">Subscribe</button>
            </form>
          </section>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', opacity: 0.7 }}>© {new Date().getFullYear()} STYLEATLAS. All rights reserved.</span>
            <div className="footer-bottom-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
              <Link href="/privacy" style={{ opacity: 0.7, textDecoration: 'none' }}>Privacy</Link>
              <Link href="/terms" style={{ opacity: 0.7, textDecoration: 'none' }}>Terms</Link>
              <Link href="/accessibility" style={{ opacity: 0.7, textDecoration: 'none' }}>Accessibility</Link>
              <Link href="/editorial-policy" style={{ opacity: 0.7, textDecoration: 'none' }}>Editorial policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

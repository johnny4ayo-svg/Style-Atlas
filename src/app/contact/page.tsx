import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact STYLEATLAS",
  description: "Get in touch with the STYLEATLAS team for support, partnerships, or general enquiries.",
  alternates: {
    canonical: '/contact'
  },
  openGraph: {
    url: '/contact'
  }
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Contact</span>
            </div>
            <h1 className="page-title">Get in touch</h1>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'start' }} className="contact-grid">
            <div className="contact-info">
              <h3>Support Details</h3>
              <p style={{ marginTop: '16px', marginBottom: '8px' }}><strong>Email:</strong><br /><a href="mailto:support@thestyleatlas.com">support@thestyleatlas.com</a></p>
              <p style={{ marginBottom: '8px' }}><strong>Operating Hours:</strong><br />Monday - Friday<br />9:00 AM - 5:00 PM WAT</p>
              
              <h3 style={{ marginTop: '32px' }}>Office</h3>
              <p style={{ marginTop: '16px' }}>Lagos, Nigeria</p>
            </div>
            
            <div className="contact-form-wrapper">
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </main>
  );
}

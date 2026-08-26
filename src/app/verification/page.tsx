import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How STYLEATLAS Verification Works",
  description: "Learn about our editorial review process and what it takes to become a verified fashion professional on STYLEATLAS.",
  alternates: {
    canonical: '/verification'
  },
  openGraph: {
    url: '/verification'
  }
};


export default function VerificationPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Verification</span>
            </div>
            <span className="eyebrow light">Trust & Safety</span>
            <h1 className="page-title">The STYLEATLAS Verification Process</h1>
            <p>How we ensure you are working with genuine, professional fashion talent in Nigeria.</p>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="prose" style={{ maxWidth: '800px' }}>
            <h2>Building a High-Trust Directory</h2>
            <p>
              The Nigerian fashion industry is incredibly vibrant, but finding reliable, authentic talent can be challenging. 
              The STYLEATLAS verification badge <svg className="icon" style={{ display: 'inline', color: '#c69a52', width: '20px', height: '20px' }}><use href="/icons/sprite.svg#icon-verified"></use></svg> indicates that a business has undergone our manual review process.
            </p>
            
            <h3>What Verification Means</h3>
            <ul>
              <li><strong>Identity verified:</strong> The business is operated by a real person or registered entity.</li>
              <li><strong>Portfolio authentic:</strong> The images displayed represent their actual work.</li>
              <li><strong>Contact information valid:</strong> Phone numbers, email addresses, and studio locations have been verified.</li>
            </ul>

            <h3>How Businesses Get Verified</h3>
            <p>When a professional claims their profile or upgrades to a premium plan, they submit supporting documents (such as CAC registration, ID, and social links). Our team reviews these manually before awarding the verification badge.</p>

            <div style={{ marginTop: '40px', padding: '24px', background: 'var(--ivory-2)', borderRadius: '12px' }}>
              <h4>Are you a fashion professional?</h4>
              <p>Apply for verification from your dashboard to build trust with prospective clients.</p>
              <Link href="/add-business" className="btn btn-dark" style={{ marginTop: '16px' }}>Apply for Verification</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

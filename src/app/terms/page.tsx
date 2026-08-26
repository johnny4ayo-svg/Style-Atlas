import Link from "next/link";

export default function TermsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <h1 className="page-title">Terms of Service</h1>
            <p>Last updated: August 2026</p>
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container prose" style={{ maxWidth: '800px' }}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using STYLEATLAS, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
          
          <h2>2. User Accounts</h2>
          <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You must provide accurate and complete information when creating an account.</p>
          
          <h2>3. Marketplace and Escrow</h2>
          <p>STYLEATLAS provides a platform for fashion professionals to showcase and sell their services and products. All payments made through the platform are subject to our Escrow terms. STYLEATLAS is not a party to the contract between the buyer and the seller.</p>
          
          <h2>4. Content</h2>
          <p>You retain all your rights to any content you submit, post or display on or through the Service. By submitting, posting or displaying content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content.</p>
        </div>
      </section>
    </main>
  );
}

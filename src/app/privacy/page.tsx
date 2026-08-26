import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <h1 className="page-title">Privacy Policy</h1>
            <p>Last updated: August 2026</p>
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container prose" style={{ maxWidth: '800px' }}>
          <h2>1. Introduction</h2>
          <p>At STYLEATLAS, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data when you use our platform.</p>
          
          <h2>2. Data We Collect</h2>
          <p>We collect information you provide directly to us (such as account details and messages), data collected automatically (such as usage metrics), and information from third parties (such as payment processors).</p>
          
          <h2>3. How We Use Your Data</h2>
          <p>Your data is used to provide and improve our services, facilitate communication between clients and designers, process payments (via Escrow), and for security purposes.</p>
          
          <h2>4. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with service providers necessary for our operations, or if required by Nigerian law.</p>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | STYLEATLAS",
  description: "Read the STYLEATLAS privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: '/privacy'
  },
  openGraph: {
    url: '/privacy'
  }
};



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
          <p>We collect information you provide directly to us (such as account details, directory listings, and support messages), data collected automatically (such as analytics usage metrics), and information related to your business applications and newsletter subscriptions.</p>
          
          <h2>3. How We Use Your Data</h2>
          <p>Your data is used to provide and improve our services, facilitate communication and discovery through our directory, manage your profile, and ensure platform security.</p>
          
          <h2>4. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with service providers necessary for our operations, or if required by Nigerian law.</p>
          
          <h2>5. Marketplace and Escrow Services</h2>
          <p>STYLEATLAS does not currently process marketplace payments or provide escrow services. If these services are introduced, the applicable payment, refund and escrow privacy terms will be published before they become available.</p>
        </div>
      </section>
    </main>
  );
}

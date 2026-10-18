import "../inner-premium.css";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Plans for Fashion Businesses | STYLEATLAS",
  description: "View membership plans and pricing for fashion professionals on STYLEATLAS. Choose the plan that fits your business needs.",
  alternates: {
    canonical: '/pricing'
  },
  openGraph: {
    url: '/pricing'
  }
};

export default async function PricingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="atlas-inner"><div className="container" style={{ paddingTop: '80px', paddingBottom: '90px' }}>
      <div className="atlas-inner-intro">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>For Professionals</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Grow your fashion business.</h1>
        <p className="muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Build a stronger professional presence, present your portfolio and make it easier for prospective clients to discover your work.
        </p>
      </div>

      <div className="atlas-inner-note" style={{ marginBottom: '42px' }}>
        <strong>Important Notice:</strong> Paid enrolment is currently being prepared. You can join the waitlist for premium features, but upgrades are currently disabled. Marketplace payments and escrow services are not currently available. Their terms will be published before the marketplace launches.
      </div>

      <div className="atlas-inner-plans" style={{ marginBottom: '64px' }}>
        {/* Basic Tier */}
        <div className="dashboard-card atlas-inner-plan" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3>Basic</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>Free</div>
          <p className="muted" style={{ marginBottom: '24px' }}>A straightforward way to introduce your business and its services.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Basic directory listing</li>
            <li>✓ Receive quote requests</li>
            <li>✓ Up to 10 portfolio images</li>
          </ul>
          <Link href={user ? "/dashboard/business" : "/add-business"} className="btn btn-outline-dark" style={{ marginTop: 'auto', textAlign: 'center' }}>
            {user ? "Manage your business" : "Create your free listing"}
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="dashboard-card atlas-inner-plan" style={{ padding: '32px', display: 'flex', flexDirection: 'column', border: '2px solid var(--gold)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>PLANNED</div>
          <h3>Pro</h3>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '16px 0' }}>Planned launch price: ₦15,000/month</div>
          <p className="muted" style={{ marginBottom: '24px' }}>Additional visibility features planned for a future launch.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>Planned for launch: Priority directory ranking</li>
            <li>Planned for launch: Unlimited portfolio images</li>
            <li>Planned for launch: Early access to new features</li>
          </ul>
          <Link href="/contact?category=membership-interest" className="btn btn-gold" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }}>
            Enquire about launch
          </Link>
        </div>

        {/* Premium Tier */}
        <div className="dashboard-card atlas-inner-plan" style={{ padding: '32px', display: 'flex', flexDirection: 'column', background: '#111', color: '#fff' }}>
          <h3 style={{ color: '#fff' }}>Premium</h3>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '16px 0' }}>Planned launch price: ₦45,000/month</div>
          <p style={{ color: '#aaa', marginBottom: '24px' }}>An expanded visibility package planned for established brands.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>Planned for launch: Everything in Pro</li>
            <li>Planned for launch: Priority homepage placement</li>
          </ul>
          <Link href="/#newsletter-email" className="btn btn-outline-light" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }}>
            Join the waitlist
          </Link>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
        <h3 style={{ marginBottom: '24px' }}>Pricing Disclosures</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', fontSize: '14px', lineHeight: '1.6' }}>
          <div>
            <strong>Billing & VAT</strong>
            <p>Paid enrolment is not yet available. Final terms regarding billing cycles and VAT treatment will be published before enrolment opens.</p>
          </div>
          <div>
            <strong>Cancellation & Refunds</strong>
            <p>Final terms for cancellation, downgrade policies, and refunds will be published alongside our full membership terms before launch.</p>
          </div>
          <div>
            <strong>After Cancellation</strong>
            <p>If you cancel a paid plan after launch, your account will downgrade to the Basic tier. Any portfolio images above the Basic limit (10) will be hidden until you upgrade again.</p>
          </div>
          <div>
            <strong>Marketplace & Verification</strong>
            <p>A paid subscription does not guarantee profile verification or marketplace approval. All accounts are subject to our standard editorial review and verification procedures.</p>
          </div>
        </div>
      </div>
    </div></main>
  );
}

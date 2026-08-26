import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Plans for Fashion Businesses | STYLEATLAS",
  description: "Choose the plan that fits your needs. Reach more clients and showcase your portfolio to our verified audience.",
};

export default async function PricingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>For Professionals</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Grow your fashion business.</h1>
        <p className="muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Choose the plan that fits your needs. Reach more clients and showcase your portfolio to our verified audience.
        </p>
      </div>

      <div style={{ padding: '16px', background: 'var(--ivory-2)', borderRadius: '8px', marginBottom: '40px', textAlign: 'center' }}>
        <strong>Important Notice:</strong> Paid enrolment is currently being prepared. You can join the waitlist for premium features, but upgrades are currently disabled. Marketplace payments and escrow services are not currently available. Their terms will be published before the marketplace launches.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '64px' }}>
        {/* Basic Tier */}
        <div className="dashboard-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3>Basic</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>Free</div>
          <p className="muted" style={{ marginBottom: '24px' }}>Perfect for getting started and listing your services.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Basic directory listing</li>
            <li>✓ Receive quote requests</li>
            <li>✓ Up to 10 portfolio images</li>
          </ul>
          <Link href={user ? "/dashboard/business" : "/login"} className="btn btn-outline-dark" style={{ marginTop: 'auto', textAlign: 'center' }}>
            {user ? "Current Plan" : "Get Started"}
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="dashboard-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', border: '2px solid var(--gold)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>RECOMMENDED</div>
          <h3>Pro</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>₦15,000<span style={{ fontSize: '1rem', color: 'var(--muted)' }}>/mo (excl. VAT)</span></div>
          <p className="muted" style={{ marginBottom: '24px' }}>Everything you need to run a professional fashion business.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Priority directory ranking</li>
            <li>✓ Unlimited portfolio images</li>
            <li>✓ Early access to new features</li>
          </ul>
          <button type="button" className="btn btn-gold" disabled style={{ marginTop: 'auto', width: '100%', opacity: 0.7, cursor: 'not-allowed' }}>
            Paid Enrolment Opening Soon
          </button>
        </div>

        {/* Premium Tier */}
        <div className="dashboard-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', background: '#111', color: '#fff' }}>
          <h3 style={{ color: '#fff' }}>Premium</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>₦45,000<span style={{ fontSize: '1rem', color: '#888' }}>/mo (excl. VAT)</span></div>
          <p style={{ color: '#aaa', marginBottom: '24px' }}>For established brands running high-volume sales.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Everything in Pro</li>
            <li>✓ Priority homepage placement</li>
          </ul>
          <button type="button" className="btn btn-outline-dark" disabled style={{ marginTop: 'auto', width: '100%', borderColor: '#333', color: '#fff', opacity: 0.7, cursor: 'not-allowed' }}>
            Paid Enrolment Opening Soon
          </button>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
        <h3 style={{ marginBottom: '24px' }}>Pricing Disclosures</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', fontSize: '14px', lineHeight: '1.6' }}>
          <div>
            <strong>Billing & VAT</strong>
            <p>All paid plans are billed monthly. Displayed amounts exclude 7.5% Nigerian VAT, which will be added at checkout. Subscriptions renew automatically unless cancelled.</p>
          </div>
          <div>
            <strong>Cancellation & Refunds</strong>
            <p>You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. We do not offer partial refunds for mid-cycle cancellations.</p>
          </div>
          <div>
            <strong>After Cancellation</strong>
            <p>If you cancel a paid plan, your account will downgrade to the Basic tier. Any portfolio images above the Basic limit (10) will be hidden until you upgrade again.</p>
          </div>
          <div>
            <strong>Marketplace & Verification</strong>
            <p>A paid subscription does not guarantee profile verification or marketplace approval. All accounts are subject to our standard editorial review and verification procedures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

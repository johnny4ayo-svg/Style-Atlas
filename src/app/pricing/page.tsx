import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createSubscription } from "@/app/actions/subscription-actions";

export default async function PricingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>For Professionals</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Grow your fashion business.</h1>
        <p className="muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Choose the plan that fits your needs. Reach more clients, showcase your portfolio, and manage bespoke orders securely with Escrow.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {/* Basic Tier */}
        <div className="dashboard-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3>Basic</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>Free</div>
          <p className="muted" style={{ marginBottom: '24px' }}>Perfect for getting started and listing your services.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Basic directory listing</li>
            <li>✓ Receive quote requests</li>
            <li>✓ Up to 10 portfolio images</li>
            <li className="muted" style={{ textDecoration: 'line-through' }}>Escrow payments</li>
            <li className="muted" style={{ textDecoration: 'line-through' }}>Advanced analytics</li>
          </ul>
          <Link href={user ? "/dashboard/business" : "/login"} className="btn btn-outline-dark" style={{ marginTop: 'auto', textAlign: 'center' }}>
            {user ? "Current Plan" : "Get Started"}
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="dashboard-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', border: '2px solid var(--gold)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>RECOMMENDED</div>
          <h3>Pro</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>₦15,000<span style={{ fontSize: '1rem', color: 'var(--muted)' }}>/mo</span></div>
          <p className="muted" style={{ marginBottom: '24px' }}>Everything you need to run a professional fashion business.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Priority directory ranking</li>
            <li>✓ Unlimited portfolio images</li>
            <li>✓ Escrow payments integration</li>
            <li>✓ Advanced analytics dashboard</li>
            <li className="muted" style={{ textDecoration: 'line-through' }}>Custom domain mapping</li>
          </ul>
          <form action={createSubscription} style={{ marginTop: 'auto', width: '100%' }}>
            <input type="hidden" name="tier" value="pro" />
            <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
              Upgrade to Pro
            </button>
          </form>
        </div>

        {/* Premium Tier */}
        <div className="dashboard-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', background: '#111', color: '#fff' }}>
          <h3 style={{ color: '#fff' }}>Premium</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>₦45,000<span style={{ fontSize: '1rem', color: '#888' }}>/mo</span></div>
          <p style={{ color: '#aaa', marginBottom: '24px' }}>For established brands running high-volume sales.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>✓ Everything in Pro</li>
            <li>✓ Priority homepage placement</li>
            <li>✓ Dedicated account manager</li>
            <li>✓ Custom domain mapping</li>
            <li>✓ Reduced Escrow fees (1.5%)</li>
          </ul>
          <form action={createSubscription} style={{ marginTop: 'auto', width: '100%' }}>
            <input type="hidden" name="tier" value="premium" />
            <button type="submit" className="btn btn-outline-dark" style={{ width: '100%', borderColor: '#333', color: '#fff' }}>
              Upgrade to Premium
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

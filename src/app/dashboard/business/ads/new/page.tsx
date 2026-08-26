import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createAdCampaign } from "@/app/actions/ad-actions";
import Link from "next/link";

export default async function NewAdCampaign() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <>
      <div className="dashboard-top">
        <div>
          <Link href="/dashboard/business/ads" className="text-link" style={{ fontSize: '12px', marginBottom: '8px', display: 'inline-block' }}>
            ← Back to Ads
          </Link>
          <h1>Create New Campaign</h1>
          <p className="muted" style={{ fontSize: '14px', marginTop: '4px' }}>
            Select what you want to promote and for how long.
          </p>
        </div>
      </div>

      <section className="dashboard-grid" style={{ maxWidth: '1000px' }}>
        <article className="dashboard-card" style={{ gridColumn: '1 / -1', padding: '32px' }}>
          <form action={createAdCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div>
              <label htmlFor="target_type" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>What would you like to promote?</label>
              <select 
                id="target_type" 
                name="target_type" 
                className="input-field" 
                style={{ width: '100%', maxWidth: '600px', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
                required
              >
                <option value="profile">My Business Profile (Directory placement)</option>
                <option value="product" disabled>Specific Product (Coming Soon)</option>
                <option value="event" disabled>Upcoming Event (Coming Soon)</option>
              </select>
              <p className="muted" style={{ fontSize: '12px', marginTop: '8px' }}>
                Promoting your profile will pin your business to the top of search results and category pages.
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '16px', fontWeight: 600 }}>Select Package</label>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {/* Basic Boost */}
                <label style={{ display: 'flex', flexDirection: 'column', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '12px', cursor: 'pointer', background: 'var(--bg-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <input type="radio" name="package_tier" value="basic" defaultChecked style={{ marginRight: '12px' }} />
                    <strong style={{ fontSize: '18px' }}>Basic Boost</strong>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '24px', display: 'block' }}>₦5,000</strong>
                    <span className="muted" style={{ fontSize: '12px' }}>for 7 Days</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--muted)' }}>
                    <li>✓ Standard directory placement</li>
                    <li>✓ Category page visibility</li>
                  </ul>
                </label>

                {/* Premium Spotlight */}
                <label style={{ display: 'flex', flexDirection: 'column', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '12px', cursor: 'pointer', background: 'var(--bg-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <input type="radio" name="package_tier" value="premium" style={{ marginRight: '12px' }} />
                    <strong style={{ fontSize: '18px' }}>Premium Spotlight</strong>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '24px', display: 'block' }}>₦15,000</strong>
                    <span className="muted" style={{ fontSize: '12px' }}>for 14 Days</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--muted)' }}>
                    <li>✓ Higher ranking in search</li>
                    <li>✓ Highlighted border in directory</li>
                    <li>✓ Top of category pages</li>
                  </ul>
                </label>

                {/* Enterprise Featured */}
                <label style={{ display: 'flex', flexDirection: 'column', padding: '24px', border: '2px solid var(--gold)', borderRadius: '12px', cursor: 'pointer', background: 'rgba(212, 163, 115, 0.05)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '16px', background: 'var(--gold)', color: '#000', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
                    MAX VISIBILITY
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <input type="radio" name="package_tier" value="enterprise" style={{ marginRight: '12px' }} />
                    <strong style={{ fontSize: '18px' }}>Enterprise Featured</strong>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '24px', display: 'block' }}>₦30,000</strong>
                    <span className="muted" style={{ fontSize: '12px' }}>for 30 Days</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--muted)' }}>
                    <li>✓ Homepage featured section</li>
                    <li>✓ Newsletter inclusion</li>
                    <li>✓ Social media shoutout</li>
                  </ul>
                </label>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '8px', maxWidth: '600px' }}>
              <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                Proceed to Payment
              </button>
              <p className="muted" style={{ fontSize: '11px', textAlign: 'center', marginTop: '12px' }}>
                You will be redirected to Paystack to complete your payment securely. Your campaign will become active immediately after successful payment.
              </p>
            </div>
          </form>
        </article>
      </section>
    </>
  );
}

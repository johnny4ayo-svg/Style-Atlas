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

      <section className="dashboard-grid" style={{ maxWidth: '600px' }}>
        <article className="dashboard-card" style={{ gridColumn: '1 / -1', padding: '32px' }}>
          <form action={createAdCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div>
              <label htmlFor="target_type" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>What would you like to promote?</label>
              <select 
                id="target_type" 
                name="target_type" 
                className="input-field" 
                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
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
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600 }}>Duration & Pricing</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="duration_days" value="7" defaultChecked style={{ marginRight: '16px' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block' }}>7 Days</strong>
                    <span className="muted" style={{ fontSize: '12px' }}>Quick boost for visibility</span>
                  </div>
                  <strong style={{ fontSize: '16px' }}>₦5,000</strong>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="duration_days" value="14" style={{ marginRight: '16px' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block' }}>14 Days</strong>
                    <span className="muted" style={{ fontSize: '12px' }}>Recommended for events</span>
                  </div>
                  <strong style={{ fontSize: '16px' }}>₦9,000</strong>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid var(--gold)', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255, 215, 0, 0.05)' }}>
                  <input type="radio" name="duration_days" value="30" style={{ marginRight: '16px' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block' }}>30 Days <span style={{ background: 'var(--gold)', color: '#000', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>BEST VALUE</span></strong>
                    <span className="muted" style={{ fontSize: '12px' }}>Maximum exposure for the month</span>
                  </div>
                  <strong style={{ fontSize: '16px' }}>₦15,000</strong>
                </label>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '8px' }}>
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

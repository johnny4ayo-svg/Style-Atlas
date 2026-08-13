import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BusinessAdsDashboard({
  searchParams,
}: {
  searchParams: { reference?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    return <div>You don&apos;t have a business profile yet.</div>;
  }

  // Handle Paystack callback verification
  if (searchParams.reference) {
    try {
      const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${searchParams.reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        cache: 'no-store'
      });
      const paystackData = await paystackRes.json();
      
      if (paystackData.status && paystackData.data?.status === 'success') {
        const metadata = paystackData.data.metadata;
        if (metadata && metadata.type === 'ad_campaign' && metadata.campaign_id) {
          const durationDays = metadata.duration_days || 7;
          const startsAt = new Date();
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + durationDays);

          // Update the campaign to active
          await supabase
            .from('promoted_campaigns')
            .update({
              status: 'active',
              amount_paid: paystackData.data.amount / 100,
              starts_at: startsAt.toISOString(),
              expires_at: expiresAt.toISOString(),
            })
            .eq('id', metadata.campaign_id)
            .eq('status', 'pending_payment'); // Only update if still pending
        }
      }
    } catch (e) {
      console.error("Error verifying payment:", e);
    }
    
    // Redirect to remove the reference from URL so we don't verify again on refresh
    redirect('/dashboard/business/ads');
  }

  const { data: campaigns } = await supabase
    .from('promoted_campaigns')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Advertising</span>
          <h1>Boost Your Visibility</h1>
          <p className="muted" style={{ fontSize: '12px', marginTop: '4px' }}>
            Promote your profile, products, or events to reach more clients on STYLEATLAS.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-gold" href="/dashboard/business/ads/new">
            Create Campaign
          </Link>
        </div>
      </div>

      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <span className="eyebrow">Your Campaigns</span>
              <h3>Active & Past Promotions</h3>
            </div>
          </div>
          
          <div className="lead-list" style={{ marginTop: '1rem' }}>
            {campaigns && campaigns.length > 0 ? (
              campaigns.map((camp) => (
                <div className="lead-item" key={camp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <strong style={{ display: 'block', textTransform: 'capitalize' }}>Promoted {camp.target_type}</strong>
                    <span className="muted" style={{ fontSize: '12px' }}>
                      {camp.starts_at ? new Date(camp.starts_at).toLocaleDateString() : 'Pending'} - {camp.expires_at ? new Date(camp.expires_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: camp.status === 'active' ? '#e6f4ea' : camp.status === 'pending_payment' ? '#fef3c7' : '#f3f4f6',
                        color: camp.status === 'active' ? '#166534' : camp.status === 'pending_payment' ? '#92400e' : '#374151'
                      }}>
                        {camp.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    {camp.status === 'active' && (
                      <span className="muted" style={{ fontSize: '11px' }}>
                        {camp.impressions} Views · {camp.clicks} Clicks
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '32px', textAlign: 'center', color: '#666' }}>
                <div style={{ marginBottom: '16px' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto', opacity: 0.5 }}>
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3>No campaigns yet</h3>
                <p style={{ marginTop: '8px', fontSize: '14px' }}>Get your business in front of thousands of potential clients.</p>
                <Link href="/dashboard/business/ads/new" className="text-link" style={{ display: 'inline-block', marginTop: '16px', fontWeight: 600 }}>
                  Start your first campaign →
                </Link>
              </div>
            )}
          </div>
        </article>
      </section>
    </>
  );
}

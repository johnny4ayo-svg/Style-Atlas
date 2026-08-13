import { createClient } from "@/lib/supabase/server";

export default async function AdminAdsPage() {
  const supabase = createClient();
  
  const { data: ads } = await supabase
    .from('promoted_campaigns')
    .select('*, businesses(business_name)')
    .order('created_at', { ascending: false });

  // Calculate total ad revenue
  const totalRevenue = ads?.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0) || 0;
  const activeAds = ads?.filter(a => a.status === 'active').length || 0;

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Advertising</span>
          <h1>Campaigns & Revenue</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '8px' }}>Total Ad Revenue</h3>
          <p style={{ fontSize: '32px', fontWeight: 600 }}>₦{(totalRevenue).toLocaleString()}</p>
        </div>
        <div style={{ padding: '24px', backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '8px' }}>Active Campaigns</h3>
          <p style={{ fontSize: '32px', fontWeight: 600 }}>{activeAds}</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Business</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Target</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Amount Paid</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Duration</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {ads?.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>
                  {a.businesses?.business_name}
                </td>
                <td style={{ padding: '16px', textTransform: 'capitalize', color: 'var(--gray-600)' }}>
                  {a.target_type}
                </td>
                <td style={{ padding: '16px', fontWeight: 600 }}>
                  ₦{(a.amount_paid || 0).toLocaleString()}
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)', fontSize: '13px' }}>
                  {a.starts_at ? new Date(a.starts_at).toLocaleDateString() : 'N/A'} - {a.expires_at ? new Date(a.expires_at).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    backgroundColor: a.status === 'active' ? '#e6f4ea' : a.status === 'pending_payment' ? '#fef3c7' : '#f3f4f6', 
                    color: a.status === 'active' ? '#166534' : a.status === 'pending_payment' ? '#92400e' : '#374151', 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase'
                  }}>
                    {a.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
            {(!ads || ads.length === 0) && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-500)' }}>
                  No advertising campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

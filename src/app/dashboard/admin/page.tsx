import { createClient } from "@/lib/supabase/server";
import { toggleBusinessVerification } from "@/app/actions/admin-actions";

export default async function AdminBusinessesPage() {
  const supabase = createClient();
  
  const { data: businesses } = await supabase
    .from('businesses')
    .select('*, profiles(first_name, last_name)')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Platform Management</span>
          <h1>All Businesses</h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Business Name</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Owner</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Type</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {businesses?.map((b: any) => (
              <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={b.cover_image_url || '/images/designer-blue.jpg'} alt="" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                    {b.business_name}
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>
                  {b.profiles?.first_name} {b.profiles?.last_name}
                </td>
                <td style={{ padding: '16px', textTransform: 'capitalize', color: 'var(--gray-600)' }}>
                  {b.business_type}
                </td>
                <td style={{ padding: '16px' }}>
                  {b.is_verified ? (
                    <span style={{ backgroundColor: '#e6f4ea', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Verified</span>
                  ) : (
                    <span style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Unverified</span>
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  <form action={async () => {
                    'use server';
                    await toggleBusinessVerification(b.id, b.is_verified);
                  }}>
                    <button type="submit" className="btn btn-outline-dark" style={{ padding: '6px 12px', fontSize: '12px' }}>
                      {b.is_verified ? 'Revoke Verification' : 'Verify Business'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

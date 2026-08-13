import { createClient } from "@/lib/supabase/server";
import { updateUserRole } from "@/app/actions/admin-actions";

export default async function AdminUsersPage() {
  const supabase = createClient();
  
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">User Management</span>
          <h1>All Registered Users</h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>User</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>ID</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Joined</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Role</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={p.avatar_url || '/images/designer-blue.jpg'} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    {p.first_name} {p.last_name}
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)', fontSize: '13px' }}>
                  {p.id.substring(0, 8)}...
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)', fontSize: '13px' }}>
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    backgroundColor: p.role === 'admin' ? '#fee2e2' : p.role === 'professional' ? '#e0e7ff' : '#f3f4f6', 
                    color: p.role === 'admin' ? '#991b1b' : p.role === 'professional' ? '#3730a3' : '#374151', 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' 
                  }}>
                    {p.role}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  {p.role !== 'admin' ? (
                    <form action={async () => {
                      'use server';
                      await updateUserRole(p.id, 'admin');
                    }}>
                      <button type="submit" className="btn btn-outline-dark" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        Make Admin
                      </button>
                    </form>
                  ) : (
                    <form action={async () => {
                      'use server';
                      await updateUserRole(p.id, 'customer');
                    }}>
                      <button type="submit" className="btn btn-outline-dark" style={{ padding: '6px 12px', fontSize: '12px', borderColor: 'red', color: 'red' }}>
                        Revoke Admin
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

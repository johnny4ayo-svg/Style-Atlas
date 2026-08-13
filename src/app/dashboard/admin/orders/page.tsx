import { createClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = createClient();
  
  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(first_name, last_name)')
    .order('created_at', { ascending: false });

  const { data: escrows } = await supabase
    .from('escrow_transactions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Financial Oversight</span>
          <h1>Orders & Escrow</h1>
        </div>
      </div>

      <h3 style={{ marginBottom: '16px' }}>All Platform Orders</h3>
      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Order ID</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Customer</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Amount</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {orders?.map((o: any) => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500, fontSize: '13px' }}>
                  {o.id.substring(0, 8).toUpperCase()}...
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>
                  {o.profiles?.first_name} {o.profiles?.last_name}
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>
                  {new Date(o.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', fontWeight: 600 }}>
                  ₦{(o.total_amount / 100).toLocaleString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    backgroundColor: o.status === 'paid' || o.status === 'completed' ? '#e6f4ea' : o.status === 'pending' ? '#fef3c7' : '#fee2e2', 
                    color: o.status === 'paid' || o.status === 'completed' ? '#166534' : o.status === 'pending' ? '#92400e' : '#991b1b', 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase'
                  }}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-500)' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginBottom: '16px' }}>Escrow Transactions (Funds Held)</h3>
      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Transaction ID</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Order Ref</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Amount Held</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {escrows?.map((e: any) => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500, fontSize: '13px' }}>
                  {e.id.substring(0, 8).toUpperCase()}...
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)', fontSize: '13px' }}>
                  {e.order_id.substring(0, 8).toUpperCase()}...
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>
                  {new Date(e.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', fontWeight: 600 }}>
                  ₦{(e.amount / 100).toLocaleString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    backgroundColor: e.status === 'released' ? '#e6f4ea' : e.status === 'held' ? '#e0e7ff' : '#fee2e2', 
                    color: e.status === 'released' ? '#166534' : e.status === 'held' ? '#3730a3' : '#991b1b', 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase'
                  }}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!escrows || escrows.length === 0) && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-500)' }}>
                  No funds currently in escrow.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

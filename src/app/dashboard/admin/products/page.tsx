import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "@/app/actions/admin-actions";

export default async function AdminProductsPage() {
  const supabase = createClient();
  
  const { data: products } = await supabase
    .from('products')
    .select('*, businesses(business_name)')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Inventory Management</span>
          <h1>All Products</h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Product</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Business</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Price</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Stock</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', color: 'var(--gray-500)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {products?.map((p: any) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={p.image_url || '/images/designer-green.jpg'} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                    {p.name}
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>
                  {p.businesses?.business_name}
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>
                  ₦{((p.base_price || 0) / 100).toLocaleString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    backgroundColor: true ? '#e6f4ea' : '#fee2e2', 
                    color: true ? '#166534' : '#991b1b', 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 
                  }}>
                    {true ? `In stock` : 'Out of stock'}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <form action={async () => {
                    'use server';
                    await deleteProduct(p.id);
                  }}>
                    <button type="submit" className="btn btn-outline-dark" style={{ padding: '6px 12px', fontSize: '12px', borderColor: 'red', color: 'red' }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-500)' }}>
                  No products found on the platform.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

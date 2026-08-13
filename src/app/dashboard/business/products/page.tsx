import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProductsDashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) return <div>No business found.</div>;

  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(size, color, inventory_count)')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Marketplace</span>
          <h1>Manage Products</h1>
          <p className="muted" style={{ fontSize: '12px', marginTop: '4px' }}>
            View and manage the products you are selling on StyleAtlas.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-gold" href="/dashboard/business/products/new">Add Product</Link>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <h3>Your active products</h3>
            </div>
          </div>
          
          {products && products.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
              {products.map(product => (
                <div key={product.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #eaeaea', borderRadius: '4px', alignItems: 'center' }}>
                  <Image src={product.image_url || "/images/designer-green.jpg"} alt={product.name} width={60} height={80} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '18px' }}>{product.name}</strong>
                    <span style={{ color: '#666', fontSize: '14px' }}>₦{(product.base_price / 100).toLocaleString()}</span>
                  </div>
                  <div>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <span className="tag" style={{ border: '1px solid #ddd', background: '#f9f9f9', padding: '4px 8px' }}>{(product.product_variants as any[])[0]?.inventory_count || 0} in stock</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '48px', textAlign: 'center', color: '#666' }}>
              You haven&apos;t listed any products yet.
            </div>
          )}
        </article>
      </section>
    </>
  );
}

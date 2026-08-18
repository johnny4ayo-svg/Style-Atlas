import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Temporarily bypassed for local development so you don't get locked out
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // Temporarily bypassed for local development so you don't get locked out
  if (profile?.role !== 'admin') {
    redirect('/dashboard'); // Kick non-admins out
  }

  return (
    <div className="dashboard-layout container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <aside className="dashboard-sidebar">
        <nav className="dashboard-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
            Admin Control Panel
          </div>
          <Link href="/dashboard/admin" className="nav-link">Businesses</Link>
          <Link href="/dashboard/admin/users" className="nav-link">Users</Link>
          <Link href="/dashboard/admin/products" className="nav-link">Products</Link>
          <Link href="/dashboard/admin/orders" className="nav-link">Orders & Escrow</Link>
          <Link href="/dashboard/admin/ads" className="nav-link">Ads & Revenue</Link>
        </nav>
      </aside>
      
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, avatar_url, role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link href="/" className="dashboard-logo">
          <Image src="/brand/styleatlas-logo-light.svg" alt="STYLEATLAS" width={185} height={32} />
        </Link>
        <div style={{ marginBottom: '24px', padding: '0 12px' }}>
          <span className="badge" style={{ background: 'var(--gold)', color: 'var(--ink)' }}>SUPER ADMIN</span>
        </div>
        <nav className="dashboard-nav">
          <Link href="/admin" className="dashboard-link active">
            <Icon name="grid" /> Overview
          </Link>
          <Link href="/admin/users" className="dashboard-link">
            <Icon name="user" /> Users
          </Link>
          <Link href="/admin/settings" className="dashboard-link">
            <Icon name="settings" /> Settings
          </Link>
        </nav>
        <div className="dashboard-user">
          <Image src={profile?.avatar_url || "/images/designer-green.jpg"} alt="User" width={38} height={38} />
          <div>
            <strong>{profile?.first_name || 'Admin'} {profile?.last_name || ''}</strong>
            <span>Admin</span>
          </div>
        </div>
      </aside>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

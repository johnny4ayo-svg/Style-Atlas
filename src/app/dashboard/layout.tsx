'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "@/app/auth/actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBusiness = pathname.includes('/dashboard/business');

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-logo" href="/">
          <Image src="/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS" width={185} height={31} style={{ filter: 'invert(1)' }} />
        </Link>
        <nav className="dashboard-nav">
          <Link className={`dashboard-link ${pathname === '/dashboard/business' ? 'active' : ''}`} href="/dashboard/business">
            <Icon name="grid" />
            <span>Overview</span>
          </Link>
          {isBusiness && (
            <>
              <Link className="dashboard-link" href="#">
                <Icon name="user" />
                <span>Business profile</span>
              </Link>
              <Link className="dashboard-link" href="#">
                <Icon name="camera" />
                <span>Portfolio</span>
              </Link>
              <Link className="dashboard-link" href="#">
                <Icon name="message" />
                <span>Enquiries</span>
              </Link>
              <Link className={`dashboard-link ${pathname.includes('/dashboard/messages') ? 'active' : ''}`} href="/dashboard/messages">
                <Icon name="message" />
                <span>Messages</span>
              </Link>
              <Link className={`dashboard-link ${pathname.includes('/dashboard/business/products') ? 'active' : ''}`} href="/dashboard/business/products">
                <Icon name="bag" />
                <span>Products</span>
              </Link>
              <Link className={`dashboard-link ${pathname.includes('/dashboard/business/jobs') ? 'active' : ''}`} href="/dashboard/business/jobs">
                <Icon name="briefcase" />
                <span>Jobs</span>
              </Link>
              <Link className={`dashboard-link ${pathname.includes('/dashboard/business/events') ? 'active' : ''}`} href="/dashboard/business/events">
                <Icon name="calendar" />
                <span>Events</span>
              </Link>
              <Link className={`dashboard-link ${pathname.includes('/dashboard/business/ads') ? 'active' : ''}`} href="/dashboard/business/ads">
                <Icon name="star" />
                <span>Advertising</span>
              </Link>
              <Link className="dashboard-link" href="#">
                <Icon name="heart" />
                <span>Reviews</span>
              </Link>
            </>
          )}
          {!isBusiness && (
            <>
              <Link className={`dashboard-link ${pathname === '/dashboard/customer' ? 'active' : ''}`} href="/dashboard/customer">
                <Icon name="heart" />
                <span>Saved Profiles</span>
              </Link>
              <Link className="dashboard-link" href="#">
                <Icon name="message" />
                <span>Quote Requests</span>
              </Link>
              <Link className={`dashboard-link ${pathname.includes('/dashboard/messages') ? 'active' : ''}`} href="/dashboard/messages">
                <Icon name="message" />
                <span>Messages</span>
              </Link>
            </>
          )}
          <button className="dashboard-link" onClick={() => logout()} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', marginTop: '20px' }}>
            <Icon name="close" />
            <span>Log out</span>
          </button>
        </nav>
        <div className="dashboard-user">
          <Image src="/images/designer-blue.jpg" alt="Amina" width={38} height={38} style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <strong>Amina Danjuma</strong>
            <span>Premium business</span>
          </div>
        </div>
      </aside>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

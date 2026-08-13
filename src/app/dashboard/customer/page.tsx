import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { promoteToAdmin } from "@/app/actions/admin-actions";

export default async function CustomerDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: favourites } = await supabase
    .from('favourites')
    .select('*, businesses ( id, business_name, slug, city )')
    .eq('user_id', user?.id || '');

  const { data: quoteRequests } = await supabase
    .from('quote_requests')
    .select('*, businesses ( business_name )')
    .eq('customer_id', user?.id || '')
    .order('created_at', { ascending: false });

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Customer workspace</span>
          <h1>Welcome back.</h1>
          <p className="muted" style={{ fontSize: '10px', marginTop: '4px' }}>
            Manage your saved designers and active enquiries.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-gold" href="/directory">Find a professional</Link>
          <Link className="btn btn-outline-dark" href="/dashboard/customer/moodboards">
            My Moodboards
          </Link>
          <Link className="btn btn-outline-dark" href="/dashboard/customer/measurements">
            My Measurements
          </Link>
          <form action={promoteToAdmin}>
            <button type="submit" className="btn btn-outline-dark" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
              Make me Admin
            </button>
          </form>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <span className="eyebrow">Shortlist</span>
              <h3>Saved Profiles</h3>
            </div>
          </div>
          
          {favourites && favourites.length > 0 ? (
            <div className="lead-list" style={{ marginTop: '16px' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {favourites.map((fav: any) => (
                <div className="lead-item" key={fav.id}>
                  <div>
                    <strong>{fav.businesses?.business_name}</strong>
                    <span>{fav.businesses?.city}</span>
                  </div>
                  <Link className="btn btn-outline-dark btn-sm" href={`/profile/${fav.businesses?.slug}`}>View profile</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="heart" />
              <h3>No saved profiles yet</h3>
              <p>When you discover a designer you love, click the heart icon to save them here for easy access.</p>
              <Link className="btn btn-outline-dark" style={{ marginTop: '16px' }} href="/directory">
                Explore the directory
              </Link>
            </div>
          )}
        </article>
      </section>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <span className="eyebrow">Messages</span>
              <h3>Quote Requests & Enquiries</h3>
            </div>
          </div>
          
          {quoteRequests && quoteRequests.length > 0 ? (
            <div className="lead-list" style={{ marginTop: '16px' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {quoteRequests.map((req: any) => (
                <div className="lead-item" key={req.id}>
                  <div>
                    <strong>{req.businesses?.business_name}</strong>
                    <span>{req.occasion} · {new Date(req.target_date || '').toLocaleDateString()}</span>
                  </div>
                  <span className="lead-status">{req.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="message" />
              <h3>No active enquiries</h3>
              <p>When you request a quote or message a business, you can track their responses here.</p>
            </div>
          )}
        </article>
      </section>
    </>
  );
}

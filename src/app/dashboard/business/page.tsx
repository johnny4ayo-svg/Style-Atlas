import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { promoteToAdmin } from "@/app/actions/admin-actions";

export default async function BusinessDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    return <div>You don&apos;t have a business profile yet.</div>;
  }

  const { data: quoteRequests } = await supabase
    .from('quote_requests')
    .select('*, profiles(first_name, last_name, avatar_url)')
    .eq('business_id', business.id)
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
          <span className="eyebrow">Business overview</span>
          <h1>Good afternoon, {business.business_name}.</h1>
          <p className="muted" style={{ fontSize: '10px', marginTop: '4px' }}>
            Here is what has changed across your profile this month.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-outline-dark" href={`/profile/${business.slug}`}>View public profile</Link>
          <button className="btn btn-gold">Add portfolio project</button>
          <form action={promoteToAdmin}>
            <button type="submit" className="btn btn-outline-dark" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
              Make me Admin
            </button>
          </form>
        </div>
      </div>
      
      <div className="result-notice">
        <Icon name="check" />
        Your profile is active. Keep adding portfolio projects to strengthen search visibility.
      </div>
      
      <section className="dashboard-kpis">
        <article className="kpi">
          <div className="kpi-head">
            <span>Profile views</span>
            <Icon name="user" />
          </div>
          <strong className="kpi-value">8,420</strong>
          <span className="kpi-trend">↑ 18.4% from last month</span>
        </article>
        
        <article className="kpi">
          <div className="kpi-head">
            <span>Qualified enquiries</span>
            <Icon name="message" />
          </div>
          <strong className="kpi-value">{quoteRequests?.length || 0}</strong>
          <span className="kpi-trend">Tracked this month</span>
        </article>
        
        <article className="kpi">
          <div className="kpi-head">
            <span>Consultations booked</span>
            <Icon name="calendar" />
          </div>
          <strong className="kpi-value">0</strong>
          <span className="kpi-trend">₦0 consultation value</span>
        </article>
        
        <article className="kpi">
          <div className="kpi-head">
            <span>Saved by clients</span>
            <Icon name="heart" />
          </div>
          <strong className="kpi-value">312</strong>
          <span className="kpi-trend">↑ 29 this month</span>
        </article>
      </section>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <span className="eyebrow">Fresh activity</span>
              <h3>New enquiries</h3>
            </div>
            <Link className="text-link" href="#">View all</Link>
          </div>
          <div className="lead-list">
            {quoteRequests && quoteRequests.length > 0 ? (
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              quoteRequests.map((req: any) => (
                <div className="lead-item" key={req.id}>
                  <Image src={req.profiles?.avatar_url || "/images/designer-green.jpg"} alt="Client" width={40} height={40} />
                  <div>
                    <strong>{req.profiles?.first_name || 'Anonymous'} {req.profiles?.last_name || ''}</strong>
                    <span>{req.occasion} · {req.budget_range}</span>
                  </div>
                  <span className="lead-status">{req.status}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>No new enquiries yet.</div>
            )}
          </div>
        </article>
      </section>
    </>
  );
}

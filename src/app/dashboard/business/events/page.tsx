import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EventsDashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) return <div>No business found.</div>;

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('business_id', business.id)
    .order('event_date', { ascending: true });

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Community</span>
          <h1>Manage Events</h1>
          <p className="muted" style={{ fontSize: '12px', marginTop: '4px' }}>
            View and manage the events, workshops, and pop-ups you are hosting.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-gold" href="/dashboard/business/events/new">Create Event</Link>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <h3>Your upcoming events</h3>
            </div>
          </div>
          
          {events && events.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
              {events.map(event => (
                <div key={event.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #eaeaea', borderRadius: '4px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '18px' }}>{event.title}</strong>
                    <span style={{ color: '#666', fontSize: '14px' }}>{new Date(event.event_date).toLocaleDateString()} · {event.location}</span>
                  </div>
                  <div>
                    <span className="tag" style={{ border: '1px solid #ddd', background: '#f9f9f9', padding: '4px 8px' }}>Active</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '48px', textAlign: 'center', color: '#666' }}>
              You haven&apos;t scheduled any events yet.
            </div>
          )}
        </article>
      </section>
    </>
  );
}

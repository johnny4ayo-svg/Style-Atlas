import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function MoodboardsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: moodboards } = await supabase
    .from('moodboards')
    .select('*, moodboard_items ( count )')
    .eq('user_id', user?.id || '')
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
          <h1>My Moodboards</h1>
          <p className="muted" style={{ fontSize: '10px', marginTop: '4px' }}>
            Curate your style inspiration and share it with designers.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-gold" href="/dashboard/customer/moodboards/new">
            Create Moodboard
          </Link>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          
          {moodboards && moodboards.length > 0 ? (
            <div className="lead-list" style={{ marginTop: '16px' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {moodboards.map((board: any) => (
                <div className="lead-item" key={board.id}>
                  <div>
                    <strong>{board.title}</strong>
                    <span className="muted">{board.description || 'No description'}</span>
                    <span style={{ fontSize: '12px' }}>{board.moodboard_items?.[0]?.count || 0} items</span>
                  </div>
                  <Link className="btn btn-outline-dark btn-sm" href={`/dashboard/customer/moodboards/${board.id}`}>
                    View Board
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="heart" />
              <h3>No moodboards yet</h3>
              <p>Create a moodboard to start saving your favorite looks, designers, and products in one place.</p>
              <Link className="btn btn-outline-dark" style={{ marginTop: '16px' }} href="/dashboard/customer/moodboards/new">
                Create your first moodboard
              </Link>
            </div>
          )}
        </article>
      </section>
    </>
  );
}

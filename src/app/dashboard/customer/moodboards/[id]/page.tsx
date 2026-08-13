import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MoodboardViewPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: moodboard } = await supabase
    .from('moodboards')
    .select('*, moodboard_items (*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!moodboard) {
    notFound();
  }

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <>
      <div className="dashboard-top">
        <div>
          <Link href="/dashboard/customer/moodboards" className="btn btn-outline-dark btn-sm" style={{ marginBottom: '16px' }}>
            &larr; Back to Moodboards
          </Link>
          <span className="eyebrow">Moodboard</span>
          <h1>{moodboard.title}</h1>
          {moodboard.description && (
            <p className="muted" style={{ marginTop: '4px' }}>
              {moodboard.description}
            </p>
          )}
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dashboard-card-head">
            <div>
              <h3>Items ({moodboard.moodboard_items?.length || 0})</h3>
            </div>
          </div>
          
          {moodboard.moodboard_items && moodboard.moodboard_items.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {moodboard.moodboard_items.map((item: any) => (
                <div key={item.id} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                  <img 
                    src={item.image_url} 
                    alt="Moodboard item" 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="eyebrow">{item.item_type}</span>
                    {item.source_url && (
                      <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm" style={{ padding: '4px 8px' }}>
                        View
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="image" />
              <h3>This moodboard is empty</h3>
              <p>Explore the directory and save items to this moodboard.</p>
              <Link className="btn btn-gold" style={{ marginTop: '16px' }} href="/directory">
                Browse Directory
              </Link>
            </div>
          )}
        </article>
      </section>
    </>
  );
}

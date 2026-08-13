import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BusinessCard from "@/components/ui/BusinessCard";

export default async function SavedProfiles() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?returnUrl=/saved');
  }

  // Fetch favourited businesses for this user
  const { data: favourites } = await supabase
    .from('favourites')
    .select(`
      business_id,
      businesses (
        *,
        business_categories ( categories ( name ) ),
        portfolios ( portfolio_media ( image_url ) )
      )
    `)
    .eq('user_id', user.id);

  // Extract the business objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const savedBusinesses = favourites?.map((f: any) => f.businesses).filter(Boolean) || [];

  return (
    <main>
      <section className="dashboard-top container" style={{ padding: '60px 24px 40px' }}>
        <div>
          <span className="eyebrow">Your curated list</span>
          <h1>Saved Profiles</h1>
        </div>
      </section>

      <section className="section bg-light" style={{ minHeight: '50vh' }}>
        <div className="container">
          {savedBusinesses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <svg className="icon" style={{ width: '48px', height: '48px', color: '#ded3c5', marginBottom: '16px' }}>
                <use href="/icons/sprite.svg#icon-heart"></use>
              </svg>
              <h3>No saved profiles yet</h3>
              <p style={{ color: 'var(--muted)', marginTop: '8px' }}>
                When you find a designer or brand you love, tap the heart icon to save them here for later.
              </p>
              <a href="/directory" className="btn btn-gold" style={{ marginTop: '24px', display: 'inline-flex' }}>
                Explore the directory
              </a>
            </div>
          ) : (
            <div className="directory-grid">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {savedBusinesses.map((business: any) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* eslint-disable */
// @ts-nocheck

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BusinessCard from "@/components/ui/BusinessCard";

import type { Metadata } from "next";

export const revalidate = 300;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const q = searchParams?.q ? ` - ${searchParams.q}` : "";
  return {
    title: `Nigerian Fashion Professionals Directory${q} | STYLEATLAS`,
    description: "Find top Nigerian fashion designers, tailors, photographers, and brands. Browse verified professionals for your next custom outfit or styling project.",
    alternates: {
      canonical: '/directory'
    },
    openGraph: {
      url: '/directory'
    }
  };
}

export default async function Directory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient();
  
  let query = supabase
    .from('businesses')
    .select(`
      id,
      business_name,
      slug,
      city,
      state,
      rating,
      review_count,
      starting_price,
      cover_image_url,
      is_verified,
      verification_tier,
      business_categories(
        categories(name)
      )
    `)
    .eq('verification_status', 'approved');

  // Apply URL filters
  if (searchParams.location) {
    query = query.ilike('city', `%${searchParams.location}%`);
  }
  if (searchParams.city) {
    query = query.ilike('city', `%${searchParams.city}%`);
  }
  if (searchParams.q) {
    query = query.ilike('business_name', `%${searchParams.q}%`);
  }

  // Execute query
  const { data: businesses } = await query.order('rating', { ascending: false });

  // Optional: If 'category' or 'type' filter is present, filter in memory since joining categories in Supabase can be complex
  let filteredBusinesses = businesses || [];
  if (searchParams.category) {
    const term = String(searchParams.category).toLowerCase();
    // basic category filtering
    if (term !== 'all' && term !== '') {
       filteredBusinesses = filteredBusinesses.filter(b => {
         const cats = b.business_categories?.map(bc => bc.categories?.name?.toLowerCase()) || [];
         // e.g. if term is "designers", check if "designer" is in cats
         return cats.some(c => c && c.includes(term.replace(/s$/, '')));
       });
    }
  }

  const { data: sponsoredCampaigns } = await supabase
    .from('promoted_campaigns')
    .select('business_id')
    .eq('status', 'active')
    .eq('target_type', 'profile');

  const sponsoredBusinessIds = sponsoredCampaigns?.map(c => c.business_id) || [];
  
  // Separate businesses into sponsored and regular
  const sponsoredBusinesses = filteredBusinesses?.filter(b => sponsoredBusinessIds.includes(b.id)) || [];
  const regularBusinesses = filteredBusinesses?.filter(b => !sponsoredBusinessIds.includes(b.id)) || [];

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Directory</span>
            </div>
            <span className="eyebrow light">Verified fashion talent</span>
            <h1 className="page-title">Professionals for the moment you have in mind.</h1>
            <p>Compare portfolios, specialities, pricing signals, response times and verified client reviews across Nigeria.</p>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          {filteredBusinesses.length > 0 ? (
            <div className="result-notice">
              <svg className="icon"><use href="/icons/sprite.svg#icon-spark"></use></svg>
              Showing the strongest matches for your search. Adjust the filters to refine your shortlist.
            </div>
          ) : (
            <div className="result-notice" style={{ background: '#f8f8f8', color: '#555' }}>
              We could not find a matching professional yet. Try changing your filters or check back as new businesses are approved.
            </div>
          )}
          <div className="directory-layout">
            <aside className="filter-panel">
              <div className="filter-head">
                <h3>Refine</h3>
                <Link href="/directory" className="filter-reset">Clear all</Link>
              </div>
              <div className="filter-group">
                <h4>Category</h4>
                <label className="filter-option"><span><input type="checkbox" defaultChecked /> Fashion designers</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Bridal ateliers</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Fashion brands</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Bespoke tailors</span></label>
              </div>
              <div className="filter-group">
                <h4>Location</h4>
                <select className="filter-select">
                  <option>All Nigerian cities</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Benin City</option>
                  <option>Kano</option>
                </select>
              </div>
              <div className="filter-group">
                <h4>Speciality</h4>
                <label className="filter-option"><span><input type="checkbox" /> Bridal couture</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Menswear</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Luxury ready-to-wear</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Modest fashion</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Children&apos;s occasionwear</span></label>
              </div>

              <button className="btn btn-dark" style={{ width: '100%' }}>Apply filters</button>
            </aside>

            <div>
              <div className="results-head">
                <div>
                  <h2>Results</h2>
                  <span className="muted" style={{ fontSize: '10px' }}>{filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'result' : 'results'}</span>
                </div>
                <div className="results-controls">
                  <button className="btn btn-outline-dark btn-sm mobile-filter-btn">
                    <svg className="icon"><use href="/icons/sprite.svg#icon-filter"></use></svg>Filters
                  </button>
                  <select className="result-select">
                    <option>Sort: Recommended</option>
                    <option>Highest rated</option>
                    <option>Recently added</option>
                    <option>Price: low to high</option>
                  </select>
                </div>
              </div>

              <div className="directory-grid">
                {sponsoredBusinesses.length > 0 && sponsoredBusinesses.map((business: any) => (
                  <div key={`sponsored-${business.id}`} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2, background: 'var(--gold)', color: '#000', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
                      SPONSORED
                    </div>
                    <BusinessCard business={business} />
                  </div>
                ))}

                {regularBusinesses.length > 0 ? (
                  regularBusinesses.map((business: any) => (
                    <BusinessCard key={business.id} business={business} />
                  ))
                ) : (
                  sponsoredBusinesses.length === 0 && (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
                      <p style={{ marginBottom: '1.5rem' }}>No professionals found matching your criteria. Please adjust your filters.</p>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href={`/contact?category=professional-request&city=${searchParams.city || searchParams.location || ''}&speciality=${searchParams.category || ''}`} className="btn btn-dark">Request a professional</Link>
                        <Link href="#newsletter-email" className="btn btn-outline-dark">Get new-profile updates</Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// @ts-nocheck
export const revalidate = 3600;
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BusinessCard from "@/components/ui/BusinessCard";

export default async function Directory() {
  const supabase = createClient();
  const { data: businesses } = await supabase
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
    .order('rating', { ascending: false });

  const { data: sponsoredCampaigns } = await supabase
    .from('promoted_campaigns')
    .select('business_id')
    .eq('status', 'active')
    .eq('target_type', 'profile');

  const sponsoredBusinessIds = sponsoredCampaigns?.map(c => c.business_id) || [];
  
  // Separate businesses into sponsored and regular
  const sponsoredBusinesses = businesses?.filter(b => sponsoredBusinessIds.includes(b.id)) || [];
  // For the demo, if we don't have sponsored businesses, we can just show the regular list.
  // We remove sponsored ones from the main list so they don't duplicate, unless we want them to.
  const regularBusinesses = businesses?.filter(b => !sponsoredBusinessIds.includes(b.id)) || [];

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Designers</span>
            </div>
            <span className="eyebrow light">Verified fashion talent</span>
            <h1 className="page-title">Designers for the moment you have in mind.</h1>
            <p>Compare portfolios, specialities, pricing signals, response times and verified client reviews across Nigeria.</p>
          </div>
          <div className="hero-aside-card">
            <strong>25,000+</strong>
            <span>designer and atelier profiles in the demo taxonomy</span>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="result-notice">
            <svg className="icon"><use href="/icons/sprite.svg#icon-spark"></use></svg>
            Showing strong matches for bridal, occasionwear and modern Nigerian fashion. Adjust the filters to refine your shortlist.
          </div>
          <div className="directory-layout">
            <aside className="filter-panel">
              <div className="filter-head">
                <h3>Refine</h3>
                <button className="filter-reset">Clear all</button>
              </div>
              <div className="filter-group">
                <h4>Category</h4>
                <label className="filter-option"><span><input type="checkbox" defaultChecked /> Fashion designers</span><span>25,000</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Bridal ateliers</span><span>1,840</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Fashion brands</span><span>10,200</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Bespoke tailors</span><span>8,320</span></label>
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
                <label className="filter-option"><span><input type="checkbox" /> Bridal couture</span><span>1,240</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Menswear</span><span>3,910</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Luxury ready-to-wear</span><span>2,870</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Modest fashion</span><span>1,460</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Children&apos;s occasionwear</span><span>680</span></label>
              </div>
              <div className="filter-group">
                <h4>Budget range</h4>
                <div className="range-row">
                  <input placeholder="Min ₦" />
                  <input placeholder="Max ₦" />
                </div>
              </div>
              <div className="filter-group">
                <h4>Trust signals</h4>
                <label className="filter-option"><span><input type="checkbox" defaultChecked /> Verified only</span><span>8,530</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Rating 4.5+</span><span>4,910</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Responds within 24 hrs</span><span>3,260</span></label>
              </div>
              <button className="btn btn-dark" style={{ width: '100%' }}>Apply filters</button>
            </aside>

            <div>
              <div className="results-head">
                <div>
                  <h2>Fashion designers</h2>
                  <span className="muted" style={{ fontSize: '10px' }}>1,284 curated matches</span>
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
                  <div className="view-toggle">
                    <button className="active" aria-label="Grid view"><svg className="icon"><use href="/icons/sprite.svg#icon-grid"></use></svg></button>
                    <button aria-label="List view"><svg className="icon"><use href="/icons/sprite.svg#icon-list"></use></svg></button>
                  </div>
                </div>
              </div>

              <div className="directory-grid">
                {/* Render Sponsored Businesses First */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {sponsoredBusinesses.length > 0 && sponsoredBusinesses.map((business: any) => (
                  <div key={`sponsored-${business.id}`} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2, background: 'var(--gold)', color: '#000', padding: '2px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
                      SPONSORED
                    </div>
                    <BusinessCard business={business} />
                  </div>
                ))}

                {/* Render Regular Businesses */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {regularBusinesses.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  regularBusinesses.map((business: any) => (
                    <BusinessCard key={business.id} business={business} />
                  ))
                ) : (
                  sponsoredBusinesses.length === 0 && (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
                      <p>No designers found. Please check back later or update your filters.</p>
                    </div>
                  )
                )}
              </div>
              <div className="pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">›</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

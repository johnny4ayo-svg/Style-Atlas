import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SaveButton from "@/components/ui/SaveButton";
import CompareButton from "@/components/ui/CompareButton";
import SearchDock from "@/components/ui/SearchDock";

export default async function Home() {
  const supabase = createClient();
  const { data: businesses } = await supabase
    .from('businesses')
    .select(`
      id,
      business_name,
      slug,
      city,
      state,
      cover_image_url,
      is_verified,
      verification_tier,
      rating,
      review_count,
      business_categories(
        categories(name)
      )
    `)
    .eq('verification_status', 'approved')
    .limit(6); 

  const { data: rawAds } = await supabase
    .from('promoted_campaigns')
    .select(`
      id,
      businesses!inner(id, business_name, slug, city, state, cover_image_url, is_verified, verification_tier, rating, review_count, business_categories(categories(name)))
    `)
    .eq('status', 'active');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adBusinesses = rawAds ? rawAds.map((ad: any) => ({ ...ad.businesses, is_sponsored: true })) : [];
  const featuredList = [...adBusinesses, ...(businesses || [])].slice(0, 6); 

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'STYLEATLAS',
    url: 'https://styleatlas.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://styleatlas.com/directory?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* 1. HERO SECTION */}
      <section className="hero mobile-hero-adjust">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">The Premier Nigerian Fashion Directory</span>
            <h1>Find the talent behind your <em>next unforgettable look.</em></h1>
            <p>Explore verified designers, luxury brands, bridal ateliers, stylists, schools and fashion professionals shaping Nigeria&apos;s creative future.</p>
            <div className="hero-actions">
              <Link className="btn btn-gold" href="/directory">Explore fashion talent <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
              <Link className="btn btn-outline-light" href="/add-business">List your fashion business</Link>
            </div>
          </div>
          
          <div className="hero-image-wrap">
            <Image className="hero-image" src="/images/hero-editorial.jpg" alt="Nigerian fashion model" fill priority style={{ objectFit: 'cover' }} />
            <div className="hero-note"><strong>01 / 26</strong><span>STYLEATLAS editorial selection</span></div>
          </div>
          
          <SearchDock />
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES & CITIES */}
      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Browse Top Categories & Cities</span><h2>Every part of Nigerian fashion, mapped.</h2></div>
            <p>Move from inspiration to a trusted professional without starting your search again.</p>
          </div>
          
          <div className="category-shell" style={{ marginTop: '32px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Top Categories</h3>
            <div className="category-grid">
              <Link className="category-card" href="/directory?category=designers"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-user"></use></svg></span><strong>Designers</strong></Link>
              <Link className="category-card" href="/directory?category=brands"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-bag"></use></svg></span><strong>Brands</strong></Link>
              <Link className="category-card" href="/directory?category=schools"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-school"></use></svg></span><strong>Schools</strong></Link>
              <Link className="category-card" href="/directory?category=stylists"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-spark"></use></svg></span><strong>Stylists</strong></Link>
              <Link className="category-card" href="/directory?category=bridal"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></span><strong>Bridal experts</strong></Link>
              <Link className="category-card" href="/directory?category=tailors"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-scissors"></use></svg></span><strong>Tailors</strong></Link>
              <Link className="category-card" href="/directory?category=photographers"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-camera"></use></svg></span><strong>Photographers</strong></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-grid"></use></svg></span><strong>View all</strong></Link>
            </div>
            
            <h3 style={{ marginBottom: '16px', marginTop: '32px', fontSize: '1.25rem' }}>Top Cities</h3>
            <div className="city-grid">
              <Link className="city-card city-lagos" href="/directory?city=lagos"><span className="city-number">01</span><h3>Lagos</h3></Link>
              <Link className="city-card city-abuja" href="/directory?city=abuja"><span className="city-number">02</span><h3>Abuja</h3></Link>
              <Link className="city-card city-ph" href="/directory?city=port-harcourt"><span className="city-number">03</span><h3>Port Harcourt</h3></Link>
              <Link className="city-card city-benin" href="/directory?city=benin-city"><span className="city-number">04</span><h3>Benin City</h3></Link>
              <Link className="city-card city-enugu" href="/directory?city=enugu"><span className="city-number">05</span><h3>Enugu</h3></Link>
              <Link className="city-card city-kano" href="/directory?city=kano"><span className="city-number">06</span><h3>Kano</h3></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED BUSINESSES */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow light">Featured Businesses</span><h2>Designers worth knowing before everyone else does.</h2></div>
            <Link className="text-link" href="/directory">View all designers <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
          <div className="designer-grid">
            {featuredList && featuredList.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              featuredList.map((business: any) => (
                <article className="designer-card" key={business.id}>
                  <div className="designer-media">
                    <Image src={business.cover_image_url || "/images/designer-blue.jpg"} alt={`${business.business_name}`} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                    {business.is_sponsored && <div className="card-badges"><span className="badge" style={{ background: 'var(--gold)', color: '#000', border: 'none' }}>Sponsored</span></div>}
                    {business.verification_tier && business.verification_tier !== 'none' && !business.is_sponsored && <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>{business.verification_tier === 'guaranteed' ? 'Guaranteed' : business.verification_tier === 'studio' ? 'Studio Verified' : 'Verified'}</span></div>}
                    <SaveButton businessId={business.id} businessName={business.business_name} />
                  </div>
                  <div className="designer-body">
                    <h3>{business.business_name} {business.is_verified && <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>}</h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>{business.city}, {business.state}</div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>{Number(business.rating || 0).toFixed(1)} · {business.review_count || 0} reviews</span><span className="price-level">₦₦₦</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href={`/profile/${business.slug}`}>View profile</Link>
                      <CompareButton businessId={business.id} businessName={business.business_name} />
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>No featured designers available.</p>
            )}
          </div>
        </div>
      </section>

      {/* 4. TRUST AND VERIFICATION */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Trust and Verification</span><h2>Good work earns more than attention. It earns trust.</h2></div>
          </div>
          <div className="journey-grid">
            <article className="journey-card">
              <span className="kicker">For customers</span>
              <h3>Go from idea to trusted expert.</h3>
              <p>Search by what matters, compare real information and contact the right person with a useful brief.</p>
              <div className="step-list">
                <div className="step"><strong>1</strong><span>Search</span></div><div className="step"><strong>2</strong><span>Compare</span></div><div className="step"><strong>3</strong><span>Connect</span></div><div className="step"><strong>4</strong><span>Book</span></div>
              </div>
              <Link className="btn btn-dark" href="/directory">Start exploring</Link>
            </article>
            <article className="journey-card dark">
              <span className="kicker gold">Verified Client Reviews</span>
              <h3>Authentic stories from real clients.</h3>
              <p>We only display reviews from clients who have demonstrably worked with the professional.</p>
              <div className="review-card featured" style={{ marginTop: '24px', backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff' }}>
                <div className="review-person"><Image className="review-avatar" src="/images/designer-blue.jpg" alt="Amaka client portrait" width={48} height={48} style={{ borderRadius: '50%' }} /><div><strong>Amaka O.</strong><span style={{ color: '#aaa' }}>Lagos · Verified bridal client</span></div></div>
                <div className="review-stars" style={{ color: 'var(--gold)' }}>★★★★★</div>
                <blockquote>“I felt heard from the first sketch. My dress looked like me, not like a copy of someone else&apos;s wedding.”</blockquote>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE STYLEATLAS */}
      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Explore STYLEATLAS</span><h2>Search, shop, learn, work and show up where fashion happens.</h2></div>
            <p>Each area feeds the next. A school can post a course, a graduate can find a job, and a designer can reach a client.</p>
          </div>
          <div className="platform-grid">
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-bag"></use></svg></div>
              <h3>Marketplace</h3>
              <p>Shop ready-to-wear, accessories and made-to-order pieces from Nigerian labels.</p>
              <Link className="text-link" href="/marketplace">Shop the marketplace <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-user"></use></svg></div>
              <h3>Fashion jobs</h3>
              <p>Roles for designers, pattern makers, tailors, shop floors and creative directors.</p>
              <Link className="text-link" href="/jobs">View fashion jobs <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-calendar"></use></svg></div>
              <h3>Upcoming events</h3>
              <p>Shows, exhibitions and business gatherings.</p>
              <Link className="text-link" href="/events">Explore events <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-school"></use></svg></div>
              <h3>Fashion schools</h3>
              <p>Creative programmes, short courses and graduate initiatives before applying.</p>
              <Link className="text-link" href="/directory?category=schools">Compare schools <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px' }}>
              <div>
                <h3>STYLEATLAS Journal</h3>
                <p style={{ marginBottom: 0 }}>Stories that explain the craft, business and culture behind the clothes.</p>
              </div>
              <Link className="btn btn-dark" href="/journal">Read Stories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUSINESS CTA */}
      <section className="section compact">
        <div className="container">
          <div className="business-cta">
            <img src="/images/fashion-studio.jpg" alt="Nigerian fashion studio founders" />
            <div className="business-copy">
              <span className="eyebrow light">For designers, brands and schools</span>
              <h2>Put your fashion business where Nigeria can find it.</h2>
              <p>Build a trusted profile, show your strongest work, receive better enquiries and reach customers already searching for your exact services.</p>
              <div className="business-benefits">
                <span className="benefit-pill"><svg className="icon"><use href="/icons/sprite.svg#icon-check"></use></svg>Rank higher on Google</span>
                <span className="benefit-pill"><svg className="icon"><use href="/icons/sprite.svg#icon-check"></use></svg>Get direct WhatsApp leads</span>
                <span className="benefit-pill"><svg className="icon"><use href="/icons/sprite.svg#icon-check"></use></svg>Build trust with client reviews</span>
              </div>
              <div className="hero-actions" style={{ marginTop: '1rem' }}>
                <Link className="btn btn-gold" href="/add-business">Add your business</Link>
                <Link className="btn btn-outline-light" href="/pricing">View business plans</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SearchDock from "@/components/ui/SearchDock";

export const revalidate = 300;

export default async function StagingHome() {
  const supabase = createClient();
  const businessesPromise = supabase
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
    .eq('is_verified', true)
    .limit(6); 

  const adsPromise = supabase
    .from('promoted_campaigns')
    .select(`
      id,
      businesses!inner(id, business_name, slug, city, state, cover_image_url, is_verified, verification_tier, rating, review_count, business_categories(categories(name)))
    `)
    .eq('status', 'active');
  
  const [{ data: businesses }, { data: rawAds }] = await Promise.all([businessesPromise, adsPromise]);
  
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
    <main className="home-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 1. HERO SECTION */}
      <section className="hero home-hero">
        <div className="container hero-grid" style={{ minHeight: '680px', gridTemplateColumns: '1fr 1fr' }}>
          <div className="hero-copy" style={{ padding: '40px 0' }}>
            <span className="eyebrow">THE PREMIER NIGERIAN FASHION DIRECTORY</span>
            <h1 style={{ marginTop: '16px', marginBottom: '16px' }}>Find Nigeria’s finest fashion professionals.</h1>
            <p style={{ fontSize: '18px', color: '#e0d8cc' }}>Verified talent. Exceptional work. One trusted directory.</p>
            
            <div className="home-hero__desktop-search home-hero__search">
              <style dangerouslySetInnerHTML={{ __html: `
                .home-hero__search .search-dock { position: relative !important; inset: auto !important; transform: none !important; width: 100% !important; margin: 0 !important; }
                @media (max-width: 767px) {
                  .home-hero__desktop-search { display: none !important; }
                  .home-hero__mobile-actions { display: flex !important; flex-direction: column; gap: 12px; }
                }
              ` }} />
              <SearchDock />
            </div>

            <div className="home-hero__mobile-actions" style={{ display: 'none', marginTop: '24px' }}>
              <Link className="btn btn-gold" href="/directory" style={{ width: '100%', textAlign: 'center' }}>Find professionals</Link>
              <Link className="btn btn-outline-light" href="/add-business" style={{ width: '100%', textAlign: 'center' }}>List your business</Link>
            </div>
          </div>
          
          <div className="hero-image-wrap" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '80%', aspectRatio: '4/5', borderRadius: '16px', overflow: 'hidden' }}>
              <Image className="hero-image" src="/images/hero-editorial.jpg" alt="Nigerian fashion model" fill priority style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES AND CITIES */}
      <section className="section compact">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <div>
              <span className="eyebrow">Explore Nigerian fashion</span>
              <h2>Browse by speciality or discover talent in your city.</h2>
            </div>
          </div>
          
          <div className="category-shell" style={{ border: 'none', boxShadow: 'none', padding: 0, background: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Categories</h3>
              <Link className="text-link" href="/directory">View all categories <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="category-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '40px' }}>
              <Link className="category-card" style={{ border: '1px solid #dfd5c8', background: '#fff' }} href="/directory?category=designers"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-user"></use></svg></span><strong>Designers</strong></Link>
              <Link className="category-card" style={{ border: '1px solid #dfd5c8', background: '#fff' }} href="/directory?category=brands"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-bag"></use></svg></span><strong>Brands</strong></Link>
              <Link className="category-card" style={{ border: '1px solid #dfd5c8', background: '#fff' }} href="/directory?category=schools"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-school"></use></svg></span><strong>Schools</strong></Link>
              <Link className="category-card" style={{ border: '1px solid #dfd5c8', background: '#fff' }} href="/directory?category=stylists"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-spark"></use></svg></span><strong>Stylists</strong></Link>
              <Link className="category-card" style={{ border: '1px solid #dfd5c8', background: '#fff' }} href="/directory?category=bridal"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></span><strong>Bridal</strong></Link>
              <Link className="category-card" style={{ border: '1px solid #dfd5c8', background: '#fff' }} href="/directory?category=photographers"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-camera"></use></svg></span><strong>Photographers</strong></Link>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Cities</h3>
              <Link className="text-link" href="/directory">View all cities <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="city-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <Link className="city-card city-lagos" href="/directory?city=lagos"><span className="city-number">01</span><h3>Lagos</h3></Link>
              <Link className="city-card city-abuja" href="/directory?city=abuja"><span className="city-number">02</span><h3>Abuja</h3></Link>
              <Link className="city-card city-ph" href="/directory?city=port-harcourt"><span className="city-number">03</span><h3>Port Harcourt</h3></Link>
              <Link className="city-card city-benin" href="/directory?city=benin-city"><span className="city-number">04</span><h3>Benin City</h3></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROFESSIONALS */}
      {featuredList && featuredList.length > 0 && (
        <section className="section section-dark" style={{ background: '#0a0a0a' }}>
          <div className="container">
            <div className="section-head">
              <div><span className="eyebrow light">Professionals worth discovering</span><h2>Explore selected talent from across Nigeria.</h2></div>
              <Link className="text-link" href="/directory">View all professionals <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="designer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 1024px) and (min-width: 768px) {
                  .designer-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 767px) { 
                  .designer-grid { display: flex !important; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 16px; margin: 0 -20px; padding: 0 20px 16px; gap: 16px; }
                  .designer-grid .designer-card { flex: 0 0 85%; scroll-snap-align: center; }
                }
              ` }} />
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                featuredList.slice(0, 4).map((business: any) => (
                  <article className="designer-card" key={business.id} style={{ border: 'none', background: 'transparent' }}>
                    <div className="designer-media" style={{ height: 'auto', aspectRatio: '4/5', borderRadius: '12px' }}>
                      <Image src={business.cover_image_url || "/images/designer-blue.jpg"} alt={`${business.business_name}`} fill sizes="(max-width: 900px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
                      {business.is_sponsored && <div className="card-badges"><span className="badge" style={{ background: 'var(--gold)', color: '#000', border: 'none' }}>Sponsored</span></div>}
                      {business.verification_tier && business.verification_tier !== 'none' && !business.is_sponsored && <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>}
                    </div>
                    <div className="designer-body" style={{ marginTop: '16px', padding: 0 }}>
                      <h3 style={{ fontSize: '18px', color: '#fff' }}>{business.business_name}</h3>
                      <div className="location-line" style={{ margin: '4px 0 12px' }}>{business.business_categories?.[0]?.categories?.name || 'Professional'} · {business.city}</div>
                      <Link className="text-link" href={`/profile/${business.slug}`}>View profile <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
                    </div>
                  </article>
                ))
              }
            </div>
          </div>
        </section>
      )}

      {/* 4. HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="eyebrow">Find the right professional in three steps</span>
            <h2 style={{ textAlign: 'center' }}>Search. Compare. Connect.</h2>
          </div>
          <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px', textAlign: 'center' }}>
            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 767px) { .how-it-works-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
            ` }} />
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold)', color: '#000', display: 'grid', placeItems: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 auto 16px' }}>1</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Search</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '300px', margin: '0 auto' }}>Find professionals by category, city, or specific service.</p>
            </div>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold)', color: '#000', display: 'grid', placeItems: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 auto 16px' }}>2</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Compare</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '300px', margin: '0 auto' }}>Review verified profiles, portfolios, and customer feedback.</p>
            </div>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold)', color: '#000', display: 'grid', placeItems: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0 auto 16px' }}>3</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Connect</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '300px', margin: '0 auto' }}>Contact the right person with a clear brief and secure a booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST AND VERIFICATION */}
      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="eyebrow">Trust built into every discovery</span>
            <h2 style={{ textAlign: 'center' }}>Clear profiles for customers. Meaningful verification for professionals.</h2>
          </div>
          <div className="journey-grid" style={{ marginTop: '40px' }}>
            <article className="journey-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="kicker">For customers</span>
              <h3 style={{ fontSize: '32px' }}>Find with confidence.</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Review approved profiles, portfolios and service information.</p>
              <div style={{ marginTop: '24px' }}>
                <Link className="text-link" href="/directory">Find professionals <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
              </div>
            </article>
            <article className="journey-card dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="kicker gold">For professionals</span>
              <h3 style={{ fontSize: '32px' }}>Stand out as verified.</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Complete our review and earn the verification badge.</p>
              <div style={{ marginTop: '24px' }}>
                <Link className="text-link" style={{ color: 'var(--gold)' }} href="/verification">Learn about verification <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. EXPLORE OPPORTUNITIES (Desktop Only) */}
      <section className="section explore-opportunities-section" style={{ display: 'block' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 767px) { .explore-opportunities-section { display: none !important; } }
        ` }} />
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">More from Nigerian fashion</span><h2>Shop, learn and discover new opportunities.</h2></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <Link href="/#newsletter-email" style={{ background: '#fff', border: '1px solid #dfd5c8', borderRadius: '16px', padding: '32px', display: 'block', transition: '0.2s', textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Marketplace launching soon</h3>
              <p style={{ color: 'var(--muted)' }}>Join the launch list as verified Nigerian designers, brands and independent makers are added.</p>
            </Link>
            <Link href="/jobs" style={{ background: '#fff', border: '1px solid #dfd5c8', borderRadius: '16px', padding: '32px', display: 'block', transition: '0.2s', textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Jobs</h3>
              <p style={{ color: 'var(--muted)' }}>Find roles across the fashion industry.</p>
            </Link>
            <Link href="/events" style={{ background: '#fff', border: '1px solid #dfd5c8', borderRadius: '16px', padding: '32px', display: 'block', transition: '0.2s', textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Events</h3>
              <p style={{ color: 'var(--muted)' }}>Shows, exhibitions, and gatherings.</p>
            </Link>
            <Link href="/directory?category=schools" style={{ background: '#fff', border: '1px solid #dfd5c8', borderRadius: '16px', padding: '32px', display: 'block', transition: '0.2s', textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Schools</h3>
              <p style={{ color: 'var(--muted)' }}>Start or advance your fashion education.</p>
            </Link>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link className="text-link" href="/journal">Read the StyleAtlas Journal <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
        </div>
      </section>

      {/* 7. BUSINESS CTA */}
      <section className="section compact">
        <div className="container">
          <div className="business-cta" style={{ background: '#0a0a0a', border: 'none', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 767px) { .business-cta { grid-template-columns: 1fr !important; display: flex !important; flex-direction: column-reverse !important; } .business-cta > div { padding: 32px !important; } .business-cta .hero-actions-wrap { flex-direction: column !important; width: 100%; gap: 12px; } .business-cta .hero-actions-wrap a { width: 100%; text-align: center; } }
            ` }} />
            <div className="business-copy" style={{ padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="eyebrow light">For businesses</span>
              <h2 style={{ fontSize: '42px', color: '#fff', margin: '0 0 16px' }}>Put your fashion business where Nigeria can find it.</h2>
              <p style={{ color: '#aaa', margin: '0 0 32px', maxWidth: '100%' }}>Showcase your work and reach new customers searching for your specific services.</p>
              <div className="hero-actions-wrap" style={{ display: 'flex', gap: '16px' }}>
                <Link className="btn btn-gold" href="/add-business">List your business</Link>
                <Link className="btn btn-outline-light" href="/pricing">View membership plans</Link>
              </div>
            </div>
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
              <Image src="/images/fashion-studio.jpg" alt="Nigerian fashion studio" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SaveButton from "@/components/ui/SaveButton";
import CompareButton from "@/components/ui/CompareButton";
import StatCounter from "@/components/ui/StatCounter";
import ConciergeWidget from "@/components/ui/ConciergeWidget";
import SearchDock from "@/components/ui/SearchDock";
export const dynamic = 'force-dynamic';

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
      business_categories(
        categories(name)
      )
    `)
    .eq('business_type', 'designer')
    .limit(5); // Increased to 5 so we have 1 large and 4 small

  const { data: rawAds } = await supabase
    .from('promoted_campaigns')
    .select(`
      id,
      businesses!inner(id, business_name, slug, city, state, cover_image_url, is_verified, rating, review_count, business_categories(categories(name)))
    `)
    .eq('status', 'active');
  
  // Extract business objects from the ads wrapper and flag them as sponsored
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adBusinesses = rawAds ? rawAds.map((ad: any) => ({ ...ad.businesses, is_sponsored: true })) : [];
  const featuredList = [...adBusinesses, ...(businesses || [])].slice(0, 6); // Up to 6 items on the homepage
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Curated. Trusted. Distinctly Nigerian.</span>
            <h1>Find the talent behind your <em>next unforgettable look.</em></h1>
            <p>Explore verified designers, luxury brands, bridal ateliers, stylists, schools and fashion professionals shaping Nigeria&apos;s creative future.</p>
            <div className="hero-actions">
              <Link className="btn btn-gold" href="/directory">Explore fashion talent 
                <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg>
              </Link>
              <Link className="btn btn-outline-light" href="/add-business">List your fashion business</Link>
            </div>
          </div>
          <div className="hero-image-wrap">
            <Image className="hero-image" src="/images/hero-editorial.jpg" alt="Nigerian fashion model in a contemporary patterned dress" fill priority style={{ objectFit: 'cover' }} />
            <div className="hero-note"><strong>01 / 26</strong><span>STYLEATLAS editorial selection</span></div>
          </div>
        </div>
        <SearchDock />
      </section>

      <section className="stats-ribbon">
        <div className="container stats-grid">
          <StatCounter endValue={25000} suffix="+" label="Verified professionals" />
          <StatCounter endValue={10000} suffix="+" label="Fashion businesses" />
          <StatCounter endValue={150} suffix="+" label="Fashion schools" />
          <StatCounter endValue={300} suffix="+" label="Fashion events" />
          <StatCounter endValue={50000} suffix="+" label="Monthly connections" />
          <StatCounter endValue={36} suffix="" label="States covered" />
        </div>
      </section>
      
      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Browse by expertise</span><h2>Every part of Nigerian fashion, in one beautifully mapped place.</h2></div>
            <p>Move from inspiration to a trusted professional without starting your search again.</p>
          </div>
          <div className="category-shell">
            <div className="category-grid">
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-user"></use></svg></span><strong>Designers</strong><span>25,000+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-bag"></use></svg></span><strong>Brands</strong><span>10,000+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-school"></use></svg></span><strong>Schools</strong><span>150+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-spark"></use></svg></span><strong>Stylists</strong><span>2,500+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></span><strong>Bridal experts</strong><span>1,800+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-scissors"></use></svg></span><strong>Tailors</strong><span>8,300+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-camera"></use></svg></span><strong>Photographers</strong><span>1,000+</span></Link>
              <Link className="category-card" href="/directory"><span className="category-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-grid"></use></svg></span><strong>View all</strong><span>16 categories</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow light">STYLEATLAS selection</span><h2>Featured designers worth knowing before everyone else does.</h2></div>
            <Link className="text-link" href="/directory">View all designers <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
          <div className="designer-grid" style={{ gridAutoRows: 'minmax(min-content, max-content)' }}>
            {featuredList && featuredList.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              featuredList.map((business: any, idx: number) => {
                // Introduce an asymmetric layout: the first item is large, spanning full width or 2 columns
                const isFeatured = idx === 0;
                
                return (
                  <article 
                    className="designer-card" 
                    key={business.id}
                    style={isFeatured ? { gridColumn: '1 / -1', display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' } : {}}
                  >
                    <div className="designer-media" style={isFeatured ? { flex: '1', height: '400px' } : {}}>
                      <Image src={business.cover_image_url || "/images/designer-blue.jpg"} alt={`${business.business_name}`} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      {business.is_sponsored && <div className="card-badges" style={{ left: '10px', right: 'auto' }}><span className="badge" style={{ background: 'var(--gold)', color: '#000', border: 'none' }}>Sponsored</span></div>}
                      {business.is_verified && !business.is_sponsored && <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>}
                      <SaveButton businessId={business.id} businessName={business.business_name} />
                    </div>
                    <div className="designer-body" style={isFeatured ? { flex: '1' } : {}}>
                      <h3 style={isFeatured ? { fontSize: '2.5rem', marginBottom: '1rem' } : {}}>{business.business_name} {business.is_verified && <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>}</h3>
                      <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>{business.city}, {business.state}</div>
                      
                      {isFeatured && (
                        <p style={{ margin: '1rem 0', color: 'var(--gray-400)', fontSize: '1.1rem' }}>
                          A masterclass in modern Nigerian tailoring, delivering exceptional quality and unparalleled attention to detail for clients worldwide.
                        </p>
                      )}

                      <div className="tag-row">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {business.business_categories?.slice(0, 2).map((bc: any, i: number) => (
                          <span key={i} className="tag">{bc.categories?.name}</span>
                        ))}
                      </div>
                      <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>{Number(business.rating || 0).toFixed(1)} · {business.review_count || 0} reviews</span><span className="price-level">₦₦₦</span></div>
                      <div className="card-actions">
                        <Link className="btn btn-gold btn-sm" href={`/profile/${business.slug || 'amina-danjuma'}`}>View profile</Link>
                        <CompareButton businessId={business.id} businessName={business.business_name} />
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
                <p>No featured designers available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Moved STORIES section UP to increase prominence */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
            <div><span className="eyebrow">STYLEATLAS journal</span><h2 style={{ fontSize: '3rem' }}>Stories that explain the craft, business and culture behind the clothes.</h2></div>
            <Link className="text-link" href="/article">Read all stories <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
          <div className="story-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <article className="story-card" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <Image src="/images/designer-green.jpg" alt="Ankara couture" width={800} height={600} style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '8px' }} />
              <div className="story-body">
                <span className="meta" style={{ marginBottom: '1rem', display: 'block', color: 'var(--gold)', fontWeight: 'bold' }}>Design · 7 min read</span>
                <h3 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>The designers making Ankara feel new again</h3>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2rem' }}>Inside the studios treating pattern as architecture rather than decoration, redefining what traditional wear looks like on the global stage.</p>
                <div className="story-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                    <span style={{ fontWeight: 500 }}>By Zainab Musa</span>
                  </div>
                  <span className="muted">July 22, 2026</span>
                </div>
              </div>
            </article>
            <article className="story-card">
              <Image src="/images/designer-bridal.jpg" alt="Bridal fashion" width={800} height={600} style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div className="story-body">
                <span className="meta">Bridal · 6 min read</span>
                <h3 style={{ fontSize: '1.5rem' }}>How to choose a bridal designer</h3>
                <p>A practical guide to timelines, fittings, budgets and creative fit.</p>
                <div className="story-footer"><span>Ada Ibe</span><span>July 18</span></div>
              </div>
            </article>
            <article className="story-card">
              <Image src="/images/fashion-studio.jpg" alt="Fashion studio" width={800} height={600} style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div className="story-body">
                <span className="meta">Business · 9 min read</span>
                <h3 style={{ fontSize: '1.5rem' }}>A stronger fashion studio</h3>
                <p>Processes that protect the designer, the team and the client.</p>
                <div className="story-footer"><span>Kemi Falade</span><span>July 12</span></div>
              </div>
            </article>
            <article className="story-card">
              <Image src="/images/designer-menswear.jpg" alt="Nigerian menswear" width={800} height={600} style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover' }} />
              <div className="story-body">
                <span className="meta">Menswear · 5 min read</span>
                <h3 style={{ fontSize: '1.5rem' }}>Contemporary kaftans</h3>
                <p>The cut, cloth and cultural confidence behind the shift.</p>
                <div className="story-footer"><span>Tobi Akin</span><span>July 8</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Curated inspiration</span><h2>Start with a feeling. Find the people who can create it.</h2></div>
            <p>Editorial collections turn broad ideas into a direct path to designers, brands and specialists.</p>
          </div>
          {/* Implement masonry / asymmetric layout for editorial inspiration */}
          <div className="editorial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 300px)', gap: '1rem' }}>
            <Link className="editorial-card" href="/article" style={{ gridColumn: '1 / 3', gridRow: '1 / 3', position: 'relative' }}>
              <Image src="/images/designer-green.jpg" alt="Green Nigerian couture" fill style={{ objectFit: 'cover' }} />
              <div className="editorial-copy" style={{ position: 'absolute', bottom: 0, left: 0, padding: '2rem', zIndex: 2 }}>
                <span className="eyebrow">The new classics</span>
                <h3 style={{ fontSize: '2.5rem' }}>Ankara, reimagined</h3>
                <p>Designers pushing familiar textiles into sculptural, modern territory.</p>
              </div>
            </Link>
            <Link className="editorial-card" href="/directory" style={{ gridColumn: '3 / 4', gridRow: '1 / 2', position: 'relative' }}>
              <Image src="/images/designer-bridal.jpg" alt="Modern Nigerian bride" fill style={{ objectFit: 'cover' }} />
              <div className="editorial-copy" style={{ position: 'absolute', bottom: 0, left: 0, padding: '2rem', zIndex: 2 }}><span className="eyebrow">Occasion</span><h3>Modern bridal</h3></div>
            </Link>
            <Link className="editorial-card" href="/directory" style={{ gridColumn: '3 / 4', gridRow: '2 / 3', position: 'relative' }}>
              <Image src="/images/designer-menswear.jpg" alt="Nigerian menswear" fill style={{ objectFit: 'cover' }} />
              <div className="editorial-copy" style={{ position: 'absolute', bottom: 0, left: 0, padding: '2rem', zIndex: 2 }}><span className="eyebrow">Menswear</span><h3>New tradition</h3></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Discover by city</span><h2>Fashion scenes shaped by place, culture and pace.</h2></div>
            <Link className="text-link" href="/directory">View all cities <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
          <div className="city-grid">
            <Link className="city-card city-lagos" href="/directory"><span className="city-number">01</span><h3>Lagos</h3><p>8,500+ designers and brands</p></Link>
            <Link className="city-card city-abuja" href="/directory"><span className="city-number">02</span><h3>Abuja</h3><p>3,200+ fashion businesses</p></Link>
            <Link className="city-card city-ph" href="/directory"><span className="city-number">03</span><h3>Port Harcourt</h3><p>1,100+ professionals</p></Link>
            <Link className="city-card city-benin" href="/directory"><span className="city-number">04</span><h3>Benin City</h3><p>960+ fashion businesses</p></Link>
            <Link className="city-card city-enugu" href="/directory"><span className="city-number">05</span><h3>Enugu</h3><p>720+ professionals</p></Link>
            <Link className="city-card city-kano" href="/directory"><span className="city-number">06</span><h3>Kano</h3><p>1,400+ designers and stores</p></Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="spotlight">
            <div className="spotlight-copy">
              <span className="eyebrow light">Designer spotlight</span>
              <h2>Amina Danjuma</h2>
              <p>Her Abuja atelier combines restrained silhouettes, intricate surface work and the quiet confidence of clothes made for women who already know who they are.</p>
              <div className="spotlight-stats">
                <div className="spotlight-stat"><strong>12 yrs</strong><span>in practice</span></div>
                <div className="spotlight-stat"><strong>4.9</strong><span>client rating</span></div>
                <div className="spotlight-stat"><strong>3 wks</strong><span>average lead time</span></div>
              </div>
              <div className="spotlight-actions">
                <Link className="btn btn-gold" href="/profile/amina-danjuma">View full profile</Link>
                <button className="btn btn-outline-light"><svg className="icon"><use href="/icons/sprite.svg#icon-play"></use></svg>Watch studio story</button>
              </div>
            </div>
            <div className="spotlight-gallery" style={{ display: 'flex', gap: '10px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', flex: 1, minHeight: '300px' }}><Image src="/images/designer-blue.jpg" alt="Amina Danjuma portrait" fill style={{ objectFit: 'cover' }} /></div>
              <div style={{ position: 'relative', flex: 1, minHeight: '300px' }}><Image src="/images/bridal-black.jpg" alt="Black Nigerian occasionwear" fill style={{ objectFit: 'cover' }} /></div>
              <div style={{ position: 'relative', flex: 1, minHeight: '300px' }}><Image src="/images/fashion-couple.jpg" alt="Nigerian ceremonial fashion" fill style={{ objectFit: 'cover' }} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">How STYLEATLAS works</span><h2>A clearer path for clients. A stronger presence for fashion businesses.</h2></div>
          </div>
          <div className="journey-grid">
            <article className="journey-card">
              <span className="kicker">For customers</span>
              <h3>Go from idea to trusted expert.</h3>
              <p>Search by what matters, compare real information and contact the right person with a useful brief.</p>
              <div className="step-list">
                <div className="step"><strong>1</strong><span>Search</span></div><div className="step"><strong>2</strong><span>Compare</span></div><div className="step"><strong>3</strong><span>Connect</span></div><div className="step"><strong>4</strong><span>Book</span></div><div className="step"><strong>5</strong><span>Review</span></div>
              </div>
              <Link className="btn btn-dark" href="/directory">Start exploring</Link>
            </article>
            <article className="journey-card dark">
              <span className="kicker gold">For fashion businesses</span>
              <h3>Be found for the work you do best.</h3>
              <p>Show your portfolio, explain your process, receive better enquiries and build trust before the first conversation.</p>
              <div className="step-list">
                <div className="step"><strong>1</strong><span>Create</span></div><div className="step"><strong>2</strong><span>Verify</span></div><div className="step"><strong>3</strong><span>Publish</span></div><div className="step"><strong>4</strong><span>Respond</span></div><div className="step"><strong>5</strong><span>Grow</span></div>
              </div>
              <Link className="btn btn-gold" href="/add-business">Build your profile</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Verified client stories</span><h2>Good work earns more than attention. It earns trust.</h2></div>
          </div>
          <div className="review-grid">
            <article className="review-card featured">
              <div className="review-person"><Image className="review-avatar" src="/images/designer-blue.jpg" alt="Amaka client portrait" width={48} height={48} style={{ borderRadius: '50%' }} /><div><strong>Amaka O.</strong><span>Lagos · Verified bridal client</span></div></div>
              <div className="review-stars">★★★★★</div>
              <blockquote>“I felt heard from the first sketch. My dress looked like me, not like a copy of someone else&apos;s wedding.”</blockquote>
              <div className="review-context">Reviewed Ifeoma Atelier</div>
            </article>
            <article className="review-card">
              <div className="review-person"><Image className="review-avatar" src="/images/designer-menswear.jpg" alt="Tunde client portrait" width={48} height={48} style={{ borderRadius: '50%' }} /><div><strong>Tunde B.</strong><span>Abuja · Verified menswear client</span></div></div>
              <div className="review-stars">★★★★★</div>
              <blockquote>“The fit was precise, the communication was calm, and the final agbada arrived two days early.”</blockquote>
              <div className="review-context">Reviewed Yusuf Bello</div>
            </article>
            <article className="review-card">
              <div className="review-person"><Image className="review-avatar" src="/images/designer-green.jpg" alt="Bisi client portrait" width={48} height={48} style={{ borderRadius: '50%' }} /><div><strong>Bisi A.</strong><span>Port Harcourt · Verified occasionwear client</span></div></div>
              <div className="review-stars">★★★★★</div>
              <blockquote>“The profile made it easy to understand pricing before I sent an enquiry.”</blockquote>
              <div className="review-context">Reviewed Adaeze Okoli</div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="concierge">
            <div>
              <span className="eyebrow light">STYLEATLAS concierge</span>
              <h2>Tell us the moment. We&apos;ll narrow the map.</h2>
              <p>Choose your event, city, budget and style. The guided concierge matches those details against relevant profile information.</p>
              <Link className="btn btn-gold" href="/concierge">Find my fashion expert</Link>
            </div>
            <ConciergeWidget />
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="business-cta">
            <img src="/images/fashion-studio.jpg" alt="Nigerian fashion studio founders" />
            <div className="business-copy">
              <span className="eyebrow light">For designers, brands and schools</span>
              <h2>Put your fashion business where Nigeria can find it.</h2>
              <p>Build a trusted profile, show your strongest work, receive better enquiries and reach customers already searching for your exact services.</p>
              <div className="business-benefits">
                <span className="benefit-pill"><svg className="icon"><use href="/icons/sprite.svg#icon-check"></use></svg>Professional profile</span>
                <span className="benefit-pill"><svg className="icon"><use href="/icons/sprite.svg#icon-check"></use></svg>Qualified enquiries</span>
                <span className="benefit-pill"><svg className="icon"><use href="/icons/sprite.svg#icon-check"></use></svg>Portfolio and analytics</span>
              </div>
              <div>
                <Link className="btn btn-gold" href="/add-business">Add your business</Link>
                <Link className="btn btn-outline-light" href="/pricing" style={{ marginLeft: '10px' }}>View business plans</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

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
    .limit(6); 

  const { data: rawAds } = await supabase
    .from('promoted_campaigns')
    .select(`
      id,
      businesses!inner(id, business_name, slug, city, state, cover_image_url, is_verified, rating, review_count, business_categories(categories(name)))
    `)
    .eq('status', 'active');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adBusinesses = rawAds ? rawAds.map((ad: any) => ({ ...ad.businesses, is_sponsored: true })) : [];
  const featuredList = [...adBusinesses, ...(businesses || [])].slice(0, 6); 

  return (
    <main className="mobile-app-layout">
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">The Premier Nigerian Fashion Directory</span>
            <h1>Find the talent behind your <em>next unforgettable look.</em></h1>
            <p>Explore verified designers, luxury brands, bridal ateliers, stylists, schools and fashion professionals shaping Nigeria's creative future.</p>
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

      {/* 2. STATS RIBBON */}
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
      
      {/* 3. CATEGORIES */}
      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Browse Top Categories</span><h2>Every part of Nigerian fashion, in one beautifully mapped place.</h2></div>
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

      {/* 4. FEATURED BUSINESSES */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow light">Featured Businesses</span><h2>Featured designers worth knowing before everyone else does.</h2></div>
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
                    {business.is_verified && !business.is_sponsored && <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>}
                    <SaveButton businessId={business.id} businessName={business.business_name} />
                  </div>
                  <div className="designer-body">
                    <h3>{business.business_name} {business.is_verified && <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>}</h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>{business.city}, {business.state}</div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>{Number(business.rating || 0).toFixed(1)} · {business.review_count || 0} reviews</span><span className="price-level">₦₦₦</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href={`/profile/${business.slug || 'amina-danjuma'}`}>View profile</Link>
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

      {/* 5. CURATED INSPIRATION */}
      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Curated inspiration</span><h2>Start with a feeling. Find the people who can create it.</h2></div>
            <p>Editorial collections turn broad ideas into a direct path to designers, brands and specialists.</p>
          </div>
          <div className="editorial-grid">
            <Link className="editorial-card" href="/article">
              <Image src="/images/designer-green.jpg" alt="Green Nigerian couture" fill style={{ objectFit: 'cover' }} />
              <div className="editorial-copy">
                <span className="eyebrow">The new classics</span>
                <h3>Ankara, reimagined</h3>
                <p>Designers pushing familiar textiles into sculptural, modern territory.</p>
              </div>
            </Link>
            <Link className="editorial-card" href="/directory">
              <Image src="/images/designer-bridal.jpg" alt="Modern Nigerian bride" fill style={{ objectFit: 'cover' }} />
              <div className="editorial-copy"><span className="eyebrow">Occasion</span><h3>Modern bridal</h3></div>
            </Link>
            <Link className="editorial-card" href="/directory">
              <Image src="/images/designer-menswear.jpg" alt="Nigerian menswear" fill style={{ objectFit: 'cover' }} />
              <div className="editorial-copy"><span className="eyebrow">Menswear</span><h3>New tradition</h3></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. DISCOVER BY CITY */}
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

      {/* 7. DESIGNER SPOTLIGHT */}
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
            <div className="spotlight-gallery">
              <div style={{ position: 'relative', flex: 1, minHeight: '300px' }}><Image src="/images/designer-blue.jpg" alt="Amina Danjuma portrait" fill style={{ objectFit: 'cover' }} /></div>
              <div style={{ position: 'relative', flex: 1, minHeight: '300px' }}><Image src="/images/bridal-black.jpg" alt="Black Nigerian occasionwear" fill style={{ objectFit: 'cover' }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ONE CONNECTED PLATFORM (Added from mockup) */}
      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">One Connected Platform</span><h2>Search, shop, learn, work and show up where fashion happens.</h2></div>
            <p>Each area feeds the next. A school can post a course, a graduate can find a job, and a designer can reach a client.</p>
          </div>
          <div className="platform-grid">
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-bag"></use></svg></div>
              <h3>Marketplace</h3>
              <p>Shop ready-to-wear, accessories and made-to-order pieces from Nigerian labels.</p>
              <div className="platform-list">
                <div className="platform-item"><div className="platform-item-img bg-green"></div><div><strong>Emerald Ankara Dress</strong><span>₦45,000</span></div></div>
                <div className="platform-item"><div className="platform-item-img bg-red"></div><div><strong>Contemporary kaftan</strong><span>₦85,000</span></div></div>
              </div>
              <Link className="text-link" href="/marketplace">Shop the marketplace <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-user"></use></svg></div>
              <h3>Fashion jobs</h3>
              <p>Roles for designers, pattern makers, tailors, shop floors and creative directors.</p>
              <div className="platform-list">
                <div className="platform-item"><div className="platform-item-img bg-dark"></div><div><strong>Senior Pattern Cutter</strong><span>Lagos · Full-time</span></div></div>
                <div className="platform-item"><div className="platform-item-img bg-dark"></div><div><strong>Brand Content Lead</strong><span>Remote · Contract</span></div></div>
              </div>
              <Link className="text-link" href="/jobs">View fashion jobs <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-calendar"></use></svg></div>
              <h3>Upcoming events</h3>
              <p>Shows, exhibitions and business gatherings.</p>
              <div className="platform-list">
                <div className="platform-item"><div className="platform-item-img bg-gold"></div><div><strong>Lagos Fashion Week</strong><span>Oct 24-28, Lagos</span></div></div>
              </div>
              <Link className="text-link" href="/events">Explore events <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
            <div className="platform-card">
              <div className="platform-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-school"></use></svg></div>
              <h3>Fashion schools</h3>
              <p>Creative programmes, short courses and graduate initiatives before applying.</p>
              <Link className="text-link" href="/directory">Compare schools <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOW STYLEATLAS WORKS */}
      <section className="section">
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

      {/* 10. REVIEWS */}
      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Verified client stories</span><h2>Good work earns more than attention. It earns trust.</h2></div>
          </div>
          <div className="review-grid">
            <article className="review-card featured">
              <div className="review-person"><Image className="review-avatar" src="/images/designer-blue.jpg" alt="Amaka client portrait" width={48} height={48} style={{ borderRadius: '50%' }} /><div><strong>Amaka O.</strong><span>Lagos · Verified bridal client</span></div></div>
              <div className="review-stars">★★★★★</div>
              <blockquote>“I felt heard from the first sketch. My dress looked like me, not like a copy of someone else's wedding.”</blockquote>
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

      {/* 11. CONCIERGE */}
      <section className="section section-dark">
        <div className="container">
          <div className="concierge">
            <div>
              <span className="eyebrow light">STYLEATLAS concierge</span>
              <h2>Tell us the moment. We'll narrow the map.</h2>
              <p>Choose your event, city, budget and style. The guided concierge matches those details against relevant profile information.</p>
              <Link className="btn btn-gold" href="/concierge" style={{ marginTop: '1.5rem' }}>Find my fashion expert</Link>
            </div>
            <ConciergeWidget />
          </div>
        </div>
      </section>

      {/* 12. STORIES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">STYLEATLAS journal</span><h2>Stories that explain the craft, business and culture behind the clothes.</h2></div>
            <Link className="text-link" href="/article">Read all stories <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
          <div className="story-grid">
            <article className="story-card">
              <Image src="/images/designer-green.jpg" alt="Ankara couture" width={800} height={600} />
              <div className="story-body">
                <span className="meta">Design · 7 min read</span>
                <h3>The designers making Ankara feel new again</h3>
                <p>Inside the studios treating pattern as architecture rather than decoration, redefining what traditional wear looks like on the global stage.</p>
                <div className="story-footer"><span>By Zainab Musa</span><span>July 22</span></div>
              </div>
            </article>
            <article className="story-card">
              <Image src="/images/designer-bridal.jpg" alt="Bridal fashion" width={800} height={600} />
              <div className="story-body">
                <span className="meta">Bridal · 6 min read</span>
                <h3>How to choose a bridal designer</h3>
                <p>A practical guide to timelines, fittings, budgets and creative fit.</p>
                <div className="story-footer"><span>Ada Ibe</span><span>July 18</span></div>
              </div>
            </article>
            <article className="story-card">
              <Image src="/images/fashion-studio.jpg" alt="Fashion studio" width={800} height={600} />
              <div className="story-body">
                <span className="meta">Business · 9 min read</span>
                <h3>A stronger fashion studio</h3>
                <p>Processes that protect the designer, the team and the client.</p>
                <div className="story-footer"><span>Kemi Falade</span><span>July 12</span></div>
              </div>
            </article>
            <article className="story-card">
              <Image src="/images/designer-menswear.jpg" alt="Nigerian menswear" width={800} height={600} />
              <div className="story-body">
                <span className="meta">Menswear · 5 min read</span>
                <h3>Contemporary kaftans</h3>
                <p>The cut, cloth and cultural confidence behind the shift.</p>
                <div className="story-footer"><span>Tobi Akin</span><span>July 8</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 13. BUSINESS CTA */}
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

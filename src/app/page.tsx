import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Curated. Trusted. Distinctly Nigerian.</span>
            <h1>Find the talent behind your <em>next unforgettable look.</em></h1>
            <p>Explore verified designers, luxury brands, bridal ateliers, stylists, schools and fashion professionals shaping Nigeria's creative future.</p>
            <div className="hero-actions">
              <Link className="btn btn-gold" href="/directory">Explore fashion talent 
                <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg>
              </Link>
              <Link className="btn btn-outline-light" href="/add-business">List your fashion business</Link>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src="/images/hero-editorial.jpg" alt="Nigerian fashion model in a contemporary patterned dress" />
            <div className="hero-note"><strong>01 / 26</strong><span>STYLEATLAS editorial selection</span></div>
          </div>
        </div>
        <form className="search-dock">
          <div className="search-tabs">
            <button type="button" className="search-tab active">I'm looking for</button>
            <button type="button" className="search-tab">A designer</button>
            <button type="button" className="search-tab">A brand</button>
            <button type="button" className="search-tab">A school</button>
            <button type="button" className="search-tab">A stylist</button>
          </div>
          <div className="search-row">
            <div className="search-field">
              <svg className="icon"><use href="/icons/sprite.svg#icon-search"></use></svg>
              <div><label>What do you need?</label><input placeholder="Bridal designer, stylist, tailor..." /></div>
            </div>
            <div className="search-field">
              <svg className="icon"><use href="/icons/sprite.svg#icon-scissors"></use></svg>
              <div>
                <label>Category</label>
                <select><option>All categories</option><option>Designers</option><option>Brands</option><option>Fashion schools</option></select>
              </div>
            </div>
            <div className="search-field">
              <svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>
              <div>
                <label>Location</label>
                <select><option>All cities</option><option>Lagos</option><option>Abuja</option><option>Benin City</option></select>
              </div>
            </div>
            <div className="search-field">
              <svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>
              <div>
                <label>Speciality</label>
                <select><option>All styles</option><option>Luxury bridal</option><option>Menswear</option><option>Ready-to-wear</option></select>
              </div>
            </div>
            <button className="search-submit" aria-label="Search" type="button"><svg className="icon"><use href="/icons/sprite.svg#icon-search"></use></svg></button>
          </div>
          <div className="trending-searches">
            <span>Popular now:</span>
            <Link href="/directory">Bridal designers in Lagos</Link>
            <Link href="/directory">Abuja menswear</Link>
            <Link href="/directory">Luxury ready-to-wear</Link>
            <Link href="/directory">Fashion schools</Link>
          </div>
        </form>
      </section>

      <section className="stats-ribbon">
        <div className="container stats-grid">
          <div className="stat"><strong>25,000+</strong><span>Verified professionals</span></div>
          <div className="stat"><strong>10,000+</strong><span>Fashion businesses</span></div>
          <div className="stat"><strong>150+</strong><span>Fashion schools</span></div>
          <div className="stat"><strong>300+</strong><span>Fashion events</span></div>
          <div className="stat"><strong>50k+</strong><span>Monthly connections</span></div>
          <div className="stat"><strong>36</strong><span>States covered</span></div>
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
          <div className="designer-grid">
            <article className="designer-card">
              <div className="designer-media">
                <img src="/images/designer-blue.jpg" alt="Amina Danjuma in blue Nigerian couture" />
                <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                <button className="save-btn" aria-label="Save Amina Danjuma"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
              </div>
              <div className="designer-body">
                <h3>Amina Danjuma <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Abuja, FCT</div>
                <div className="tag-row"><span className="tag">Luxury modest wear</span><span className="tag">Bespoke</span></div>
                <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.9 · 128 reviews</span><span className="price-level">₦₦₦</span></div>
                <div className="card-actions">
                  <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                  <button className="compare-btn" aria-label="Compare Amina"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                </div>
              </div>
            </article>
            <article className="designer-card">
              <div className="designer-media">
                <img src="/images/designer-menswear.jpg" alt="Yusuf Bello in contemporary Nigerian menswear" />
                <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                <button className="save-btn" aria-label="Save Yusuf Bello"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
              </div>
              <div className="designer-body">
                <h3>Yusuf Bello <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Kano, Nigeria</div>
                <div className="tag-row"><span className="tag">Agbada</span><span className="tag">Modern menswear</span></div>
                <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.8 · 96 reviews</span><span className="price-level">₦₦</span></div>
                <div className="card-actions">
                  <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                  <button className="compare-btn" aria-label="Compare Yusuf"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                </div>
              </div>
            </article>
            <article className="designer-card">
              <div className="designer-media">
                <img src="/images/designer-bridal.jpg" alt="Nigerian bridal designer portrait" />
                <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                <button className="save-btn" aria-label="Save Ifeoma"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
              </div>
              <div className="designer-body">
                <h3>Ifeoma Atelier <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Lekki, Lagos</div>
                <div className="tag-row"><span className="tag">Bridal couture</span><span className="tag">Beadwork</span></div>
                <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>5.0 · 214 reviews</span><span className="price-level">₦₦₦₦</span></div>
                <div className="card-actions">
                  <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                  <button className="compare-btn" aria-label="Compare Ifeoma"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                </div>
              </div>
            </article>
            <article className="designer-card">
              <div className="designer-media">
                <img src="/images/designer-green.jpg" alt="Adaeze Okoli in green Ankara couture" />
                <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                <button className="save-btn" aria-label="Save Adaeze"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
              </div>
              <div className="designer-body">
                <h3>Adaeze Okoli <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Benin City, Edo</div>
                <div className="tag-row"><span className="tag">Ankara couture</span><span className="tag">Occasionwear</span></div>
                <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.7 · 83 reviews</span><span className="price-level">₦₦₦</span></div>
                <div className="card-actions">
                  <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                  <button className="compare-btn" aria-label="Compare Adaeze"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Curated inspiration</span><h2>Start with a feeling. Find the people who can create it.</h2></div>
            <p>Editorial collections turn broad ideas into a direct path to designers, brands and specialists.</p>
          </div>
          <div className="editorial-grid">
            <Link className="editorial-card" href="/article">
              <img src="/images/designer-green.jpg" alt="Green Nigerian couture" />
              <div className="editorial-copy">
                <span className="eyebrow">The new classics</span>
                <h3>Ankara, reimagined</h3>
                <p>Designers pushing familiar textiles into sculptural, modern territory.</p>
              </div>
            </Link>
            <Link className="editorial-card" href="/directory">
              <img src="/images/designer-bridal.jpg" alt="Modern Nigerian bride" />
              <div className="editorial-copy"><span className="eyebrow">Occasion</span><h3>Modern bridal</h3></div>
            </Link>
            <Link className="editorial-card" href="/directory">
              <img src="/images/designer-menswear.jpg" alt="Nigerian menswear" />
              <div className="editorial-copy"><span className="eyebrow">Menswear</span><h3>New tradition</h3></div>
            </Link>
            <Link className="editorial-card" href="/marketplace">
              <img src="/images/fashion-studio.jpg" alt="Nigerian fashion studio" />
              <div className="editorial-copy">
                <span className="eyebrow">Independent labels</span>
                <h3>Made in Nigerian studios</h3>
                <p>Small teams, thoughtful production and clothes with a clear point of view.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section compact section-ivory-2">
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
                <Link className="btn btn-gold" href="/profile">View full profile</Link>
                <button className="btn btn-outline-light"><svg className="icon"><use href="/icons/sprite.svg#icon-play"></use></svg>Watch studio story</button>
              </div>
            </div>
            <div className="spotlight-gallery">
              <img src="/images/designer-blue.jpg" alt="Amina Danjuma portrait" />
              <img src="/images/bridal-black.jpg" alt="Black Nigerian occasionwear" />
              <img src="/images/fashion-couple.jpg" alt="Nigerian ceremonial fashion" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">One connected platform</span><h2>Search, shop, learn, work and show up where fashion happens.</h2></div>
            <p>Each area feeds the next. A school can post a course, a graduate can find a job, and a designer can reach a client.</p>
          </div>
          <div className="service-hub">
            <article className="service-column">
              <div className="service-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-bag"></use></svg></div>
              <h3>Marketplace</h3>
              <p>Shop ready-to-wear, accessories and made-to-order pieces from Nigerian labels.</p>
              <div className="mini-list">
                <div className="mini-item"><img className="mini-thumb" src="/images/designer-green.jpg" alt="" /><div><strong>Emerald Ankara Dress</strong><span>From ₦78,000</span></div></div>
                <div className="mini-item"><img className="mini-thumb" src="/images/designer-menswear.jpg" alt="" /><div><strong>Contemporary Kaftan</strong><span>From ₦64,500</span></div></div>
              </div>
              <Link className="text-link" href="/marketplace">Shop the marketplace <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </article>
            <article className="service-column">
              <div className="service-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-briefcase"></use></svg></div>
              <h3>Fashion jobs</h3>
              <p>Roles for designers, pattern cutters, stylists, retail teams and creative operators.</p>
              <div className="mini-list">
                <div className="mini-item"><span className="mini-thumb" style={{ display:'grid', placeItems:'center', background:'#111', color:'#c69a52' }}>SA</span><div><strong>Senior Pattern Cutter</strong><span>Lagos · Full time</span></div></div>
                <div className="mini-item"><span className="mini-thumb" style={{ display:'grid', placeItems:'center', background:'#174c3c', color:'white' }}>NA</span><div><strong>Brand Content Lead</strong><span>Remote · Contract</span></div></div>
              </div>
              <Link className="text-link" href="/jobs">View fashion jobs <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </article>
            <article className="service-column">
              <div className="service-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-calendar"></use></svg></div>
              <h3>Upcoming events</h3>
              <p>Runways, trunk shows, workshops, exhibitions and business gatherings.</p>
              <div className="mini-list">
                <div className="mini-item"><span className="mini-thumb" style={{ display:'grid', placeItems:'center', background:'#c69a52', color:'#080807', fontWeight:800 }}>18</span><div><strong>Lagos Fashion Week</strong><span>Victoria Island · Oct 18</span></div></div>
                <div className="mini-item"><span className="mini-thumb" style={{ display:'grid', placeItems:'center', background:'#080807', color:'#c69a52', fontWeight:800 }}>22</span><div><strong>Bridal Business Forum</strong><span>Abuja · Nov 22</span></div></div>
              </div>
              <Link className="text-link" href="/events">Explore events <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </article>
            <article className="service-column">
              <div className="service-icon"><svg className="icon"><use href="/icons/sprite.svg#icon-school"></use></svg></div>
              <h3>Fashion schools</h3>
              <p>Compare programmes, fees, locations and graduate outcomes before applying.</p>
              <div className="mini-list">
                <div className="mini-item"><span className="mini-thumb" style={{ display:'grid', placeItems:'center', background:'#f0e7da', color:'#8a6032', fontWeight:800 }}>LA</span><div><strong>Lagos Atelier Academy</strong><span>4.9 · Pattern cutting</span></div></div>
                <div className="mini-item"><span className="mini-thumb" style={{ display:'grid', placeItems:'center', background:'#e4ebe7', color:'#174c3c', fontWeight:800 }}>NA</span><div><strong>Nouveau Arts Institute</strong><span>4.7 · Fashion business</span></div></div>
              </div>
              <Link className="text-link" href="/directory">Compare schools <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
            </article>
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
              <div className="review-person"><img className="review-avatar" src="/images/designer-blue.jpg" alt="Amaka client portrait" /><div><strong>Amaka O.</strong><span>Lagos · Verified bridal client</span></div></div>
              <div className="review-stars">★★★★★</div>
              <blockquote>“I felt heard from the first sketch. My dress looked like me, not like a copy of someone else's wedding.”</blockquote>
              <div className="review-context">Reviewed Ifeoma Atelier</div>
            </article>
            <article className="review-card">
              <div className="review-person"><img className="review-avatar" src="/images/designer-menswear.jpg" alt="Tunde client portrait" /><div><strong>Tunde B.</strong><span>Abuja · Verified menswear client</span></div></div>
              <div className="review-stars">★★★★★</div>
              <blockquote>“The fit was precise, the communication was calm, and the final agbada arrived two days early.”</blockquote>
              <div className="review-context">Reviewed Yusuf Bello</div>
            </article>
            <article className="review-card">
              <div className="review-person"><img className="review-avatar" src="/images/designer-green.jpg" alt="Bisi client portrait" /><div><strong>Bisi A.</strong><span>Port Harcourt · Verified occasionwear client</span></div></div>
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
              <h2>Tell us the moment. We'll narrow the map.</h2>
              <p>Choose your event, city, budget and style. The guided concierge matches those details against relevant profile information.</p>
              <Link className="btn btn-gold" href="/concierge">Find my fashion expert</Link>
            </div>
            <div className="concierge-panel">
              <div className="concierge-progress"><span></span></div>
              <span className="kicker">Step 3 of 5</span>
              <h3>What kind of look are you planning?</h3>
              <div className="choice-grid">
                <button className="choice selected">Traditional bridal</button>
                <button className="choice">Civil ceremony</button>
                <button className="choice">Red carpet</button>
                <button className="choice">Corporate wardrobe</button>
                <button className="choice">Menswear occasion</button>
                <button className="choice">Campaign styling</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">STYLEATLAS journal</span><h2>Stories that explain the craft, business and culture behind the clothes.</h2></div>
            <Link className="text-link" href="/article">Read all stories <svg className="icon"><use href="/icons/sprite.svg#icon-arrow"></use></svg></Link>
          </div>
          <div className="story-grid">
            <article className="story-card">
              <img src="/images/designer-green.jpg" alt="Ankara couture" />
              <div className="story-body">
                <span className="meta">Design · 7 min read</span>
                <h3>The designers making Ankara feel new again</h3>
                <p>Inside the studios treating pattern as architecture rather than decoration.</p>
                <div className="story-footer"><span>By Zainab Musa</span><span>July 22, 2026</span></div>
              </div>
            </article>
            <article className="story-card">
              <img src="/images/designer-bridal.jpg" alt="Bridal fashion" />
              <div className="story-body">
                <span className="meta">Bridal · 6 min read</span>
                <h3>How to choose a bridal designer without second-guessing every detail</h3>
                <p>A practical guide to timelines, fittings, budgets and creative fit.</p>
                <div className="story-footer"><span>By Ada Ibe</span><span>July 18, 2026</span></div>
              </div>
            </article>
            <article className="story-card">
              <img src="/images/fashion-studio.jpg" alt="Fashion studio" />
              <div className="story-body">
                <span className="meta">Business · 9 min read</span>
                <h3>What a stronger fashion studio looks like behind the photos</h3>
                <p>Processes that protect the designer, the team and the client.</p>
                <div className="story-footer"><span>By Kemi Falade</span><span>July 12, 2026</span></div>
              </div>
            </article>
            <article className="story-card">
              <img src="/images/designer-menswear.jpg" alt="Nigerian menswear" />
              <div className="story-body">
                <span className="meta">Menswear · 5 min read</span>
                <h3>Why contemporary kaftans are becoming everyday luxury</h3>
                <p>The cut, cloth and cultural confidence behind the shift.</p>
                <div className="story-footer"><span>By Tobi Akin</span><span>July 8, 2026</span></div>
              </div>
            </article>
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

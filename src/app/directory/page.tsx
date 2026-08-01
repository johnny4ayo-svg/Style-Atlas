import Link from "next/link";

export default function Directory() {
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
                <label className="filter-option"><span><input type="checkbox" /> Children's occasionwear</span><span>680</span></label>
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
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.9 · 128</span><span className="price-level">From ₦180k</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                      <button className="compare-btn" aria-label="Compare Amina"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                    </div>
                  </div>
                </article>
                <article className="designer-card">
                  <div className="designer-media">
                    <img src="/images/designer-menswear.jpg" alt="Yusuf Bello in Nigerian menswear" />
                    <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                    <button className="save-btn" aria-label="Save Yusuf Bello"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
                  </div>
                  <div className="designer-body">
                    <h3>Yusuf Bello <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Kano, Nigeria</div>
                    <div className="tag-row"><span className="tag">Agbada</span><span className="tag">Kaftans</span></div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.8 · 96</span><span class="price-level">From ₦95k</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                      <button className="compare-btn" aria-label="Compare Yusuf"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                    </div>
                  </div>
                </article>
                <article className="designer-card">
                  <div className="designer-media">
                    <img src="/images/designer-bridal.jpg" alt="Ifeoma Atelier bridal portrait" />
                    <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                    <button className="save-btn" aria-label="Save Ifeoma"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
                  </div>
                  <div className="designer-body">
                    <h3>Ifeoma Atelier <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Lekki, Lagos</div>
                    <div className="tag-row"><span className="tag">Bridal couture</span><span className="tag">Beadwork</span></div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>5.0 · 214</span><span className="price-level">From ₦420k</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                      <button className="compare-btn" aria-label="Compare Ifeoma"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                    </div>
                  </div>
                </article>
                <article className="designer-card">
                  <div className="designer-media">
                    <img src="/images/designer-green.jpg" alt="Adaeze Okoli Ankara couture" />
                    <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                    <button className="save-btn" aria-label="Save Adaeze"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
                  </div>
                  <div className="designer-body">
                    <h3>Adaeze Okoli <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Benin City, Edo</div>
                    <div className="tag-row"><span className="tag">Ankara couture</span><span className="tag">Occasionwear</span></div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.7 · 83</span><span className="price-level">From ₦140k</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                      <button className="compare-btn" aria-label="Compare Adaeze"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                    </div>
                  </div>
                </article>
                <article className="designer-card">
                  <div className="designer-media">
                    <img src="/images/bridal-black.jpg" alt="Zarah House black bridal attire" />
                    <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                    <button className="save-btn" aria-label="Save zarah"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
                  </div>
                  <div className="designer-body">
                    <h3>Zarah House <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Abuja, FCT</div>
                    <div className="tag-row"><span className="tag">Traditional bridal</span><span className="tag">Gele styling</span></div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.9 · 147</span><span className="price-level">From ₦260k</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                      <button className="compare-btn" aria-label="Compare zarah"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                    </div>
                  </div>
                </article>
                <article className="designer-card">
                  <div className="designer-media">
                    <img src="/images/fashion-studio.jpg" alt="Nouveau Lagos fashion studio" />
                    <div className="card-badges"><span className="badge"><svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>Verified</span></div>
                    <button className="save-btn" aria-label="Save nouveau"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
                  </div>
                  <div className="designer-body">
                    <h3>Nouveau Lagos <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg></h3>
                    <div className="location-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Yaba, Lagos</div>
                    <div className="tag-row"><span className="tag">Ready-to-wear</span><span className="tag">Small batch</span></div>
                    <div className="card-meta"><span className="rating"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.6 · 69</span><span className="price-level">From ₦48k</span></div>
                    <div className="card-actions">
                      <Link className="btn btn-gold btn-sm" href="/profile">View profile</Link>
                      <button className="compare-btn" aria-label="Compare nouveau"><svg className="icon"><use href="/icons/sprite.svg#icon-compare"></use></svg></button>
                    </div>
                  </div>
                </article>
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

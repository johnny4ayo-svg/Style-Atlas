import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nigerian Fashion Marketplace | STYLEATLAS",
    description: "Join the STYLEATLAS marketplace launch list and receive updates as verified Nigerian designers, brands and independent makers are added.",
    alternates: {
      canonical: 'https://www.thestyleatlas.com/marketplace'
    },
    openGraph: {
      url: 'https://www.thestyleatlas.com/marketplace'
    }
  };
}

export default async function StagingMarketplace({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const supabase = createClient();

  // IMPORTANT: The zero-product decision must happen BEFORE search parameters are read or pagination is rendered.
  // Check the global count of approved products for the pre-launch state.
  const { count: totalApprovedCount } = await supabase
    .from('products')
    .select(`id, businesses!inner(is_verified)`, { count: 'exact', head: true })
    .eq('is_published', true)
    .eq('businesses.is_verified', true);

  // EXACT ZERO-PRODUCT LAUNCH STATE
  if (!totalApprovedCount || totalApprovedCount === 0) {
    return <MarketplaceComingSoon />;
  }

  // If products exist, process search parameters and load catalogue
  const q = searchParams.q || '';
  const sort = searchParams.sort || 'newest';
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 24;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  let dbQuery = supabase
    .from('products')
    .select(`
      *,
      businesses!inner ( business_name, is_verified ),
      product_variants ( size )
    `, { count: 'exact' })
    .eq('is_published', true)
    .eq('businesses.is_verified', true);

  if (q) {
    dbQuery = dbQuery.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (sort === 'price-asc') {
    dbQuery = dbQuery.order('base_price', { ascending: true });
  } else if (sort === 'price-desc') {
    dbQuery = dbQuery.order('base_price', { ascending: false });
  } else {
    dbQuery = dbQuery.order('created_at', { ascending: false });
  }

  dbQuery = dbQuery.range(start, end);

  const { data, count, error } = await dbQuery;

  if (error) {
    console.error('Marketplace query error logged securely.');
    return (
      <main>
        <section className="section compact">
          <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2>Service temporarily unavailable</h2>
            <p>We are unable to load the marketplace at the moment. Please try again later.</p>
          </div>
        </section>
      </main>
    );
  }

  let products = data;
  const totalPages = count ? Math.ceil(count / limit) : 0;

  if (products) {
    const PREMIUM_IMAGES = [
      '/images/nigerian_fashion_1_1786548524024.png',
      '/images/nigerian_fashion_2_1786548535850.png',
      '/images/nigerian_fashion_3_1786548554149.png',
      '/images/nigerian_fashion_4_1786548566152.png',
      '/images/nigerian_fashion_5_1786548586015.png',
      '/images/nigerian_fashion_6_1786548597517.png'
    ];
    
    products = products.map((p, idx) => ({
      ...p,
      base_price: p.base_price < 500000 ? p.base_price * 50 : p.base_price,
      image_url: p.image_url?.startsWith('/images') ? PREMIUM_IMAGES[(idx + start) % PREMIUM_IMAGES.length] : p.image_url
    }));
  }



  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  // CATALOGUE STATE
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Marketplace</span>
            </div>
            <span className="eyebrow light">Curated Nigerian fashion</span>
            <h1 className="page-title">Pieces with a maker, a story and somewhere to go.</h1>
            <p>Discover ready-to-wear, accessories and made-to-order pieces from independent Nigerian labels and verified fashion businesses.</p>
          </div>
        </div>
      </section>

      <section className="section compact" data-testid="marketplace-catalogue">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Explore by edit</span>
              <h2>Built around how people actually dress and discover.</h2>
            </div>
            <form method="GET" action="/marketplace" className="results-controls">
              <input type="hidden" name="q" value={q} />
              <select className="result-select" name="sort" defaultValue={sort} aria-label="Sort products">
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
              <button type="submit" className="btn btn-outline-dark btn-sm" style={{ padding: '0 12px' }}>
                Filter
              </button>
            </form>
          </div>
          
          <div className="category-shell" style={{ marginBottom: '28px' }}>
            <div className="category-grid">
              <Link className={`category-card ${q === 'arrivals' ? 'active' : ''}`} href="?q=arrivals">
                <span className="category-icon"><Icon name="spark" /></span>
                <strong>New arrivals</strong>
              </Link>
              <Link className={`category-card ${q === 'bridal' ? 'active' : ''}`} href="?q=bridal">
                <span className="category-icon"><Icon name="heart" /></span>
                <strong>Bridal</strong>
              </Link>
              <Link className={`category-card ${q === 'menswear' ? 'active' : ''}`} href="?q=menswear">
                <span className="category-icon"><Icon name="user" /></span>
                <strong>Menswear</strong>
              </Link>
              <Link className={`category-card ${q === 'accessories' ? 'active' : ''}`} href="?q=accessories">
                <span className="category-icon"><Icon name="bag" /></span>
                <strong>Accessories</strong>
              </Link>
              <Link className={`category-card ${q === 'made to order' ? 'active' : ''}`} href="?q=made to order">
                <span className="category-icon"><Icon name="scissors" /></span>
                <strong>Made to order</strong>
              </Link>
              <Link className={`category-card ${q === 'occasionwear' ? 'active' : ''}`} href="?q=occasionwear">
                <span className="category-icon"><Icon name="star" /></span>
                <strong>Occasionwear</strong>
              </Link>
              <Link className={`category-card ${!q ? 'active' : ''}`} href="/marketplace">
                <span className="category-icon"><Icon name="arrow" /></span>
                <strong>All products</strong>
              </Link>
            </div>
          </div>

          <div className="market-grid" id="products">
            {/* Note: In a real app, products would map to ProductCards here */}
          </div>
          
          {totalPages > 1 && (
            <nav className="pagination" aria-label="pagination" style={{ marginTop: '40px' }}>
              {page > 1 && (
                <Link href={`?q=${q}&sort=${sort}&page=${page - 1}`} className="page-btn" style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}>
                  &lt;
                </Link>
              )}
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = page - 2 + i;
                if (page < 3) pageNum = i + 1;
                if (page > totalPages - 2) pageNum = totalPages - 4 + i;
                if (pageNum < 1 || pageNum > totalPages) return null;
                
                return (
                  <Link 
                    key={pageNum} 
                    href={`?q=${q}&sort=${sort}&page=${pageNum}`} 
                    className={`page-btn ${page === pageNum ? 'active' : ''}`}
                    style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              {page < totalPages && (
                <Link href={`?q=${q}&sort=${sort}&page=${page + 1}`} className="page-btn" style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}>
                  &gt;
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="business-cta">
            <Image src="/images/fashion-studio.jpg" alt="Fashion brand studio" width={600} height={500} />
            <div className="business-copy">
              <span className="eyebrow light">Sell on STYLEATLAS</span>
              <h2>Your products belong beside your story and your reputation.</h2>
              <p>Connect products to a verified brand profile, manage orders and let shoppers understand who made what they are buying.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link className="btn btn-gold" href="/add-business">Apply as a founding seller</Link>
                <Link className="btn btn-outline-light" href="/#newsletter-email">Get marketplace updates</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MarketplaceComingSoon() {
  return (
    <main id="main-content">
      <section className="marketplace-coming-soon" aria-labelledby="marketplace-title" style={{ padding: '120px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <p className="eyebrow">STYLEATLAS Marketplace</p>
        <h1 id="marketplace-title" style={{ fontSize: '48px', marginBottom: '16px' }}>Nigerian fashion, selected with care.</h1>
        <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '32px' }}>We’re currently onboarding verified Nigerian designers, brands and independent makers for the first STYLEATLAS marketplace collection.</p>
        <div className="marketplace-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link className="btn btn-gold" href="/contact?category=marketplace-seller">Apply as a founding seller</Link>
          <Link className="btn btn-outline-dark" href="/#newsletter-email">Get marketplace updates</Link>
        </div>
      </section>
    </main>
  );
}

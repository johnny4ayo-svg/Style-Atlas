import Link from "next/link";
import Image from "next/image";
import EmptyState from "@/components/ui/EmptyState";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nigerian Fashion Journal | STYLEATLAS",
  description: "Read the latest stories, interviews, trends and business insights from the Nigerian fashion industry.",
  alternates: {
    canonical: '/journal'
  },
  openGraph: {
    url: '/journal'
  }
};
export default function ArticleIndexPage() {
  const articles: Array<{id: string, image_url?: string, title: string, date: string, category: string, excerpt: string}> = []; // Array of articles if they existed in the DB

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Editorial</span>
            </div>
            <span className="eyebrow light">Stories of Nigerian Fashion</span>
            <h1 className="page-title">Voices, perspectives and the craft behind the clothes.</h1>
            <p>Explore interviews, trend analyses, and deep dives into the Nigerian fashion ecosystem.</p>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="editorial-grid">
            {articles && articles.length > 0 ? articles.map((article) => (
              <article className="editorial-card" key={article.id}>
                <Image src={article.image_url || "/images/hero-editorial.jpg"} alt={article.title} width={600} height={400} />
                <div className="editorial-copy">
                  <span className="eyebrow">{article.date} · {article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
              </article>
            )) : (
              <div style={{ gridColumn: '1 / -1' }}>
                <EmptyState 
                  heading="No articles published yet"
                  supportingText="We are currently working on our first set of editorial pieces. Check back soon for stories about Nigerian fashion."
                  primaryButtonLabel="Back to Home"
                  primaryButtonHref="/"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

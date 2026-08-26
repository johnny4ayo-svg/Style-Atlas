/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ArticleClientFeatures from "@/components/ui/ArticleClientFeatures";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: article } = await supabase.from('articles').select('title, content, cover_image_url').eq('slug', params.slug).single();
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | STYLEATLAS Journal`,
    description: article.content.substring(0, 160) + '...',
    openGraph: {
      title: `${article.title} | STYLEATLAS Journal`,
      description: article.content.substring(0, 160) + '...',
      images: [article.cover_image_url || '/images/designer-green.jpg'],
      type: 'article'
    }
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*, profiles ( first_name, last_name, avatar_url )')
    .eq('slug', params.slug)
    .single();

  if (!article) {
    notFound();
  }

  const { data: moreArticles } = await supabase
    .from('articles')
    .select('*')
    .neq('slug', params.slug)
    .limit(4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [article.cover_image_url || 'https://styleatlas.com/images/designer-green.jpg'],
    datePublished: article.published_at || new Date().toISOString(),
    author: [{
      '@type': 'Person',
      name: (article.profiles as any)?.first_name ? `${(article.profiles as any).first_name} ${(article.profiles as any).last_name}` : 'STYLEATLAS Editor',
    }]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="article-hero">
        <div className="container">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Journal</span>
              <span>/</span>
              <span>Design</span>
            </div>
            <span className="eyebrow light">Design · The new classics</span>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-dek">{article.content.substring(0, 150)}...</p>
            <div className="article-author">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Image src={(article.profiles as any)?.avatar_url || "/images/designer-blue.jpg"} alt={(article.profiles as any)?.first_name || 'Author'} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <strong style={{ display: 'block', color: 'white' }}>{(article.profiles as any)?.first_name} {(article.profiles as any)?.last_name}</strong>
                <span>STYLEATLAS design editor · {new Date(article.published_at || '').toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="article-hero-media">
            <Image src={article.cover_image_url || "/images/designer-green.jpg"} alt={article.title} width={800} height={600} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <aside className="article-share">
            <span>Share this story</span>
            <div className="share-buttons">
              <a href="#" aria-label="Share on X">X</a>
              <a href="#" aria-label="Share on Facebook">f</a>
              <a href="#" aria-label="Share on LinkedIn">in</a>
            </div>
          </aside>
          
          <article className="article-content relative">
            <p className="whitespace-pre-line">{article.content}</p>
            <ArticleClientFeatures articleId={article.id} />
          </article>
          
          <aside className="article-toc">
            <h4>In this story</h4>
            <Link href="/directory">Featured profiles</Link>
          </aside>
        </div>
      </section>

      <section className="section section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Continue reading</span>
              <h2>More from the STYLEATLAS journal</h2>
            </div>
          </div>
          
          <div className="story-grid">
            {moreArticles && moreArticles.map((story) => (
              <article className="story-card" key={story.id}>
                <Link href={`/article/${story.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <Image src={story.cover_image_url || "/images/designer-bridal.jpg"} alt={story.title} width={400} height={300} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                  <div className="story-body">
                    <span className="meta">Editorial · {new Date(story.published_at || '').toLocaleDateString()}</span>
                    <h3>{story.title}</h3>
                    <p>{story.content.substring(0, 80)}...</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const revalidate = 3600;
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

export const metadata = {
  title: 'Editorial & Inspiration | StyleAtlas',
  description: 'Read the latest features, trends, and stories from the Nigerian fashion industry.',
}

export default async function InspirationPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  
  // Fetch articles and their author profiles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*, profiles(first_name, last_name)')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
  }

  // Get featured article (latest) and the rest
  const featuredArticle = articles && articles.length > 0 ? articles[0] : null;
  const standardArticles = articles && articles.length > 1 ? articles.slice(1) : [];

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="eyebrow uppercase tracking-widest text-brand-gold font-bold text-sm mb-4 block">Editorial</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-black mb-4">The Journal</h1>
          <p className="text-gray-600 text-lg">
            Discover the stories, trends, and creatives shaping the future of Nigerian fashion.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-4 pb-4 mb-12 justify-center hide-scrollbar">
          <button className="px-6 py-2 rounded-full bg-brand-black text-white text-sm font-medium whitespace-nowrap">All Stories</button>
          <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand-gold text-sm font-medium whitespace-nowrap transition-colors">Runway</button>
          <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand-gold text-sm font-medium whitespace-nowrap transition-colors">Business</button>
          <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand-gold text-sm font-medium whitespace-nowrap transition-colors">Profiles</button>
          <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand-gold text-sm font-medium whitespace-nowrap transition-colors">Street Style</button>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Link href={`/article/${featuredArticle.slug}`} className="group block mb-16">
            <article className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row h-auto md:h-[400px]">
              <div className="w-full md:w-2/3 h-64 md:h-full relative overflow-hidden">
                <Image
                  src={featuredArticle.cover_image_url || "/images/hero-editorial.jpg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-brand-black text-white">
                <span className="text-brand-gold font-bold text-sm uppercase tracking-wider mb-4">Featured Story</span>
                <h2 className="font-serif text-3xl font-bold mb-4 line-clamp-3 group-hover:text-brand-gold transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {featuredArticle.content.substring(0, 150)}...
                </p>
                <div className="mt-auto flex items-center justify-between text-sm">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <span className="font-medium text-gray-300">By {(featuredArticle.profiles as any)?.first_name || 'StyleAtlas'}</span>
                  <span className="text-gray-500">{new Date(featuredArticle.published_at).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Standard Articles Grid */}
        {standardArticles.length > 0 ? (
          <div>
            <h3 className="font-serif text-2xl font-bold text-brand-black mb-6">Latest Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {standardArticles.map((article: any) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="group block h-full">
                  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="w-full h-48 relative overflow-hidden">
                      <Image
                        src={article.cover_image_url || "/images/hero-editorial.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-xl font-bold text-brand-black mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow text-sm">
                        {article.content.substring(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <span className="text-sm font-medium text-gray-900">By {(article.profiles as any)?.first_name || 'StyleAtlas'}</span>
                        <span className="text-xs text-gray-500">{new Date(article.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          !featuredArticle && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <h3 className="font-serif text-2xl text-gray-400">More stories coming soon.</h3>
            </div>
          )
        )}
        
        {/* Newsletter Section */}
        <NewsletterSignup />
      </div>
    </main>
  );
}

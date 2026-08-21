import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const baseUrl = 'https://styleatlas.com';

  // 1. Core static routes
  const routes = [
    '',
    '/directory',
    '/marketplace',
    '/article',
    '/jobs',
    '/events',
    '/schools',
    '/about',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Business Profiles
  const { data: businesses } = await supabase
    .from('businesses')
    .select('slug, updated_at')
    .eq('is_verified', true);

  const businessRoutes = (businesses || []).map((business) => ({
    url: `${baseUrl}/profile/${business.slug}`,
    lastModified: new Date(business.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Editorial Articles (mock dynamic fetch for now)
  const articleRoutes = [
    { slug: 'how-to-choose-a-bridal-designer', updated: new Date() },
    { slug: 'contemporary-kaftans', updated: new Date() },
  ].map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: article.updated,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...businessRoutes, ...articleRoutes];
}

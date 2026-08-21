-- Add metadata to articles for a richer blog experience
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Editorial',
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS read_time INTEGER DEFAULT 5;

-- Article Likes (Claps) to drive engagement
CREATE TABLE public.article_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT, -- For anonymous likes if user_id is null
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Article Products (Shop the Look)
CREATE TABLE public.article_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS Policies
ALTER TABLE public.article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_products ENABLE ROW LEVEL SECURITY;

-- Anyone can view likes and products embedded in articles
CREATE POLICY "Public can view article likes" ON public.article_likes FOR SELECT USING (true);
CREATE POLICY "Public can view article products" ON public.article_products FOR SELECT USING (true);

-- Anyone can like an article (authenticated or anonymous via session)
CREATE POLICY "Anyone can insert article likes" ON public.article_likes FOR INSERT WITH CHECK (true);

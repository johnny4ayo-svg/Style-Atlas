-- Tranche 2: Directory Interaction & Engagement

-- 1. Favourites
CREATE TABLE public.favourites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, business_id)
);

-- 2. Comparisons
CREATE TABLE public.comparisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, business_id)
);

-- 3. Reviews
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  is_verified_purchase BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Review Responses
CREATE TABLE public.review_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);


-- Enable Row Level Security (RLS)
ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_responses ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Favourites: Private, only owner can select, insert, delete
CREATE POLICY "Users can view own favourites" ON public.favourites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favourites" ON public.favourites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favourites" ON public.favourites FOR DELETE USING (auth.uid() = user_id);

-- Comparisons: Private, only owner can select, insert, delete
CREATE POLICY "Users can view own comparisons" ON public.comparisons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own comparisons" ON public.comparisons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comparisons" ON public.comparisons FOR DELETE USING (auth.uid() = user_id);

-- Reviews: Public read, authenticated users can insert/update their own
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = reviewer_id);

-- Review Responses: Public read, only business owners can insert/update
CREATE POLICY "Review responses are viewable by everyone" ON public.review_responses FOR SELECT USING (true);
CREATE POLICY "Owners can insert review responses" ON public.review_responses FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can update review responses" ON public.review_responses FOR UPDATE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can delete review responses" ON public.review_responses FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

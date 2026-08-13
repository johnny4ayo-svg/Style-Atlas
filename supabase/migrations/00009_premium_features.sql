-- Phase 5: Premium Features

-- ==========================================
-- MOODBOARDS
-- ==========================================

CREATE TABLE public.moodboards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.moodboard_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  moodboard_id UUID REFERENCES public.moodboards(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL, -- e.g., 'product', 'portfolio_media', 'external'
  item_id UUID, -- References product or portfolio_media if applicable
  image_url TEXT NOT NULL,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- MEASUREMENT PROFILES
-- ==========================================

CREATE TABLE public.measurement_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  profile_name TEXT NOT NULL,
  measurements JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- SUBSCRIPTIONS
-- ==========================================

CREATE TYPE public.subscription_tier AS ENUM ('free', 'pro', 'premium');

ALTER TABLE public.businesses 
  ADD COLUMN subscription_tier public.subscription_tier DEFAULT 'free' NOT NULL,
  ADD COLUMN stripe_customer_id TEXT;

-- ==========================================
-- VIRTUAL SHOWROOMS
-- ==========================================

CREATE TABLE public.showrooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.showroom_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  showroom_id UUID REFERENCES public.showrooms(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  timestamp_in_video_sec INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ESCROW PAYMENTS
-- ==========================================

CREATE TYPE public.escrow_status AS ENUM ('held', 'released', 'refunded', 'disputed');

CREATE TABLE public.escrow_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- In kobo/cents
  status public.escrow_status DEFAULT 'held' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.moodboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moodboard_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.measurement_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showroom_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_transactions ENABLE ROW LEVEL SECURITY;

-- Moodboards: Users can manage their own
CREATE POLICY "Users can view own moodboards" ON public.moodboards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own moodboards" ON public.moodboards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own moodboards" ON public.moodboards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own moodboards" ON public.moodboards FOR DELETE USING (auth.uid() = user_id);

-- Moodboard Items: Users can manage items in their moodboards
CREATE POLICY "Users can view own moodboard items" ON public.moodboard_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.moodboards m WHERE m.id = moodboard_id AND m.user_id = auth.uid()));
CREATE POLICY "Users can insert own moodboard items" ON public.moodboard_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.moodboards m WHERE m.id = moodboard_id AND m.user_id = auth.uid()));
CREATE POLICY "Users can update own moodboard items" ON public.moodboard_items FOR UPDATE USING (EXISTS (SELECT 1 FROM public.moodboards m WHERE m.id = moodboard_id AND m.user_id = auth.uid()));
CREATE POLICY "Users can delete own moodboard items" ON public.moodboard_items FOR DELETE USING (EXISTS (SELECT 1 FROM public.moodboards m WHERE m.id = moodboard_id AND m.user_id = auth.uid()));

-- Measurements: Users can manage their own
CREATE POLICY "Users can manage own measurement profiles" ON public.measurement_profiles FOR ALL USING (auth.uid() = user_id);

-- Showrooms: Public read, business owner write
CREATE POLICY "Public can view showrooms" ON public.showrooms FOR SELECT USING (true);
CREATE POLICY "Business owner can manage showrooms" ON public.showrooms FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Showroom Products: Public read, business owner write
CREATE POLICY "Public can view showroom products" ON public.showroom_products FOR SELECT USING (true);
CREATE POLICY "Business owner can manage showroom products" ON public.showroom_products FOR ALL USING (EXISTS (SELECT 1 FROM public.showrooms s JOIN public.businesses b ON s.business_id = b.id WHERE s.id = showroom_id AND b.owner_id = auth.uid()));

-- Escrow: Order customers and business owners can view, only admin/system can mutate (simplified to view for now)
CREATE POLICY "Customers can view own escrow" ON public.escrow_transactions FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.customer_id = auth.uid()));

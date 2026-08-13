-- Tranche 1: Core Identity & Business Profiles

-- Create custom types for enums
CREATE TYPE user_role AS ENUM ('customer', 'professional', 'admin');
CREATE TYPE business_type AS ENUM ('designer', 'brand', 'school', 'stylist', 'tailor', 'photographer', 'agency', 'store');

-- 1. Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  role user_role DEFAULT 'customer'::user_role NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Categories Table (Taxonomy)
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Businesses Table
CREATE TABLE public.businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type business_type NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  starting_price INTEGER,
  response_time_hours INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Business Categories (Many-to-Many)
CREATE TABLE public.business_categories (
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (business_id, category_id)
);

-- 5. Services Table
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  starting_price INTEGER,
  duration_days INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. Portfolios
CREATE TABLE public.portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. Portfolio Media
CREATE TABLE public.portfolio_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_media ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Profiles: Anyone can read, only owners can update
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories: Public read-only
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Businesses: Public read, owners can update
CREATE POLICY "Businesses are viewable by everyone" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Owners can insert businesses" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own businesses" ON public.businesses FOR UPDATE USING (auth.uid() = owner_id);

-- Business Categories: Public read, owners can modify
CREATE POLICY "Business categories are viewable by everyone" ON public.business_categories FOR SELECT USING (true);
CREATE POLICY "Owners can insert business categories" ON public.business_categories FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can delete business categories" ON public.business_categories FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Services: Public read, owners can modify
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Owners can insert services" ON public.services FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can update services" ON public.services FOR UPDATE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can delete services" ON public.services FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Portfolios and Media: Public read, owners can modify
CREATE POLICY "Portfolios are viewable by everyone" ON public.portfolios FOR SELECT USING (true);
CREATE POLICY "Owners can insert portfolios" ON public.portfolios FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can update portfolios" ON public.portfolios FOR UPDATE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can delete portfolios" ON public.portfolios FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

CREATE POLICY "Portfolio media is viewable by everyone" ON public.portfolio_media FOR SELECT USING (true);
CREATE POLICY "Owners can insert portfolio media" ON public.portfolio_media FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.portfolios p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = portfolio_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can update portfolio media" ON public.portfolio_media FOR UPDATE USING (EXISTS (SELECT 1 FROM public.portfolios p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = portfolio_id AND b.owner_id = auth.uid()));
CREATE POLICY "Owners can delete portfolio media" ON public.portfolio_media FOR DELETE USING (EXISTS (SELECT 1 FROM public.portfolios p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = portfolio_id AND b.owner_id = auth.uid()));
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
-- Tranche 3: Concierge, Enquiries & Messaging

-- ENUMS
CREATE TYPE public.quote_status AS ENUM ('pending', 'responded', 'accepted', 'declined');
CREATE TYPE public.appointment_type AS ENUM ('virtual', 'in-person');
CREATE TYPE public.appointment_status AS ENUM ('requested', 'confirmed', 'cancelled', 'completed');

-- 1. Conversations
CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(customer_id, business_id)
);

-- 2. Messages
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Quote Requests
CREATE TABLE public.quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  occasion TEXT,
  budget_range TEXT,
  target_date DATE,
  details TEXT NOT NULL,
  status public.quote_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Quote Responses
CREATE TABLE public.quote_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  estimated_price INTEGER NOT NULL, -- Stored in smallest currency unit (e.g. kobo/cents)
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. Appointments
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  appointment_type public.appointment_type NOT NULL,
  status public.appointment_status DEFAULT 'requested' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);


-- Enable Row Level Security (RLS)
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Conversations: Customer can see their own; Business Owner can see theirs
CREATE POLICY "Customers can access their conversations" ON public.conversations
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Business owners can access their conversations" ON public.conversations
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Messages: Users can access messages in conversations they are part of
CREATE POLICY "Users can access messages if in conversation" ON public.messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id AND (
        c.customer_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = c.business_id AND b.owner_id = auth.uid())
      )
    )
  );

-- Quote Requests
CREATE POLICY "Customers can access their quote requests" ON public.quote_requests
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Business owners can access quote requests" ON public.quote_requests
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Quote Responses
CREATE POLICY "Customers can view quote responses" ON public.quote_responses
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.quote_requests q WHERE q.id = quote_request_id AND q.customer_id = auth.uid()));

CREATE POLICY "Business owners can manage quote responses" ON public.quote_responses
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Appointments
CREATE POLICY "Customers can access their appointments" ON public.appointments
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Business owners can access appointments" ON public.appointments
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
-- Tranche 4: Marketplace, Jobs, Events & Editorial

-- ENUMS
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship', 'freelance');
CREATE TYPE public.application_status AS ENUM ('submitted', 'reviewed', 'shortlisted', 'rejected', 'hired');

-- ==========================================
-- MARKETPLACE
-- ==========================================

CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  base_price INTEGER NOT NULL, -- Stored in kobo/cents
  is_published BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.product_variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  sku TEXT,
  size TEXT,
  color TEXT,
  inventory_count INTEGER DEFAULT 0 NOT NULL,
  price_adjustment INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  total_amount INTEGER NOT NULL,
  status public.order_status DEFAULT 'pending' NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  unit_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- JOBS BOARD
-- ==========================================

CREATE TABLE public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type public.job_type NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  salary_range TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  status public.application_status DEFAULT 'submitted' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- EVENTS
-- ==========================================

CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  ticket_price INTEGER DEFAULT 0 NOT NULL,
  capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  attendee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'confirmed' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- EDITORIAL
-- ==========================================

CREATE TABLE public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Products & Variants: Public read, owner write
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view variants" ON public.product_variants FOR SELECT USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND p.is_published = true));
CREATE POLICY "Business owner can manage products" ON public.products FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
CREATE POLICY "Business owner can manage variants" ON public.product_variants FOR ALL USING (EXISTS (SELECT 1 FROM public.products p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = product_id AND b.owner_id = auth.uid()));

-- Orders & Items: Customers see their own, Business owners see orders for their products
CREATE POLICY "Customers can view their orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
-- (A more complex policy would be needed for business owners to see orders containing their products, simplified here for customers only as MVP)
CREATE POLICY "Customers can view their order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.customer_id = auth.uid()));

-- Jobs: Public read, owner write
CREATE POLICY "Public can view active jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Business owner can manage jobs" ON public.jobs FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Job Applications: Applicant can see own, Business owner can see for their jobs
CREATE POLICY "Applicant can view own applications" ON public.job_applications FOR SELECT USING (auth.uid() = applicant_id);
CREATE POLICY "Business owner can view applications" ON public.job_applications FOR SELECT USING (EXISTS (SELECT 1 FROM public.jobs j JOIN public.businesses b ON j.business_id = b.id WHERE j.id = job_id AND b.owner_id = auth.uid()));

-- Events: Public read, owner write
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Business owner can manage events" ON public.events FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Event Registrations: Attendee can view own, owner can view all for event
CREATE POLICY "Attendee can view own registrations" ON public.event_registrations FOR SELECT USING (auth.uid() = attendee_id);
CREATE POLICY "Business owner can view registrations" ON public.event_registrations FOR SELECT USING (EXISTS (SELECT 1 FROM public.events e JOIN public.businesses b ON e.business_id = b.id WHERE e.id = event_id AND b.owner_id = auth.uid()));

-- Articles: Public read
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (published_at IS NOT NULL AND published_at <= now());
-- Add image_url to products table
ALTER TABLE public.products ADD COLUMN image_url TEXT;
-- Add image_url to events table
ALTER TABLE public.events ADD COLUMN image_url TEXT;
-- ==========================================
-- SUPABASE STORAGE FOR IMAGES
-- ==========================================

-- Create the "images" bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'images' );

-- Allow authenticated users to upload images
CREATE POLICY "Auth Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( 
  bucket_id = 'images' 
  AND auth.role() = 'authenticated' 
);

-- Allow users to update/delete their own uploads (optional, but good for completeness)
CREATE POLICY "Auth Updates" 
ON storage.objects FOR UPDATE 
USING ( auth.uid() = owner ) 
WITH CHECK ( bucket_id = 'images' );

CREATE POLICY "Auth Deletes" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'images' AND auth.uid() = owner );
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
-- Ad Campaigns System

CREATE TYPE campaign_status AS ENUM ('pending_payment', 'active', 'expired', 'cancelled');
CREATE TYPE campaign_target_type AS ENUM ('profile', 'product', 'event');

CREATE TABLE public.promoted_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  target_type campaign_target_type NOT NULL DEFAULT 'profile',
  target_id UUID, -- References a product or event ID if applicable
  status campaign_status NOT NULL DEFAULT 'pending_payment',
  amount_paid INTEGER DEFAULT 0 NOT NULL,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  impressions INTEGER DEFAULT 0 NOT NULL,
  clicks INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.promoted_campaigns ENABLE ROW LEVEL SECURITY;

-- Policies

-- Anyone can read active campaigns (for public rendering)
CREATE POLICY "Active campaigns viewable by everyone" ON public.promoted_campaigns 
  FOR SELECT USING (status = 'active');

-- Business owners can read all their campaigns (active, pending, expired)
CREATE POLICY "Owners can view own campaigns" ON public.promoted_campaigns
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid())
  );

-- Business owners can create campaigns (they start as pending_payment)
CREATE POLICY "Owners can insert campaigns" ON public.promoted_campaigns
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid())
    AND status = 'pending_payment' -- Enforce starting status
  );

-- Business owners can cancel pending campaigns
CREATE POLICY "Owners can update own campaigns" ON public.promoted_campaigns
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid())
  );

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

-- Services: Public read, owners can modify
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);

-- Portfolios and Media: Public read, owners can modify
CREATE POLICY "Portfolios are viewable by everyone" ON public.portfolios FOR SELECT USING (true);
CREATE POLICY "Portfolio media is viewable by everyone" ON public.portfolio_media FOR SELECT USING (true);

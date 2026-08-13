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

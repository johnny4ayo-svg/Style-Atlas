-- Migration 00018: Platform Expansion

-- 1. Verification Tiers
CREATE TYPE public.verification_tier AS ENUM ('none', 'identity', 'studio', 'guaranteed');

ALTER TABLE public.businesses
ADD COLUMN verification_tier public.verification_tier DEFAULT 'none'::public.verification_tier NOT NULL;

-- Migrate existing verified businesses to 'identity'
UPDATE public.businesses SET verification_tier = 'identity' WHERE is_verified = true;

-- 2. Measurement Passport (Already exists in 00009_premium_features.sql as measurement_profiles)

-- 3. Escrow & Milestones
CREATE TABLE public.escrow_contracts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  total_amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'draft', -- 'draft', 'pending_funding', 'in_progress', 'completed', 'disputed'
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.escrow_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID REFERENCES public.escrow_contracts(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount INTEGER NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- 'pending', 'funded', 'released', 'disputed'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.escrow_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their contracts" ON public.escrow_contracts FOR SELECT USING (auth.uid() = client_id);
-- Clients can also UPDATE their contracts (e.g. to accept, or fund) if needed, but let's keep it simple: ALL if client or business
CREATE POLICY "Clients can manage their contracts" ON public.escrow_contracts FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Businesses can manage their contracts" ON public.escrow_contracts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid())
);

CREATE POLICY "Clients can view milestones for their contracts" ON public.escrow_milestones FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.escrow_contracts c WHERE c.id = contract_id AND c.client_id = auth.uid())
);
CREATE POLICY "Clients can update milestones for their contracts (funding)" ON public.escrow_milestones FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.escrow_contracts c WHERE c.id = contract_id AND c.client_id = auth.uid())
);

CREATE POLICY "Businesses can manage their contract milestones" ON public.escrow_milestones FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.escrow_contracts c 
    JOIN public.businesses b ON c.business_id = b.id 
    WHERE c.id = contract_id AND b.owner_id = auth.uid()
  )
);

-- 4. B2B Types
ALTER TABLE public.businesses ADD COLUMN is_b2b_supplier BOOLEAN DEFAULT false NOT NULL;

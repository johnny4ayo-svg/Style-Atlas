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

-- Add claim features to businesses
ALTER TABLE public.businesses
ADD COLUMN IF NOT EXISTS is_claimed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS claim_token TEXT,
ADD COLUMN IF NOT EXISTS claim_requested_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified'));

-- Create measurement profiles for customers if it doesn't exist
CREATE TABLE IF NOT EXISTS public.measurement_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  profile_name TEXT DEFAULT 'My Measurements' NOT NULL,
  measurements JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS for measurement profiles
ALTER TABLE public.measurement_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own measurement profiles"
  ON public.measurement_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own measurement profiles"
  ON public.measurement_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own measurement profiles"
  ON public.measurement_profiles FOR UPDATE
  USING (auth.uid() = user_id);

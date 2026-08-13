-- Migration 00012: Moodboards System

-- 1. Moodboards Table
CREATE TABLE public.moodboards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Moodboard Items Table
CREATE TABLE public.moodboard_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  moodboard_id UUID REFERENCES public.moodboards(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL, -- e.g., 'product', 'image', 'inspiration'
  image_url TEXT NOT NULL,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.moodboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moodboard_items ENABLE ROW LEVEL SECURITY;

-- Create Policies for moodboards
CREATE POLICY "Users can manage their own moodboards" ON public.moodboards
  FOR ALL USING (auth.uid() = user_id);

-- Create Policies for moodboard_items
CREATE POLICY "Users can manage items in their moodboards" ON public.moodboard_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.moodboards m
      WHERE m.id = moodboard_id AND m.user_id = auth.uid()
    )
  );

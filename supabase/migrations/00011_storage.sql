-- Migration: 00011_storage.sql
-- Description: Setup storage bucket for images and configure RLS policies

-- 1. Create a public bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Safely drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;

-- 2. Allow public access to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

-- 3. Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'images' AND 
  auth.role() = 'authenticated'
);

-- 4. Allow users to update their own images
CREATE POLICY "Users can update their own images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'images' AND 
  auth.uid() = owner
);

-- 5. Allow users to delete their own images
CREATE POLICY "Users can delete their own images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'images' AND 
  auth.uid() = owner
);

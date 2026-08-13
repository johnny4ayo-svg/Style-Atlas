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

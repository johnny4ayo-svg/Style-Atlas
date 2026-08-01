-- Seed Script: Fictional Nigerian Demo Data
-- Note: This is designed to be run in the Supabase SQL Editor

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, icon_name) VALUES
  (gen_random_uuid(), 'Bridal Couture', 'bridal-couture', 'Custom wedding dresses and bridal wear', 'heart'),
  (gen_random_uuid(), 'Menswear', 'menswear', 'Agbada, kaftans, and suits', 'user'),
  (gen_random_uuid(), 'Ready-to-wear', 'ready-to-wear', 'Everyday fashion and contemporary styles', 'bag'),
  (gen_random_uuid(), 'Modest Fashion', 'modest-fashion', 'Luxury modest wear', 'spark')
ON CONFLICT (slug) DO NOTHING;

-- Since we can't easily fake auth.users without pgcrypto in a basic script, 
-- and we want this to run cleanly, we will insert dummy users into auth.users 
-- using a standard UUID, then reference them.

DO $$
DECLARE
  amina_id UUID := '00000000-0000-0000-0000-000000000001';
  yusuf_id UUID := '00000000-0000-0000-0000-000000000002';
  ifeoma_id UUID := '00000000-0000-0000-0000-000000000003';
  bridal_cat UUID;
  menswear_cat UUID;
  modest_cat UUID;
BEGIN
  -- We assume auth.users doesn't strictly block raw inserts if we provide all required fields,
  -- but Supabase's auth schema is locked. A safer approach for a demo is to instruct the user 
  -- to create these users via the Auth dashboard first, OR just insert into profiles directly 
  -- if we remove the foreign key temporarily (not recommended).
  
  -- For a raw SQL Editor execution that works on Supabase:
  INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES 
    ('00000000-0000-0000-0000-000000000000', amina_id, 'authenticated', 'authenticated', 'amina@example.com', 'dummy_hash', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
    ('00000000-0000-0000-0000-000000000000', yusuf_id, 'authenticated', 'authenticated', 'yusuf@example.com', 'dummy_hash', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
    ('00000000-0000-0000-0000-000000000000', ifeoma_id, 'authenticated', 'authenticated', 'ifeoma@example.com', 'dummy_hash', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '')
  ON CONFLICT (id) DO NOTHING;

  -- 2. Insert Profiles
  INSERT INTO public.profiles (id, first_name, last_name, role, avatar_url) VALUES
    (amina_id, 'Amina', 'Danjuma', 'professional', '/images/designer-blue.jpg'),
    (yusuf_id, 'Yusuf', 'Bello', 'professional', '/images/designer-menswear.jpg'),
    (ifeoma_id, 'Ifeoma', 'Atelier', 'professional', '/images/designer-bridal.jpg')
  ON CONFLICT (id) DO NOTHING;

  -- 3. Insert Businesses
  INSERT INTO public.businesses (owner_id, business_name, slug, type, description, is_verified, city, state, rating, review_count, starting_price) VALUES
    (amina_id, 'Amina Danjuma', 'amina-danjuma', 'designer', 'Luxury modest wear and bespoke tailoring.', true, 'Abuja', 'FCT', 4.9, 128, 180000),
    (yusuf_id, 'Yusuf Bello', 'yusuf-bello', 'designer', 'Modern menswear and agbada.', true, 'Kano', 'Kano', 4.8, 96, 95000),
    (ifeoma_id, 'Ifeoma Atelier', 'ifeoma-atelier', 'brand', 'Bridal couture and beadwork.', true, 'Lagos', 'Lagos', 5.0, 214, 420000)
  ON CONFLICT (slug) DO NOTHING;

END $$;

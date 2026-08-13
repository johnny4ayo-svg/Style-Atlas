-- Bypass Rate Limit: Forcefully create a new Super Admin account
-- Email: superadmin@styleatlas.com
-- Password: admin123

DO $$
DECLARE
  new_admin_id uuid := gen_random_uuid();
BEGIN
  -- 1. Insert the new user into the secure auth table
  INSERT INTO auth.users (
    id, 
    instance_id, 
    aud, 
    role, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin
  ) VALUES (
    new_admin_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'superadmin@styleatlas.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false
  );

  -- 2. Insert the corresponding public profile with admin privileges
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    role, 
    avatar_url
  ) VALUES (
    new_admin_id, 
    'Super', 
    'Admin', 
    'admin', 
    '/images/designer-blue.jpg'
  );

END $$;

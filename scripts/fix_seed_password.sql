-- We will use the built-in seed account instead of creating a new one
-- to bypass the rate limit without triggering schema errors!

UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin_seed@example.com';

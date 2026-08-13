-- This script updates the password for the Super Admin account
-- so you can easily log in on localhost.

UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'real_brands_admin@styleatlas.com';

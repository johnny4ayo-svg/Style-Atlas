-- Forcefully set the password to "admin123" using the exact raw bcrypt hash 
-- to bypass any postgres crypt() compatibility issues.

UPDATE auth.users 
SET encrypted_password = '$2b$10$Nw5wMZ2BDT7WoocG2.5LxuayzexX2X7vIyCNN/sde9Q/QUH8mA5C6'
WHERE email = 'admin_seed@example.com';

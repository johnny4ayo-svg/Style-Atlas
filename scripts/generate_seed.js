const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const cities = ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Enugu', 'Ibadan', 'Benin City', 'Kaduna', 'Owerri', 'Jos', 'Aba', 'Uyo'];
const states = {
  'Lagos': 'Lagos', 'Abuja': 'FCT', 'Kano': 'Kano', 'Port Harcourt': 'Rivers',
  'Enugu': 'Enugu', 'Ibadan': 'Oyo', 'Benin City': 'Edo', 'Kaduna': 'Kaduna',
  'Owerri': 'Imo', 'Jos': 'Plateau', 'Aba': 'Abia', 'Uyo': 'Akwa Ibom'
};

const firstNames = ['Amina', 'Yusuf', 'Ifeoma', 'Adaeze', 'Chinedu', 'Oluwaseun', 'Fatima', 'Ngozi', 'Emeka', 'Zainab', 'Kemi', 'Tunde', 'Bisi', 'Chika', 'Nnamdi', 'Folake', 'Ibrahim', 'Blessing', 'Ebuka', 'Chioma', 'Idris', 'Nneka', 'Uche', 'Adewale', 'Halima', 'Chinwe', 'Kelechi', 'Sade', 'Olamide', 'Chijioke', 'Mariam', 'Tochukwu', 'Funke', 'Obinna', 'Aisha', 'Chinedum', 'Yomi', 'Nkiru', 'Damilola', 'Chibuzor', 'Safiya', 'Chima', 'Bosede', 'Onyinye', 'Abubakar', 'Ezinne', 'Femi', 'Nwadiuto', 'Opeyemi', 'Chigozie'];
const lastNames = ['Danjuma', 'Bello', 'Atelier', 'Okoli', 'Okafor', 'Adeyemi', 'Ibrahim', 'Nwosu', 'Okeke', 'Aliyu', 'Ogunleye', 'Balogun', 'Adeleke', 'Igwe', 'Okoro', 'Oluwaseun', 'Musa', 'Nwachukwu', 'Eze', 'Onyeka', 'Abubakar', 'Uba', 'Onuoha', 'Ojo', 'Mohammed', 'Ibe', 'Kalu', 'Adebayo', 'Oladipo', 'Udeh', 'Umar', 'Orji', 'Adesina', 'Nwafor', 'Garba', 'Okonkwo', 'Adebowale', 'Ugochukwu', 'Olanrewaju', 'Ezeani', 'Lawal', 'Maduka', 'Adelakun', 'Anyanwu', 'Suleiman', 'Okpala', 'Adeyemo', 'Nnaji', 'Oyekan', 'Chukwu'];

const categories = [
  { id: crypto.randomUUID(), name: 'Bridal Couture', slug: 'bridal-couture', description: 'Custom wedding dresses and bridal wear', icon_name: 'heart' },
  { id: crypto.randomUUID(), name: 'Menswear', slug: 'menswear', description: 'Agbada, kaftans, and suits', icon_name: 'user' },
  { id: crypto.randomUUID(), name: 'Ready-to-wear', slug: 'ready-to-wear', description: 'Everyday fashion and contemporary styles', icon_name: 'bag' },
  { id: crypto.randomUUID(), name: 'Modest Fashion', slug: 'modest-fashion', description: 'Luxury modest wear', icon_name: 'spark' },
  { id: crypto.randomUUID(), name: 'Children\'s occasionwear', slug: 'childrens-occasionwear', description: 'Luxury wear for children', icon_name: 'star' }
];

let sql = `-- Seed Script: Generated Mock Profiles
-- Note: This is designed to be run in the Supabase SQL Editor or locally via supabase db reset

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, icon_name) VALUES
`;
sql += categories.map(c => `  ('${c.id}', '${c.name.replace(/'/g, "''")}', '${c.slug}', '${c.description}', '${c.icon_name}')`).join(',\n') + '\nON CONFLICT (slug) DO NOTHING;\n\n';

sql += `DO $$\nBEGIN\n\n`;

const businesses = [];
for (let i = 0; i < 50; i++) {
  const userId = crypto.randomUUID();
  const businessId = crypto.randomUUID();
  const firstName = firstNames[i];
  const lastName = lastNames[i];
  const type = i < 30 ? 'designer' : 'brand';
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[city];
  let businessName = type === 'designer' ? `${firstName} ${lastName}` : `${lastName} ${['Atelier', 'Couture', 'Studios', 'Apparel', 'Designs', 'House', 'Collective'][Math.floor(Math.random() * 7)]}`;
  let slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  // ensure unique slug
  slug = `${slug}-${i}`;
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
  const reviews = Math.floor(Math.random() * 250);
  const startingPrice = Math.floor(Math.random() * 40) * 10000 + 50000;

  businesses.push({ userId, businessId, firstName, lastName, type, city, state, businessName, slug, rating, reviews, startingPrice });
}

// Generate auth.users inserts
sql += `  INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)\n  VALUES\n`;
sql += businesses.map((b, i) => `    ('00000000-0000-0000-0000-000000000000', '${b.userId}', 'authenticated', 'authenticated', 'user${i}@example.com', 'dummy_hash', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '')`).join(',\n') + '\n  ON CONFLICT (id) DO NOTHING;\n\n';

// Generate profiles inserts
sql += `  INSERT INTO public.profiles (id, first_name, last_name, role, avatar_url) VALUES\n`;
sql += businesses.map((b, i) => `    ('${b.userId}', '${b.firstName.replace(/'/g, "''")}', '${b.lastName.replace(/'/g, "''")}', 'professional', '/images/designer-${i%3===0?'blue':i%3===1?'menswear':'green'}.jpg')`).join(',\n') + '\n  ON CONFLICT (id) DO NOTHING;\n\n';

// Generate businesses inserts
sql += `  INSERT INTO public.businesses (id, owner_id, business_name, slug, type, description, is_verified, city, state, rating, review_count, starting_price) VALUES\n`;
sql += businesses.map((b, i) => `    ('${b.businessId}', '${b.userId}', '${b.businessName.replace(/'/g, "''")}', '${b.slug}', '${b.type}', 'Premium fashion ${b.type} based in ${b.city}.', true, '${b.city}', '${b.state}', ${b.rating}, ${b.reviews}, ${b.startingPrice})`).join(',\n') + '\n  ON CONFLICT (slug) DO NOTHING;\n\n';

sql += `END $$;\n\n`;

// Generate business_categories outside of DO block
sql += `INSERT INTO public.business_categories (business_id, category_id) VALUES\n`;
const bcInserts = [];
businesses.forEach(b => {
  // pick 1-3 random categories
  const numCats = Math.floor(Math.random() * 3) + 1;
  const shuffled = categories.sort(() => 0.5 - Math.random());
  for(let i=0; i<numCats; i++) {
    bcInserts.push(`  ('${b.businessId}', '${shuffled[i].id}')`);
  }
});
sql += bcInserts.join(',\n') + '\nON CONFLICT DO NOTHING;\n';

fs.mkdirSync(path.join(__dirname, '../supabase'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../supabase/seed.sql'), sql);
console.log('Seed SQL generated successfully!');

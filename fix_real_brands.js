const fs = require('fs');

let sql = fs.readFileSync('real_brands_seed.sql', 'utf8');

const allowedTypes = ['designer', 'brand', 'school', 'stylist', 'artisan', 'manufacturer'];

// Fix the insert statement
sql = sql.replace(
  /INSERT INTO public\.businesses \(id, owner_id, business_name, slug, type, description, cover_image_url, is_verified, city, state, address, rating, review_count, starting_price\) VALUES/g,
  'INSERT INTO public.businesses (id, owner_id, business_name, slug, business_type, description, cover_image_url, is_verified, city, state) VALUES'
);

const regex = /\('([0-9a-f-]{36})',\s*'([0-9a-f-]{36})',\s*'(.*?)',\s*'(.*?)',\s*'([^']+)',\s*'(.*?)',\s*'(.*?)',\s*(true|false),\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*[\d.]+,\s*\d+,\s*\d+\)/g;

sql = sql.replace(regex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) => {
  let type = p5;
  if (!allowedTypes.includes(type)) {
    type = 'brand'; // fallback to brand if not in allowed enum
  }
  return `('${p1}', '${p2}', '${p3}', '${p4}', '${type}', '${p6}', '${p7}', ${p8}, '${p9}', '${p10}')`;
});

// Let's also add some fake ads for these real brands into the promoted_campaigns table!
sql += `\n
-- Generate active ad campaigns for a few of these brands
INSERT INTO public.promoted_campaigns (id, business_id, target_type, status, amount_paid, starts_at, expires_at, impressions, clicks) VALUES
(gen_random_uuid(), 'a53c379f-aa1f-4985-920c-e21349823eeb', 'profile', 'active', 50000, now() - interval '2 days', now() + interval '28 days', 1542, 87),
(gen_random_uuid(), '25eb4e12-7ef7-44ef-b243-13795ab0a953', 'profile', 'active', 25000, now() - interval '5 days', now() + interval '25 days', 3491, 142),
(gen_random_uuid(), 'c14657e1-d748-40f1-a7b0-476f0136100b', 'profile', 'active', 100000, now() - interval '1 day', now() + interval '29 days', 890, 41)
ON CONFLICT DO NOTHING;
`;

fs.writeFileSync('fixed_real_brands_seed.sql', sql);
console.log('Fixed real brands seed file generated.');

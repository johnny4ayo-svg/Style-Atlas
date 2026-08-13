const fs = require('fs');

let sql = fs.readFileSync('massive_seed.sql', 'utf8');

// Fix businesses insert statement
sql = sql.replace(
  /INSERT INTO public\.businesses \(id, owner_id, business_name, slug, type, description, cover_image_url, is_verified, city, state, address, rating, review_count, starting_price\) VALUES/g,
  'INSERT INTO public.businesses (id, owner_id, business_name, slug, business_type, description, cover_image_url, is_verified, city, state) VALUES'
);

// We need to remove the last 4 values in each tuple for the businesses inserts
// The format is: ('uuid', 'uuid', 'name', 'slug', 'type', 'desc', 'img', bool, 'city', 'state', 'address', 4.8, 183, 1055893),

const regex = /\('([0-9a-f-]{36})',\s*'([0-9a-f-]{36})',\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*(true|false),\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*[\d.]+,\s*\d+,\s*\d+\)/g;

sql = sql.replace(regex, "('$1', '$2', '$3', '$4', '$5', '$6', '$7', $8, '$9', '$10')");

fs.writeFileSync('fixed_massive_seed.sql', sql);
console.log('Fixed seed file written to fixed_massive_seed.sql');

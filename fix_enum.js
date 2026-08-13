const fs = require('fs');

let sql = fs.readFileSync('fixed_massive_seed.sql', 'utf8');

const allowedTypes = ['designer', 'brand', 'school', 'stylist', 'artisan', 'manufacturer'];

// We need to parse each INSERT INTO public.businesses tuple and fix the type
// The format is: ('uuid', 'uuid', 'name', 'slug', 'type', 'desc', 'img', bool, 'city', 'state')

const regex = /\('([0-9a-f-]{36})',\s*'([0-9a-f-]{36})',\s*'(.*?)',\s*'(.*?)',\s*'([^']+)',\s*'(.*?)',\s*'(.*?)',\s*(true|false),\s*'(.*?)',\s*'(.*?)'\)/g;

sql = sql.replace(regex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) => {
  let type = p5;
  if (!allowedTypes.includes(type)) {
    type = 'brand'; // fallback to brand if not in allowed enum
  }
  return `('${p1}', '${p2}', '${p3}', '${p4}', '${type}', '${p6}', '${p7}', ${p8}, '${p9}', '${p10}')`;
});

fs.writeFileSync('fixed_massive_seed.sql', sql);
console.log('Fixed enum values in fixed_massive_seed.sql');

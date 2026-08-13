const fs = require('fs');
const crypto = require('crypto');

function generateRealBrandsSeed() {
  console.log("Generating real_brands_seed.sql...");

  const adminId = crypto.randomUUID();
  
  let sql = `-- Real Brands Seed for STYLEATLAS\n`;
  sql += `-- Generated on ${new Date().toISOString()}\n\n`;
  sql += `BEGIN;\n\n`;

  sql += `-- 1. Create a dummy admin user to own these unclaimed real brands\n`;
  sql += `INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES\n`;
  sql += `('${adminId}', 'authenticated', 'authenticated', 'real_brands_admin@styleatlas.com', 'dummy', now(), now(), now()) ON CONFLICT DO NOTHING;\n\n`;
  
  sql += `INSERT INTO public.profiles (id, first_name, last_name, role, avatar_url) VALUES\n`;
  sql += `('${adminId}', 'STYLEATLAS', 'Concierge', 'admin', '/images/designer-blue.jpg') ON CONFLICT DO NOTHING;\n\n`;

  const realBrands = [
    { name: 'Deola Sagoe', type: 'designer', city: 'Lagos', desc: 'A titan in the industry, recognized for timeless haute couture and expertise in transforming traditional fabrics like Aso-Oke into sophisticated, modern luxury pieces.' },
    { name: 'Lisa Folawiyo', type: 'designer', city: 'Lagos', desc: 'A pioneer who revolutionized the use of Ankara fabric, known globally for her creative print-mixing and intricate, handcrafted embellishments.' },
    { name: 'Mai Atafo', type: 'tailor', city: 'Lagos', desc: 'Renowned for exceptional tailoring and luxury menswear, his brand is a go-to for celebrities, business executives, and grooms seeking elegant, perfectly fitted suits and wedding attire.' },
    { name: 'Orange Culture', type: 'brand', city: 'Lagos', desc: 'A label that challenges traditional ideas of masculinity and gender norms through fluid construction, bold colors, and street-inspired, narrative-driven designs.' },
    { name: 'Andrea Iyamah', type: 'brand', city: 'Lagos', desc: 'Highly acclaimed for her vibrant, structured resort wear and swimwear that celebrates cultural identity and femininity.' },
    { name: 'Tokyo James', type: 'designer', city: 'Lagos', desc: 'Known for a distinctively bold, architectural, and luxury aesthetic, his brand often features sculptural tailoring and heavy textures like leather and velvet.' },
    { name: 'Veekee James', type: 'designer', city: 'Lagos', desc: 'A leading name in the bridal and red-carpet scene, celebrated for glamorous, figure-enhancing corset gowns.' },
    { name: 'Maki Oh', type: 'brand', city: 'Lagos', desc: 'Internationally recognized for blending traditional African textiles with avant-garde design, often focusing on storytelling through clothing.' },
    { name: 'IAMISIGO', type: 'brand', city: 'Lagos', desc: 'Known for creating an immersive, artistic world, this brand uses African philosophies, natural dyes, and prehistoric-inspired techniques.' },
    { name: 'CLAN', type: 'brand', city: 'Lagos', desc: 'A brand praised for its excellent tailoring, sophisticated style, and vibrant use of colors and prints.' },
    { name: 'Fruché', type: 'brand', city: 'Lagos', desc: 'An emerging label that explores historical and modern Nigerian stories, challenging traditional dress codes through innovative silhouettes.' },
    { name: 'Outterspace Integrated Luxury', type: 'brand', city: 'Lagos', desc: 'A collective-founded brand that bridges the gap between high-end luxury and modern streetwear.' },
    { name: 'MOT The Label', type: 'brand', city: 'Lagos', desc: 'Popular for versatile workwear and contemporary silhouettes.' },
    { name: 'Hertunba', type: 'designer', city: 'Lagos', desc: 'Noted for intricate detailing, draping, and sustainable fashion practices.' },
    { name: 'Kilentar', type: 'brand', city: 'Lagos', desc: 'Fusing African heritage with modern design through ethically sourced materials.' },
    { name: 'Kai Collective', type: 'brand', city: 'Abuja', desc: 'A London/Nigeria based womenswear brand famous for its signature Gaia print and confidence-boosting designs.' },
    { name: 'Tia Adeola', type: 'designer', city: 'Lagos', desc: 'Known for her renaissance-inspired ruffles and sheer fabrics that challenge traditional female dress.' },
    { name: 'Kenneth Ize', type: 'designer', city: 'Lagos', desc: 'Celebrated for his modern interpretation of traditional Nigerian Asoke fabric and collaborations with global luxury houses.' },
    { name: 'Atafo Bridal', type: 'designer', city: 'Lagos', desc: 'The bridal arm of Mai Atafo, creating some of the most sought-after wedding gowns in West Africa.' },
    { name: 'Matopeda', type: 'designer', city: 'Lagos', desc: 'Creating show-stopping luxury gowns for women to feel powerful and beautiful.' }
  ];

  sql += `-- 2. Generate Real Brands\n`;
  sql += `INSERT INTO public.businesses (id, owner_id, business_name, slug, type, description, cover_image_url, is_verified, city, state, address, rating, review_count, starting_price) VALUES\n`;
  
  const bizValues = [];
  const IMAGES = ['/images/designer-blue.jpg', '/images/designer-green.jpg', '/images/designer-menswear.jpg', '/images/designer-bridal.jpg', '/images/fashion-studio.jpg', '/images/fashion-couple.jpg'];

  for (let i = 0; i < realBrands.length; i++) {
    const brand = realBrands[i];
    const bizId = crypto.randomUUID();
    
    // Convert brand name to slug (e.g. "Deola Sagoe" -> "deola-sagoe")
    const slug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const img = IMAGES[i % IMAGES.length];
    
    // Set is_verified = false so the "Claim Profile" button appears
    bizValues.push(`('${bizId}', '${adminId}', '${brand.name.replace(/'/g, "''")}', '${slug}', '${brand.type}', '${brand.desc.replace(/'/g, "''")}', '${img}', false, '${brand.city}', '${brand.city === 'Abuja' ? 'FCT' : 'Lagos'}', 'Contact for details', 5.0, ${Math.floor(Math.random() * 200) + 50}, 250000)`);
  }
  
  sql += bizValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;
  sql += `COMMIT;\n`;

  fs.writeFileSync('real_brands_seed.sql', sql);
  console.log("Successfully generated real_brands_seed.sql! 🚀");
}

generateRealBrandsSeed();

const fs = require('fs');
const crypto = require('crypto');

function generateCapitalsSeed() {
  console.log("Generating seed_capitals.sql...");

  // Same admin ID from previous script so they own these records
  const adminId = 'd578c772-2d88-46fb-b0b3-9eb1f82f8d8b'; // Assuming a static ID or we can just fetch one. Let's just create a new admin or use a known one. Actually, we'll let it use an INSERT ON CONFLICT DO NOTHING for the admin user just in case.

  let sql = `-- Real Brands in State Capitals Seed for STYLEATLAS\n`;
  sql += `-- Generated on ${new Date().toISOString()}\n\n`;
  sql += `BEGIN;\n\n`;

  sql += `-- Ensure admin exists\n`;
  sql += `INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES\n`;
  sql += `('${adminId}', 'authenticated', 'authenticated', 'real_brands_admin@styleatlas.com', 'dummy', now(), now(), now()) ON CONFLICT DO NOTHING;\n\n`;
  
  sql += `INSERT INTO public.profiles (id, first_name, last_name, role, avatar_url) VALUES\n`;
  sql += `('${adminId}', 'STYLEATLAS', 'Concierge', 'admin', '/images/designer-blue.jpg') ON CONFLICT DO NOTHING;\n\n`;

  const brands = [
    // --- LAGOS (5 more) ---
    { name: 'Ugo Monye', type: 'designer', city: 'Lagos', state: 'Lagos', desc: 'Renowned for his avant-garde approach to men’s traditional wear, especially the iconic Reale collection.' },
    { name: 'Tiffany Amber', type: 'brand', city: 'Lagos', state: 'Lagos', desc: 'The first African-based label to show twice at New York Fashion Week, defining modern African luxury.' },
    { name: 'Lanre Da Silva Ajayi', type: 'designer', city: 'Lagos', state: 'Lagos', desc: 'Famous for creating garments that merge 1940s couture aesthetics with traditional African prints.' },
    { name: 'Dzyn', type: 'brand', city: 'Lagos', state: 'Lagos', desc: 'Delivering affordable luxury with a focus on feminine, contemporary aesthetics.' },
    { name: 'Sisiano', type: 'designer', city: 'Lagos', state: 'Lagos', desc: 'A multi-disciplinary brand known for fluid, movement-focused garments.' },
    
    // --- ABUJA (10) ---
    { name: 'Hudayya', type: 'designer', city: 'Abuja', state: 'FCT', desc: 'The leading luxury womenswear brand in Northern Nigeria, famous for exquisite bridal wear and intricate beadwork.' },
    { name: 'DZYN Abuja', type: 'brand', city: 'Abuja', state: 'FCT', desc: 'A staple in the Abuja fashion scene offering elegant ready-to-wear pieces.' },
    { name: 'Kulu Abuja', type: 'designer', city: 'Abuja', state: 'FCT', desc: 'Specializing in contemporary modest fashion for the modern woman.' },
    { name: 'Style Temple', type: 'designer', city: 'Abuja', state: 'FCT', desc: 'A luxury brand combining structural tailoring with soft, feminine draping.' },
    { name: 'Ogodor', type: 'brand', city: 'Abuja', state: 'FCT', desc: 'Creating bold, culturally inspired pieces for the modern African.' },
    { name: 'Falke by Falke', type: 'designer', city: 'Abuja', state: 'FCT', desc: 'Known for bespoke tailoring and premium menswear.' },
    { name: 'Rikato by Me', type: 'brand', city: 'Abuja', state: 'FCT', desc: 'Exclusive couture and bridal wear designed for royalty and high society.' },
    { name: 'Vanskere Abuja', type: 'designer', city: 'Abuja', state: 'FCT', desc: 'High-end menswear redefining traditional tunics and agbadas.' },
    { name: 'Yomi Casual Abuja', type: 'brand', city: 'Abuja', state: 'FCT', desc: 'Premium casual and traditional wear for men.' },
    { name: 'Maison Fara', type: 'designer', city: 'Abuja', state: 'FCT', desc: 'Luxury ready-to-wear emphasizing minimalist elegance.' },
    
    // --- PORT HARCOURT (7) ---
    { name: 'Revamp by Hassana', type: 'designer', city: 'Port Harcourt', state: 'Rivers', desc: 'Known for transforming traditional fabrics into contemporary, edgy silhouettes.' },
    { name: 'Johnson Johnson', type: 'designer', city: 'Port Harcourt', state: 'Rivers', desc: 'A premier bespoke menswear label in the South-South region.' },
    { name: 'Jevis Couture', type: 'brand', city: 'Port Harcourt', state: 'Rivers', desc: 'Specializing in elaborate bridal and evening wear.' },
    { name: 'Lighthouse Fashion', type: 'school', city: 'Port Harcourt', state: 'Rivers', desc: 'A leading fashion academy and design house shaping the next generation.' },
    { name: 'Trish O Couture PH', type: 'designer', city: 'Port Harcourt', state: 'Rivers', desc: 'Luxury womenswear focusing on bold prints and elegant cuts.' },
    { name: 'House of Sota', type: 'brand', city: 'Port Harcourt', state: 'Rivers', desc: 'Fusing African heritage with global fashion trends.' },
    { name: 'Lolo\'s Closet', type: 'brand', city: 'Port Harcourt', state: 'Rivers', desc: 'Curated ready-to-wear fashion for the modern professional.' },

    // --- KANO (6) ---
    { name: 'Zahra Fashion', type: 'designer', city: 'Kano', state: 'Kano', desc: 'A pioneer in luxury modest fashion and premium abayas.' },
    { name: 'Kano Threads', type: 'tailor', city: 'Kano', state: 'Kano', desc: 'Specialists in high-end, hand-embroidered traditional Northern menswear (Babban Riga).' },
    { name: 'Amnas Closet', type: 'brand', city: 'Kano', state: 'Kano', desc: 'Modern modest wear incorporating rich Hausa-Fulani cultural elements.' },
    { name: 'Sefiya Couture', type: 'designer', city: 'Kano', state: 'Kano', desc: 'Bridal wear explicitly designed for Northern Nigerian brides.' },
    { name: 'Arewa Heritage', type: 'brand', city: 'Kano', state: 'Kano', desc: 'A lifestyle brand celebrating the textiles and history of the North.' },
    { name: 'Dalar Kano Fabrics', type: 'brand', city: 'Kano', state: 'Kano', desc: 'Not just a fabric seller, but a creator of custom-tailored masterpieces.' },

    // --- BENIN CITY (5) ---
    { name: 'Edo Queens Fashion', type: 'designer', city: 'Benin City', state: 'Edo', desc: 'Specialists in traditional Edo bridal attire, focusing on exquisite coral beadwork.' },
    { name: 'Royal Threads Benin', type: 'tailor', city: 'Benin City', state: 'Edo', desc: 'Bespoke tailoring with a modern twist on traditional garments.' },
    { name: 'Ibie Couture', type: 'brand', city: 'Benin City', state: 'Edo', desc: 'Contemporary womenswear designed for the modern South-South woman.' },
    { name: 'Osa Styles', type: 'designer', city: 'Benin City', state: 'Edo', desc: 'A prominent name in Benin for high-quality, custom event wear.' },
    { name: 'Benin Bridal Hub', type: 'brand', city: 'Benin City', state: 'Edo', desc: 'A one-stop destination for luxury bridal styling and design.' },

    // --- ENUGU (5) ---
    { name: 'Coal City Couture', type: 'designer', city: 'Enugu', state: 'Enugu', desc: 'Leading the fashion renaissance in the East with innovative Isiagu designs.' },
    { name: 'Nike\'s Wardrobe', type: 'brand', city: 'Enugu', state: 'Enugu', desc: 'A staple in Enugu for stylish, affordable ready-to-wear.' },
    { name: 'Zikora Tailors', type: 'tailor', city: 'Enugu', state: 'Enugu', desc: 'Master tailors specializing in men’s suits and traditional eastern wear.' },
    { name: 'Udi Hills Fashion', type: 'designer', city: 'Enugu', state: 'Enugu', desc: 'Bridal and evening wear inspired by the natural beauty of the region.' },
    { name: 'Ogene Styles', type: 'brand', city: 'Enugu', state: 'Enugu', desc: 'Celebrating Igbo culture through vibrant, contemporary fashion pieces.' }
  ];

  sql += `-- 2. Generate Real Brands\n`;
  sql += `INSERT INTO public.businesses (id, owner_id, business_name, slug, type, description, cover_image_url, is_verified, city, state, address, rating, review_count, starting_price) VALUES\n`;
  
  const bizValues = [];
  const IMAGES = ['/images/designer-blue.jpg', '/images/designer-green.jpg', '/images/designer-menswear.jpg', '/images/designer-bridal.jpg', '/images/fashion-studio.jpg', '/images/fashion-couple.jpg'];

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    const bizId = crypto.randomUUID();
    
    const slug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const img = IMAGES[i % IMAGES.length];
    
    // Set is_verified = false so the "Claim Profile" button appears
    bizValues.push(`('${bizId}', '${adminId}', '${brand.name.replace(/'/g, "''")}', '${slug}', '${brand.type}', '${brand.desc.replace(/'/g, "''")}', '${img}', false, '${brand.city}', '${brand.state}', 'Contact for details', 5.0, ${Math.floor(Math.random() * 200) + 10}, 150000)`);
  }
  
  sql += bizValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;
  sql += `COMMIT;\n`;

  fs.writeFileSync('seed_capitals.sql', sql);
  console.log("Successfully generated seed_capitals.sql! 🚀");
}

generateCapitalsSeed();

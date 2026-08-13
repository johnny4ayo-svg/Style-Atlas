const fs = require('fs');

async function generateMassiveSeed() {
  const { faker } = await import('@faker-js/faker');
  console.log("Generating massive_seed.sql...");

  const NIGERIAN_CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Enugu', 'Ibadan', 'Benin City', 'Uyo', 'Aba', 'Kaduna'];
  const NIGERIAN_STATES = ['Lagos', 'FCT', 'Rivers', 'Kano', 'Enugu', 'Oyo', 'Edo', 'Akwa Ibom', 'Abia', 'Kaduna'];
  const BUSINESS_TYPES = ['designer', 'brand', 'school', 'stylist', 'tailor', 'photographer', 'agency', 'store'];
  const IMAGES = ['/images/designer-blue.jpg', '/images/designer-green.jpg', '/images/designer-menswear.jpg', '/images/designer-bridal.jpg', '/images/fashion-studio.jpg', '/images/fashion-couple.jpg'];

  let sql = `-- Massive Data Seed for STYLEATLAS\n`;
  sql += `-- Generated on ${new Date().toISOString()}\n\n`;
  sql += `BEGIN;\n\n`;

  // 1. We need one valid owner_id for all the businesses if the database is empty.
  // We'll create a dummy user in auth.users and public.profiles just for the seeding.
  const adminId = faker.string.uuid();
  
  sql += `-- 1. Create a dummy admin user to own the seeded data\n`;
  sql += `INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES\n`;
  sql += `('${adminId}', 'authenticated', 'authenticated', 'admin_seed@example.com', 'dummy', now(), now(), now()) ON CONFLICT DO NOTHING;\n\n`;
  
  sql += `INSERT INTO public.profiles (id, first_name, last_name, role, avatar_url) VALUES\n`;
  sql += `('${adminId}', 'System', 'Admin', 'admin', '/images/designer-blue.jpg') ON CONFLICT DO NOTHING;\n\n`;

  // 2. Generate Businesses
  sql += `-- 2. Generate 100 Businesses\n`;
  sql += `INSERT INTO public.businesses (id, owner_id, business_name, slug, type, description, cover_image_url, is_verified, city, state, address, rating, review_count, starting_price) VALUES\n`;
  
  const businessIds = [];
  const bizValues = [];
  
  for (let i = 0; i < 100; i++) {
    const bizId = faker.string.uuid();
    businessIds.push(bizId);
    
    const cityIdx = faker.number.int({ min: 0, max: 9 });
    const businessName = faker.company.name().replace(/'/g, "''") + (faker.number.float() > 0.5 ? ' Atelier' : ' Designs');
    const slug = faker.helpers.slugify(businessName).toLowerCase() + '-' + faker.string.alphanumeric(4);
    const type = faker.helpers.arrayElement(BUSINESS_TYPES);
    const desc = (faker.company.catchPhrase() + '. ' + faker.lorem.paragraph()).replace(/'/g, "''");
    const img = faker.helpers.arrayElement(IMAGES);
    const isVer = faker.datatype.boolean();
    const city = NIGERIAN_CITIES[cityIdx];
    const state = NIGERIAN_STATES[cityIdx];
    const addr = faker.location.streetAddress().replace(/'/g, "''");
    const rating = faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 });
    const rc = faker.number.int({ min: 0, max: 500 });
    const price = faker.number.int({ min: 50000, max: 1500000 });

    bizValues.push(`('${bizId}', '${adminId}', '${businessName}', '${slug}', '${type}', '${desc}', '${img}', ${isVer}, '${city}', '${state}', '${addr}', ${rating}, ${rc}, ${price})`);
  }
  sql += bizValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;

  // 3. Generate Products
  sql += `-- 3. Generate 500 Products\n`;
  sql += `INSERT INTO public.products (id, business_id, name, description, base_price, image_url, is_published) VALUES\n`;
  const prodValues = [];
  for (let i = 0; i < 500; i++) {
    const pId = faker.string.uuid();
    const bId = faker.helpers.arrayElement(businessIds);
    const name = faker.commerce.productName().replace(/'/g, "''");
    const desc = faker.commerce.productDescription().replace(/'/g, "''");
    const price = faker.number.int({ min: 10000, max: 300000 });
    const img = faker.helpers.arrayElement(IMAGES);
    prodValues.push(`('${pId}', '${bId}', '${name}', '${desc}', ${price}, '${img}', true)`);
  }
  sql += prodValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;

  // 4. Generate Jobs
  sql += `-- 4. Generate 100 Jobs\n`;
  sql += `INSERT INTO public.jobs (id, business_id, title, type, location, description, salary_range, is_active) VALUES\n`;
  const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship', 'freelance'];
  const jobValues = [];
  for (let i = 0; i < 100; i++) {
    const jId = faker.string.uuid();
    const bId = faker.helpers.arrayElement(businessIds);
    const title = faker.person.jobTitle().replace(/'/g, "''");
    const type = faker.helpers.arrayElement(JOB_TYPES);
    const loc = faker.helpers.arrayElement(NIGERIAN_CITIES).replace(/'/g, "''");
    const desc = faker.lorem.paragraphs(2).replace(/'/g, "''");
    const sal = `₦${faker.number.int({min: 50, max: 200})},000 - ₦${faker.number.int({min: 250, max: 500})},000 / month`;
    const active = faker.datatype.boolean({ probability: 0.8 });
    jobValues.push(`('${jId}', '${bId}', '${title}', '${type}', '${loc}', '${desc}', '${sal}', ${active})`);
  }
  sql += jobValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;

  // 5. Generate Events
  sql += `-- 5. Generate 50 Events\n`;
  sql += `INSERT INTO public.events (id, business_id, title, description, event_date, location, ticket_price, capacity, image_url) VALUES\n`;
  const eventValues = [];
  for (let i = 0; i < 50; i++) {
    const eId = faker.string.uuid();
    const bId = faker.helpers.arrayElement(businessIds);
    const title = (faker.company.catchPhrase() + " Fashion Show").replace(/'/g, "''");
    const desc = faker.lorem.paragraph().replace(/'/g, "''");
    const date = faker.date.future({ years: 1 }).toISOString();
    const loc = (faker.helpers.arrayElement(NIGERIAN_CITIES) + ' Convention Center').replace(/'/g, "''");
    const price = faker.number.int({ min: 5000, max: 50000 });
    const cap = faker.number.int({ min: 50, max: 1000 });
    const img = faker.helpers.arrayElement(IMAGES);
    eventValues.push(`('${eId}', '${bId}', '${title}', '${desc}', '${date}', '${loc}', ${price}, ${cap}, '${img}')`);
  }
  sql += eventValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;

  // 6. Generate Articles
  sql += `-- 6. Generate 20 Articles\n`;
  sql += `INSERT INTO public.articles (id, title, slug, content, cover_image_url, author_id, published_at) VALUES\n`;
  const artValues = [];
  for (let i = 0; i < 20; i++) {
    const aId = faker.string.uuid();
    const title = faker.lorem.sentence({ min: 4, max: 8 }).replace(/'/g, "''");
    const slug = faker.helpers.slugify(title).toLowerCase();
    const content = faker.lorem.paragraphs(10).replace(/'/g, "''");
    const img = faker.helpers.arrayElement(IMAGES);
    const pub = faker.date.past().toISOString();
    artValues.push(`('${aId}', '${title}', '${slug}', '${content}', '${img}', '${adminId}', '${pub}')`);
  }
  sql += artValues.join(',\n') + ` ON CONFLICT DO NOTHING;\n\n`;

  sql += `COMMIT;\n`;

  fs.writeFileSync('massive_seed.sql', sql);
  console.log("Successfully generated massive_seed.sql! 🚀");
}

generateMassiveSeed().catch(console.error);

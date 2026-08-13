require('dotenv').config({ path: '.env.local' });
global.WebSocket = require('ws');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkBusinesses() {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('business_type', 'designer');
    
  if (error) {
    console.error('Error fetching businesses:', error);
  } else {
    console.log(`Total businesses found: ${data.length}`);
    if (data.length > 0) {
        console.log('First row columns:', Object.keys(data[0]));
        console.log('First row data:', data[0]);
    }
  }
}

checkBusinesses();

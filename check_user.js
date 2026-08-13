require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkUser() {
  console.log("Checking if real_brands_admin@styleatlas.com exists in profiles...");
  
  // Try to find the user in the public profiles table
  const { data, error } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, role')
    // we don't have email in profiles, but we can check if a profile with role 'admin' exists
    .eq('role', 'admin');
  
  if (error) {
    console.error("Error fetching profiles:", error.message);
    return;
  }
  
  if (data && data.length > 0) {
    console.log("✅ YES, found Admin profiles:");
    console.table(data);
  } else {
    console.log("❌ NO Admin profiles found.");
  }
}

checkUser();

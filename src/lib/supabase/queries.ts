import { createClient } from "./server";
import { unstable_cache } from "next/cache";

export const getPlatformStats = unstable_cache(
  async () => {
    const supabase = createClient();
    
    // Get verified professionals count
    const { count: professionalCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'professional');
      
    // Get verified businesses count
    const { count: businessCount } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('verification_status', 'approved');

    return {
      professionals: professionalCount || 0,
      businesses: businessCount || 0,
    };
  },
  ['platform-stats'],
  {
    revalidate: 3600, // Cache for 1 hour
  }
);

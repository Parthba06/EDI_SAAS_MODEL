import { createClient } from "@supabase/supabase-js";

// In Vite, env vars must start with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  
  console.warn("Supabase URL or anon key is missing. Check your VITE_SUPABASE_* env vars.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or anon key is missing. Check your VITE_SUPABASE_* env vars.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfzmkyovvowkxwoovpnr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmem1reW92dm93a3h3b292cG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MzE2MjQsImV4cCI6MjA4MDQwNzYyNH0.Emdbla6DCXY1QAZhR_0wGUAHmovQAgafILxWFUr7i2I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

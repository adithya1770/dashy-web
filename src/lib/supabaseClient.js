import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"

const supabaseUrl = 'https://wizsdlipftwukrgfqzwy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpenNkbGlwZnR3dWtyZ2Zxend5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5OTE1NzUsImV4cCI6MjA0NjU2NzU3NX0.8UOIuRHCV1L6sqfe0JzsoGtXo4CUcmb1D0axq3mt4t0';

export const supabase = createClient(supabaseUrl, supabaseKey);
        
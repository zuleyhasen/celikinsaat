import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title_tr: string;
  title_en: string;
  title_ar: string;
  description_tr: string;
  description_en: string;
  description_ar: string;
  image_url: string;
  location: string;
  year: number;
  category: string;
  display_order: number;
};

export type CompanyStat = {
  id: string;
  stat_key: string;
  value: string;
  label_tr: string;
  label_en: string;
  label_ar: string;
  display_order: number;
};

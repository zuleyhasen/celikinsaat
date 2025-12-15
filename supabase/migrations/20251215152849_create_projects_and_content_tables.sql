/*
  # Create Projects and Content Tables for Çelik İnşaat Website

  ## Overview
  This migration creates the database structure for a multi-language corporate website
  with projects showcase and dynamic content management.

  ## New Tables
  
  ### `projects`
  Stores construction projects with multi-language support
  - `id` (uuid, primary key)
  - `title_tr` (text) - Turkish title
  - `title_en` (text) - English title
  - `title_ar` (text) - Arabic title
  - `description_tr` (text) - Turkish description
  - `description_en` (text) - English description
  - `description_ar` (text) - Arabic description
  - `image_url` (text) - Project main image
  - `location` (text) - Project location
  - `year` (integer) - Completion year
  - `category` (text) - Project category (e.g., 'commercial', 'infrastructure', 'industrial')
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `company_stats`
  Stores company statistics with multi-language labels
  - `id` (uuid, primary key)
  - `stat_key` (text, unique) - Key identifier (e.g., 'years_experience', 'projects_completed')
  - `value` (text) - Numeric value or text
  - `label_tr` (text) - Turkish label
  - `label_en` (text) - English label
  - `label_ar` (text) - Arabic label
  - `display_order` (integer)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access (for website visitors)
  - Authenticated write access (for admin panel in future)

  ## Notes
  - All tables use `gen_random_uuid()` for primary keys
  - Timestamps use `now()` for defaults
  - RLS policies allow public read access since this is a public website
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_tr text NOT NULL,
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_tr text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  image_url text NOT NULL,
  location text NOT NULL,
  year integer NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create company_stats table
CREATE TABLE IF NOT EXISTS company_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text UNIQUE NOT NULL,
  value text NOT NULL,
  label_tr text NOT NULL,
  label_en text NOT NULL,
  label_ar text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view projects"
  ON projects
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view company stats"
  ON company_stats
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage company stats"
  ON company_stats
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample projects
INSERT INTO projects (title_tr, title_en, title_ar, description_tr, description_en, description_ar, image_url, location, year, category, display_order) VALUES
(
  'İstanbul Finans Merkezi',
  'Istanbul Financial Center',
  'مركز إسطنبول المالي',
  'Modern çelik konstrüksiyon ile inşa edilen 52 katlı finans merkezi. Toplam 180.000 m² inşaat alanı.',
  'A 52-story financial center built with modern steel construction. Total construction area of 180,000 m².',
  'مركز مالي من 52 طابقًا تم بناؤه بالبناء الفولاذي الحديث. مساحة بناء إجمالية 180,000 متر مربع.',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  'Istanbul, Turkey',
  2023,
  'commercial',
  1
),
(
  'Körfez Geçiş Köprüsü',
  'Gulf Crossing Bridge',
  'جسر عبور الخليج',
  '3.2 km uzunluğunda çelik kablo askılı köprü. Günlük 45.000 araç kapasiteli.',
  'A 3.2 km long steel cable-stayed bridge. Daily capacity of 45,000 vehicles.',
  'جسر معلق بكابلات فولاذية بطول 3.2 كم. سعة يومية 45,000 مركبة.',
  'https://images.pexels.com/photos/681368/pexels-photo-681368.jpeg',
  'İzmir, Turkey',
  2022,
  'infrastructure',
  2
),
(
  'Endüstriyel Üretim Tesisi',
  'Industrial Production Facility',
  'منشأة الإنتاج الصناعي',
  '85.000 m² kapalı alan. Ağır sanayi için özel tasarlanmış çelik strüktür.',
  '85,000 m² enclosed area. Steel structure specially designed for heavy industry.',
  'مساحة مغلقة 85,000 متر مربع. هيكل فولاذي مصمم خصيصًا للصناعة الثقيلة.',
  'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg',
  'Gebze, Turkey',
  2023,
  'industrial',
  3
),
(
  'Dubai Marina Rezidans',
  'Dubai Marina Residence',
  'مساكن دبي مارينا',
  'Lüks rezidans projesi. 38 kat, deniz manzaralı çelik çatı konstrüksiyonu.',
  'Luxury residence project. 38 floors, steel roof construction with sea view.',
  'مشروع سكني فاخر. 38 طابقًا، بناء سقف فولاذي بإطلالة على البحر.',
  'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg',
  'Dubai, UAE',
  2021,
  'commercial',
  4
);

-- Insert sample company stats
INSERT INTO company_stats (stat_key, value, label_tr, label_en, label_ar, display_order) VALUES
('years_experience', '32', 'Yıllık Deneyim', 'Years of Experience', 'سنوات من الخبرة', 1),
('projects_completed', '287', 'Tamamlanan Proje', 'Completed Projects', 'المشاريع المنجزة', 2),
('steel_tonnage', '450K+', 'Ton Çelik İşlendi', 'Tons of Steel Processed', 'طن من الفولاذ المعالج', 3),
('countries', '12', 'Ülkede Proje', 'Countries with Projects', 'دول بها مشاريع', 4);
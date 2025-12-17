export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  location: string;
  year: number;
  category: string;
  display_order: number;
  status?: 'completed' | 'in-progress';
};

export type CompanyStat = {
  id: number;
  value: string;
  label_tr: string;
  label_en: string;
  label_ar: string;
};

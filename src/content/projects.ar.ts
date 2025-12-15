import { Project } from '../types/project';

export const projectsAR: Project[] = [
  {
    id: '1',
    title: 'مبنى مصنع الهياكل الفولاذية',
    description: 'مشروع مبنى مصنع بهياكل فولاذية عالية المتانة وبتصميم معماري حديث. تبلغ مساحته المغلقة 5,000 متر مربع.',
    image_url: '/images/projects/fabrika.jpg',
    location: 'اسطنبول، تركيا',
    year: 2023,
    category: 'صناعي',
    display_order: 1,
  },
  {
    id: '2',
    title: 'مبنى مكاتب فولاذي متعدد الطوابق',
    description: 'مبنى مكاتب فولاذي مقاوم للزلازل مكون من 15 طابقًا يقع في وسط المدينة. تم استخدام نظام واجهة زجاجية عالي الكفاءة في استهلاك الطاقة.',
    image_url: '/images/projects/ofis.jpg',
    location: 'أنقرة، تركيا',
    year: 2022,
    category: 'تجاري',
    display_order: 2,
  },
  {
    id: '3',
    title: 'إنشاء جسر فولاذي',
    description: 'مشروع جسر فولاذي طويل المدى يسهل النقل. تم تصميمه ليتحمل أقسى الظروف الجوية.',
    image_url: '/images/projects/kopru.jpg',
    location: 'إزمير، تركيا',
    year: 2024,
    category: 'بنية تحتية',
    display_order: 3,
  },
];

import { Project } from '../types/project';

export const projectsTR: Project[] = [
  {
    id: '1',
    title: 'Çelik Konstrüksiyon Fabrika Binası',
    description: 'Modern mimariye sahip, yüksek dayanıklılıklı çelik konstrüksiyon fabrika binası projesi. 5.000 m² kapalı alana sahiptir.',
    image_url: '/images/projects/fabrika.jpg',
    location: 'İstanbul, Türkiye',
    year: 2023,
    category: 'Endüstriyel',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Çok Katlı Çelik Ofis Binası',
    description: 'Şehir merkezinde yer alan, 15 katlı, depreme dayanıklı çelik ofis binası. Enerji verimliliği yüksek cam cephe sistemi kullanılmıştır.',
    image_url: '/images/projects/ofis.jpg',
    location: 'Ankara, Türkiye',
    year: 2022,
    category: 'Ticari',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Çelik Köprü İnşaatı',
    description: 'Ulaşımı kolaylaştıran, uzun açıklıklı çelik köprü projesi. En zorlu hava koşullarına dayanacak şekilde tasarlanmıştır.',
    image_url: '/images/projects/kopru.jpg',
    location: 'İzmir, Türkiye',
    year: 2024,
    category: 'Altyapı',
    display_order: 3,
  },
];

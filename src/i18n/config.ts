import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languages = {
  tr: { nativeName: 'Türkçe', dir: 'ltr' },
  en: { nativeName: 'English', dir: 'ltr' },
  ar: { nativeName: 'العربية', dir: 'rtl' },
};

const resources = {
  tr: {
    translation: {
      nav: {
        home: 'Ana Sayfa',
        projects: 'Projeler',
        about: 'Hakkımızda',
        contact: 'İletişim',
      },
      hero: {
        title: 'Çelik İle',
        subtitle: 'Geleceği İnşa Ediyoruz',
        description: 'Türkiye\'nin en büyük çelik konstrüksiyon şirketi. 32 yıllık deneyim, 12 ülkede 287 proje.',
        scroll: 'Kaydır',
      },
      vision: {
        title: 'Mühendislik Mükemmeliyeti',
        subtitle: 'Vizyon',
        content: 'Çelik İnşaat olarak, modern mimarinin en zorlu projelerini hayata geçiriyoruz. Her yapı, mühendislik bilgimizin ve titiz işçiliğimizin bir yansımasıdır.',
        highlight: 'Dünya standartlarında kalite, zamanında teslimat ve sürdürülebilir çözümler sunuyoruz.',
      },
      projects: {
        title: 'Seçkin Projeler',
        category: 'Kategori',
      },
      why: {
        title: 'Neden Çelik İnşaat?',
        reason1: 'Teknik Üstünlük',
        reason1Desc: 'Avrupa normlarında çelik işleme ve montaj',
        reason2: 'Zamanında Teslimat',
        reason2Desc: '%98 proje tamamlama başarı oranı',
        reason3: 'Global Deneyim',
        reason3Desc: '12 ülkede başarılı proje portföyü',
        reason4: 'İnovasyon',
        reason4Desc: 'BIM ve dijital tasarım altyapısı',
      },
      international: {
        title: 'Uluslararası',
        subtitle: 'Varlık',
        description: 'Türkiye\'den dünyaya uzanan projelerimizle, çelik konstrüksiyon sektöründe global bir oyuncu olarak faaliyet gösteriyoruz.',
        regions: 'Orta Doğu, Avrupa, Afrika ve Asya\'da aktif projeler',
      },
      cta: {
        title: 'Bir Sonraki Projenizi Birlikte İnşa Edelim',
        button: 'İletişime Geçin',
      },
      contact: {
        title: 'Bize Ulaşın',
        formTitle: 'İletişim Formu',
        nameLabel: 'Adınız',
        emailLabel: 'E-posta',
        messageLabel: 'Mesajınız',
        sendButton: 'Gönder',
        address: 'Adres',
        phone: 'Telefon',
        email: 'E-posta',
        formSuccess: 'Mesajınız başarıyla gönderilmiştir!',
      },
      footer: {
        rights: 'Tüm hakları saklıdır.',
        address: 'İstanbul, Türkiye',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact',
      },
      hero: {
        title: 'Building the Future',
        subtitle: 'With Steel',
        description: 'Turkey\'s largest steel construction company. 32 years of experience, 287 projects in 12 countries.',
        scroll: 'Scroll',
      },
      vision: {
        title: 'Engineering Excellence',
        subtitle: 'Vision',
        content: 'At Çelik İnşaat, we bring the most challenging projects of modern architecture to life. Every structure is a reflection of our engineering knowledge and meticulous craftsmanship.',
        highlight: 'We deliver world-class quality, on-time delivery, and sustainable solutions.',
      },
      projects: {
        title: 'Featured Projects',
        category: 'Category',
      },
      why: {
        title: 'Why Çelik İnşaat?',
        reason1: 'Technical Excellence',
        reason1Desc: 'Steel processing and assembly to European standards',
        reason2: 'On-Time Delivery',
        reason2Desc: '98% project completion success rate',
        reason3: 'Global Experience',
        reason3Desc: 'Successful project portfolio in 12 countries',
        reason4: 'Innovation',
        reason4Desc: 'BIM and digital design infrastructure',
      },
      international: {
        title: 'International',
        subtitle: 'Presence',
        description: 'With our projects extending from Turkey to the world, we operate as a global player in the steel construction sector.',
        regions: 'Active projects in Middle East, Europe, Africa, and Asia',
      },
      cta: {
        title: 'Let\'s Build Your Next Project Together',
        button: 'Get In Touch',
      },
      contact: {
        title: 'Contact Us',
        formTitle: 'Contact Form',
        nameLabel: 'Your Name',
        emailLabel: 'Email',
        messageLabel: 'Message',
        sendButton: 'Send',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        formSuccess: 'Your message has been sent successfully!',
      },
      footer: {
        rights: 'All rights reserved.',
        address: 'Istanbul, Turkey',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        projects: 'المشاريع',
        about: 'من نحن',
        contact: 'اتصل بنا',
      },
      hero: {
        title: 'بناء المستقبل',
        subtitle: 'بالفولاذ',
        description: 'أكبر شركة للإنشاءات الفولاذية في تركيا. 32 عامًا من الخبرة، 287 مشروعًا في 12 دولة.',
        scroll: 'تمرير',
      },
      vision: {
        title: 'التميز الهندسي',
        subtitle: 'الرؤية',
        content: 'في شيليك إنشات، نحقق أكثر المشاريع تحديًا في العمارة الحديثة. كل هيكل هو انعكاس لمعرفتنا الهندسية وحرفيتنا الدقيقة.',
        highlight: 'نقدم جودة عالمية، تسليم في الوقت المحدد، وحلول مستدامة.',
      },
      projects: {
        title: 'مشاريع مميزة',
        category: 'الفئة',
      },
      why: {
        title: 'لماذا شيليك إنشات؟',
        reason1: 'التميز التقني',
        reason1Desc: 'معالجة وتجميع الفولاذ وفقًا للمعايير الأوروبية',
        reason2: 'التسليم في الوقت المحدد',
        reason2Desc: 'معدل نجاح إتمام المشروع 98٪',
        reason3: 'خبرة عالمية',
        reason3Desc: 'محفظة مشاريع ناجحة في 12 دولة',
        reason4: 'الابتكار',
        reason4Desc: 'بنية تحتية لنمذجة معلومات البناء والتصميم الرقمي',
      },
      international: {
        title: 'حضور',
        subtitle: 'دولي',
        description: 'مع مشاريعنا الممتدة من تركيا إلى العالم، نعمل كلاعب عالمي في قطاع الإنشاءات الفولاذية.',
        regions: 'مشاريع نشطة في الشرق الأوسط وأوروبا وأفريقيا وآسيا',
      },
      cta: {
        title: 'لنبني مشروعك القادم معًا',
        button: 'تواصل معنا',
      },
      contact: {
        title: 'اتصل بنا',
        formTitle: 'نموذج الاتصال',
        nameLabel: 'اسمك',
        emailLabel: 'البريد الإلكتروني',
        messageLabel: 'الرسالة',
        sendButton: 'إرسال',
        address: 'العنوان',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        formSuccess: 'تم إرسال رسالتك بنجاح!',
      },
      footer: {
        rights: 'جميع الحقوق محفوظة.',
        address: 'إسطنبول، تركيا',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

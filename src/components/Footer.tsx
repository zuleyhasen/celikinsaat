import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 bg-steel-900 border-t border-steel-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tight text-white">
            ÇELİK İNŞAAT
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-steel-400 text-sm">
            <span>{t('footer.address')}</span>
            <span className="hidden md:inline">•</span>
            <span>© {currentYear} Çelik İnşaat. {t('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

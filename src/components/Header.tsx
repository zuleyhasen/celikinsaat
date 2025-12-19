import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { languages } from '../i18n/config';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const dir = languages[lng as keyof typeof languages].dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
    setIsLangOpen(false);
  };

  const currentLang = languages[i18n.language as keyof typeof languages];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-bold tracking-tight text-white"
          >
            ÖZÇELİK İNŞAAT
          </motion.div>

          <div className="hidden md:flex items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-8"
            >
              {['home', 'projects', 'about', 'contact'].map((item, idx) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-sm font-medium text-white hover:text-accent-gold transition-colors duration-300"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors duration-300"
              >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{i18n.language}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 bg-steel-800 border border-steel-700 rounded-lg overflow-hidden shadow-2xl"
                  >
                    {Object.keys(languages).map((lng) => (
                      <button
                        key={lng}
                        onClick={() => changeLanguage(lng)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-steel-700 transition-colors ${
                          i18n.language === lng ? 'bg-steel-700 text-accent-gold' : 'text-white'
                        }`}
                      >
                        {languages[lng as keyof typeof languages].nativeName}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-6 pb-6 border-t border-steel-700 pt-6"
            >
              <div className="flex flex-col gap-4">
                {['home', 'projects', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-accent-gold transition-colors text-lg"
                  >
                    {t(`nav.${item}`)}
                  </a>
                ))}
                <div className="flex gap-4 mt-4 border-t border-steel-700 pt-4">
                  {Object.keys(languages).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => {
                        changeLanguage(lng);
                        setIsMenuOpen(false);
                      }}
                      className={`text-sm uppercase ${
                        i18n.language === lng ? 'text-accent-gold' : 'text-white'
                      }`}
                    >
                      {lng}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

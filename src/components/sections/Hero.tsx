import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      gsap.fromTo(
        descRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.9,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg)',
          filter: 'brightness(0.3)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-steel-900/50 via-steel-900/30 to-steel-900" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="text-display-xl md:text-[8rem] font-bold text-white mb-4 opacity-0"
            >
              {t('hero.title')}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2
              ref={subtitleRef}
              className="text-display-md md:text-display-lg font-light text-steel-200 mb-8 opacity-0"
            >
              {t('hero.subtitle')}
            </h2>
          </div>

          <p
            ref={descRef}
            className="text-lg md:text-xl text-steel-300 max-w-3xl mx-auto leading-relaxed opacity-0"
          >
            {t('hero.description')}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-sm font-medium tracking-wider uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

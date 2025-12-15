import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function International() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('h3, h2') || [],
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        contentRef.current?.querySelectorAll('p') || [],
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-steel-800 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={titleRef} className="mb-12">
            <h3 className="text-sm font-medium tracking-widest text-accent-gold uppercase mb-4">
              {t('international.title')}
            </h3>
            <h2 className="text-display-lg font-bold text-white">
              {t('international.subtitle')}
            </h2>
          </div>

          <div ref={contentRef} className="space-y-8">
            <p className="text-2xl text-steel-200 leading-relaxed">
              {t('international.description')}
            </p>

            <p className="text-lg text-steel-300 leading-relaxed">
              {t('international.regions')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {['Turkey', 'UAE', 'Qatar', 'Saudi Arabia'].map((country, index) => (
                <div
                  key={country}
                  className="text-center p-6 bg-steel-900/50 rounded-lg border border-steel-700 hover:border-accent-gold transition-all duration-500"
                >
                  <div className="text-4xl font-bold text-accent-gold mb-2">
                    {(index + 1) * 3}+
                  </div>
                  <div className="text-sm text-steel-300">{country}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

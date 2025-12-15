import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        contentRef.current?.querySelectorAll('h3, h2, p') || [],
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
    <section ref={sectionRef} className="relative py-32 bg-steel-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="relative h-[600px] rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg"
              alt="Construction"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 to-transparent" />
          </div>

          <div ref={contentRef} className="space-y-8">
            <div>
              <h3 className="text-sm font-medium tracking-widest text-accent-gold uppercase mb-4">
                {t('vision.subtitle')}
              </h3>
              <h2 className="text-display-md font-bold text-white mb-6">
                {t('vision.title')}
              </h2>
            </div>

            <p className="text-lg text-steel-300 leading-relaxed">
              {t('vision.content')}
            </p>

            <p className="text-xl text-white font-medium leading-relaxed border-l-4 border-accent-gold pl-6">
              {t('vision.highlight')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

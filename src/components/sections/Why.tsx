import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase, type CompanyStat } from '../../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function Why() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('company_stats')
        .select('*')
        .order('display_order', { ascending: true });

      if (data && !error) {
        setStats(data);
      }
    }

    fetchStats();
  }, []);

  useEffect(() => {
    if (stats.length === 0) return;

    const ctx = gsap.context(() => {
      const statCards = statsRef.current?.querySelectorAll('.stat-card') || [];
      gsap.fromTo(
        statCards,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  const getLocalizedLabel = (stat: CompanyStat) => {
    const lang = i18n.language as 'tr' | 'en' | 'ar';
    return stat[`label_${lang}`];
  };

  const reasons = [
    { key: 'reason1', icon: '⚙️' },
    { key: 'reason2', icon: '⏱️' },
    { key: 'reason3', icon: '🌍' },
    { key: 'reason4', icon: '💡' },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-32 bg-steel-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-display-lg font-bold text-white mb-6">{t('why.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {reasons.map((reason, index) => (
            <div
              key={reason.key}
              className="reason-card group p-8 bg-steel-800/50 rounded-lg border border-steel-700 hover:border-accent-gold transition-all duration-500"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t(`why.${reason.key}`)}
              </h3>
              <p className="text-steel-300 leading-relaxed">
                {t(`why.${reason.key}Desc`)}
              </p>
            </div>
          ))}
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent-gold mb-3">
                {stat.value}
              </div>
              <div className="text-steel-300 text-sm md:text-base uppercase tracking-wider">
                {getLocalizedLabel(stat)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

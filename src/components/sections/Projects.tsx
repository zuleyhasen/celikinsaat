import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsEN } from '../../content/projects.en.ts';
import { projectsAR } from '../../content/projects.ar.ts';
import { projectsTR } from '../../content/projects.tr.ts';
import { Project } from '../../types/project.ts';
import { CheckCircle, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let data: Project[] = [];
    switch (i18n.language) {
      case 'en':
        data = projectsEN;
        break;
      case 'ar':
        data = projectsAR;
        break;
      case 'tr':
      default:
        data = projectsTR;
        break;
    }
    setProjects(data.sort((a, b) => a.display_order - b.display_order));
  }, [i18n.language]);

  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      const projectCards = projectsContainerRef.current?.querySelectorAll('.project-card') || [];
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const getLocalizedField = (project: Project, field: 'title' | 'description') => {
    return project[field];
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 bg-steel-800">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-display-lg font-bold text-white mb-20"
        >
          {t('projects.title')}
        </h2>

        <div ref={projectsContainerRef} className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              <div className={`relative h-[500px] rounded-lg overflow-hidden ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <img
                  src={project.image_url}
                  alt={getLocalizedField(project, 'title')}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900/90 via-steel-900/50 to-transparent" />

                {project.status && (
                  <div className="absolute top-8 right-8">
                    {project.status === 'completed' ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/90 rounded-full backdrop-blur-sm">
                        <CheckCircle size={18} className="text-white" />
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/90 rounded-full backdrop-blur-sm animate-pulse">
                        <Zap size={18} className="text-white" />
                        <span className="text-white text-xs font-bold uppercase tracking-wider">In Progress</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4 text-sm text-steel-300 mb-2">
                    <span className="px-3 py-1 bg-steel-800/80 rounded-full uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <h3 className="text-display-sm font-bold text-white">
                  {getLocalizedField(project, 'title')}
                </h3>
                <p className="text-lg text-steel-300 leading-relaxed">
                  {getLocalizedField(project, 'description')}
                </p>
                <div className="flex items-center gap-4 text-steel-400">
                  <div className="w-12 h-px bg-accent-gold" />
                  <span className="text-sm font-medium">{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

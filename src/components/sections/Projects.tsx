import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsEN } from '../../content/projects.en.ts';
import { projectsAR } from '../../content/projects.ar.ts';
import { projectsTR } from '../../content/projects.tr.ts';
import { Project } from '../../types/project.ts';
import { CheckCircle, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || projects.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, projects.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const getLocalizedField = (project: Project, field: 'title' | 'description') => {
    return project[field];
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 bg-steel-800 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-display-lg font-bold text-white mb-12 text-center"
        >
          {t('projects.title')}
        </h2>

        {/* Main Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div ref={carouselRef} className="relative h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Image with overlay */}
            <div className="absolute inset-0">
              <img
                key={currentProject.id}
                src={currentProject.image_url}
                alt={getLocalizedField(currentProject, 'title')}
                className="w-full h-full object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-900/95 via-steel-900/60 to-steel-900/30" />
            </div>

            {/* Status Badge */}
            {currentProject.status && (
              <div className="absolute top-8 right-8 z-10">
                {currentProject.status === 'completed' ? (
                  <div className="flex items-center gap-2 px-5 py-3 bg-emerald-500/95 rounded-full backdrop-blur-md shadow-lg">
                    <CheckCircle size={20} className="text-white" />
                    <span className="text-white text-sm font-bold uppercase tracking-wider">
                      {t('projects.completed')}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 bg-amber-500/95 rounded-full backdrop-blur-md shadow-lg animate-pulse">
                    <Zap size={20} className="text-white" />
                    <span className="text-white text-sm font-bold uppercase tracking-wider">
                      {t('projects.inProgress')}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 text-sm text-steel-300 mb-4">
                  <span className="px-4 py-2 bg-accent-gold/90 rounded-full uppercase tracking-wide font-bold text-steel-900">
                    {currentProject.category}
                  </span>
                  <span className="text-lg font-medium">{currentProject.year}</span>
                  <span className="text-lg">•</span>
                  <span className="text-lg font-medium">{currentProject.location}</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
                  {getLocalizedField(currentProject, 'title')}
                </h3>

                <p className="text-lg md:text-xl text-steel-200 leading-relaxed animate-slide-up">
                  {getLocalizedField(currentProject, 'description')}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft size={28} className="text-white" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight size={28} className="text-white" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-accent-gold'
                    : 'w-3 h-3 bg-steel-600 hover:bg-steel-500'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleDotClick(index)}
                className={`relative h-24 md:h-32 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-4 ring-accent-gold scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={project.image_url}
                  alt={getLocalizedField(project, 'title')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-steel-900/40" />
                {index === currentIndex && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-gold rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-steel-700/50 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-accent-gold mb-2">{projects.length}</div>
            <div className="text-steel-300 text-sm uppercase tracking-wide">
              {t('projects.totalProjects')}
            </div>
          </div>
          <div className="text-center p-6 bg-steel-700/50 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-steel-300 text-sm uppercase tracking-wide">
              {t('projects.completed')}
            </div>
          </div>
          <div className="text-center p-6 bg-steel-700/50 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-amber-400 mb-2">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-steel-300 text-sm uppercase tracking-wide">
              {t('projects.inProgress')}
            </div>
          </div>
          <div className="text-center p-6 bg-steel-700/50 rounded-xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {new Date().getFullYear() - Math.min(...projects.map(p => p.year))}+
            </div>
            <div className="text-steel-300 text-sm uppercase tracking-wide">
              {t('projects.yearsExperience')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

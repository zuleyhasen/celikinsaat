import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { projectsEN } from '../../content/projects.en.ts';
import { projectsAR } from '../../content/projects.ar.ts';
import { projectsTR } from '../../content/projects.tr.ts';
import { Project } from '../../types/project.ts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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
    if (projects.length === 0 || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      projects.forEach((_, index) => {
        const buildingImg = document.querySelector(`#project-${index} .building-image`);
        const contentArea = document.querySelector(`#project-${index} .content-area`);

        if (buildingImg && contentArea) {
          gsap.fromTo(
            buildingImg,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power2.out',
              delay: index === currentIndex ? 0.2 : 0,
            }
          );

          gsap.fromTo(
            contentArea,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power2.out',
              delay: index === currentIndex ? 0.2 : 0,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects, currentIndex]);

  const getPositionX = (e: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX(getPositionX(e));
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'none';
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    setCurrentTranslate(prevTranslate + diff);
    
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${prevTranslate + diff}px)`;
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    
    const movedBy = currentTranslate - prevTranslate;
    const threshold = window.innerWidth * 0.2;

    if (movedBy < -threshold && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setPositionByIndex();
  };

  const setPositionByIndex = () => {
    const newTranslate = currentIndex * -window.innerWidth;
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);
    
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      sliderRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  useEffect(() => {
    setPositionByIndex();
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getLocalizedField = (project: Project, field: 'title' | 'description') => {
    return project[field];
  };

  if (projects.length === 0) return null;

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative bg-steel-900 overflow-hidden"
    >
      {/* Section Title */}
      <div className="py-20 bg-steel-800">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center">
            {t('projects.title')}
          </h2>
        </div>
      </div>

      {/* Projects Container */}
      <div className="relative h-screen">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-steel-800/90 hover:bg-accent-gold/90 text-white hover:text-steel-900 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl"
            aria-label="Previous project"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Right Arrow */}
        {currentIndex < projects.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-steel-800/90 hover:bg-accent-gold/90 text-white hover:text-steel-900 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl"
            aria-label="Next project"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Slider */}
        <div
          ref={sliderRef}
          className={`flex h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{ transform: `translateX(${currentTranslate}px)` }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${index}`}
              className="min-w-full h-full flex items-center"
              style={{ width: '100vw' }}
            >
              <div className="w-full h-full flex items-center">
                {/* Left Side - Building Image */}
                <div className="building-image w-1/2 h-full flex items-center justify-center p-12 bg-steel-800/50">
                  <div className="relative w-full h-full max-w-2xl max-h-[80vh]">
                    <img
                      src={project.image_url}
                      alt={getLocalizedField(project, 'title')}
                      className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/5 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="content-area w-1/2 h-full flex items-center justify-center p-12">
                  <div className="max-w-xl space-y-6">
                    <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                      {getLocalizedField(project, 'title')}
                    </h3>

                    <div className="flex items-center gap-3 text-accent-gold">
                      <div className="w-1 h-12 bg-accent-gold" />
                      <p className="text-xl font-medium">
                        {project.location}
                      </p>
                    </div>

                    <p className="text-lg text-steel-300 leading-relaxed">
                      {getLocalizedField(project, 'description')}
                    </p>

                    <div className="pt-8 flex items-center gap-4">
                      <div className="text-steel-600 text-6xl font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 h-px bg-steel-700" />
                      <div className="text-steel-600 text-lg">
                        {String(projects.length).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-accent-gold'
                  : 'w-3 h-3 bg-steel-600 hover:bg-steel-500'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
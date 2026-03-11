import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "DSA PROJECT",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1964&auto=format&fit=crop",
    category: "Full Stack",
    year: "2024",
    description: "Interactive platform for DSA concepts",
  },
  {
    title: "KOLLI HILLS MARKET",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    category: "MERN Stack",
    year: "2024",
    description: "Native products marketplace",
  },
  {
    title: "ELECTRIC GO",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    category: "Flutter / Dart",
    year: "2023",
    description: "E-vehicle rental platform",
  },
  {
    title: "JAVA CERTIFICATION",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    category: "Certification",
    year: "2024",
    description: "Infosys Springboard Java Developer",
  },
  {
    title: "AI RESEARCH",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    category: "Infosys Springboard",
    year: "2024",
    description: "Artificial Intelligence study",
  },
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 500,
};

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const getProjectData = (index: number) => {
  const i =
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
    PROJECT_DATA.length;
  return PROJECT_DATA[i];
};

const getProjectNumber = (index: number) => {
  return (
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
      PROJECT_DATA.length +
    1
  )
    .toString()
    .padStart(2, "0");
};

interface ArgentLoopSliderProps {
  targetRef?: React.RefObject<HTMLDivElement>;
}

export function ArgentLoopSlider({ targetRef }: ArgentLoopSliderProps) {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const scrollTarget = targetRef || internalRef;
  
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0001
  });

  const [visibleRange, setVisibleRange] = React.useState({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    projectHeight: 0,
    minimapHeight: 250,
  });

  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = React.useRef<number>(undefined);
  const renderedRange = React.useRef({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });

  const updateParallax = (
    img: HTMLImageElement | null,
    scroll: number,
    index: number,
    height: number
  ) => {
    if (!img) return;
    if (!img.dataset.parallaxCurrent) {
      img.dataset.parallaxCurrent = "0";
    }
    
    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.15;
    current = lerp(current, target, 0.1);
    
    if (Math.abs(current - target) > 0.01) {
        img.style.transform = `translateY(${current}px) scale(1.2)`;
        img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updatePositions = () => {
    const s = state.current;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
      
      // Update content opacity based on position
      const content = el.querySelector(".project-content") as HTMLElement;
      if (content) {
        const distance = Math.abs(y);
        const opacity = Math.max(0, 1 - distance / (s.projectHeight * 0.5));
        content.style.opacity = opacity.toString();
        content.style.transform = `translateY(${y * 0.2}px)`;
      }
    });

    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      if (img) {
          updateParallax(img, minimapY, index, s.minimapHeight);
      }
    });

    infoRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
    });
  };

  const animate = () => {
    const s = state.current;
    const totalProjects = PROJECT_DATA.length;
    // We want to scroll through all projects.
    // Multiply by (totalProjects - 1) to end exactly at the last project at 100% scroll
    s.targetY = -smoothProgress.get() * s.projectHeight * (totalProjects - 1);
    
    s.currentY += (s.targetY - s.currentY) * 0.1; // Smooth lerp
    updatePositions();
  };
  
  const animationLoop = () => {
     animate();
     
     const s = state.current;
     const currentIndex = Math.round(-s.targetY / s.projectHeight);
     const min = currentIndex - CONFIG.BUFFER_SIZE;
     const max = currentIndex + CONFIG.BUFFER_SIZE;

     if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
         renderedRange.current = { min, max };
         setVisibleRange({ min, max });
     }

     requestRef.current = requestAnimationFrame(animationLoop);
  };

  React.useEffect(() => {
    state.current.projectHeight = window.innerHeight;
    
    const onResize = () => {
        state.current.projectHeight = window.innerHeight;
        if (internalRef.current) {
            internalRef.current.style.height = `${window.innerHeight}px`;
        }
    }

    window.addEventListener("resize", onResize);
    onResize();
    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const indices = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) {
    indices.push(i);
  }

  return (
    <div ref={internalRef} className="parallax-container w-full h-screen relative overflow-hidden bg-brand-cream">
      <ul className="project-list absolute inset-0 list-none p-0 m-0">
        {indices.map((i) => {
          const data = getProjectData(i);
          const num = getProjectNumber(i);
          return (
            <div
              key={i}
              className="project absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center"
              ref={(el) => {
                if (el) projectsRef.current.set(i, el);
                else projectsRef.current.delete(i);
              }}
            >
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Main Project Content */}
              <div className="project-content absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-6 text-center pointer-events-none">
                <motion.span className="text-brand-red font-display text-2xl mb-4 opacity-80">
                  {num}
                </motion.span>
                <h3 className="text-5xl md:text-8xl font-display mb-6 tracking-tighter">
                  {data.title}
                </h3>
                <div className="flex gap-4 items-center mb-8">
                  <span className="px-4 py-1 border border-white/30 rounded-full text-xs uppercase tracking-widest">
                    {data.category}
                  </span>
                  <span className="text-xs opacity-60 uppercase tracking-widest">
                    {data.year}
                  </span>
                </div>
                <p className="max-w-xl text-lg md:text-xl font-medium leading-relaxed opacity-80">
                  {data.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          );
        })}
      </ul>

      {/* Minimap - Hidden on small screens or kept as a subtle indicator */}
      <div className="minimap absolute right-12 top-1/2 -translate-y-1/2 z-20 w-80 pointer-events-none hidden lg:block opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="minimap-wrapper flex items-start gap-6">
          <div className="minimap-img-preview w-24 h-[250px] overflow-hidden relative rounded-lg border border-brand-red/20">
            {indices.map((i) => {
              const data = getProjectData(i);
              return (
                <div
                  key={i}
                  className="minimap-img-item absolute top-0 left-0 w-full h-full overflow-hidden"
                  ref={(el) => {
                    if (el) minimapRef.current.set(i, el);
                    else minimapRef.current.delete(i);
                  }}
                >
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              );
            })}
          </div>
          <div className="minimap-info-list h-[250px] overflow-hidden relative flex-1">
            {indices.map((i) => {
              const data = getProjectData(i);
              const num = getProjectNumber(i);
              return (
                <div
                  key={i}
                  className="minimap-item-info absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-4 text-brand-red"
                  ref={(el) => {
                    if (el) infoRef.current.set(i, el);
                    else infoRef.current.delete(i);
                  }}
                >
                  <div className="minimap-item-info-row flex justify-between items-end border-b border-brand-red/20 pb-2">
                    <p className="font-display text-4xl">{num}</p>
                    <p className="font-display text-2xl text-right">{data.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

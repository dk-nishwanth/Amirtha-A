/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { Github, Linkedin, Code, Mail, Phone, Loader2, Star, ArrowUpRight, Send, User, MessageSquare, ExternalLink, Award, BookOpen, Zap } from "lucide-react";
import { Logo, DogIllustration, SleepingDog, TennisBall } from "./components/Assets";
import React, { useState, useEffect } from "react";
import heroImage from "./public/ChatGPT Image Mar 11, 2026, 10_20_32 AM.png";
import { ArgentLoopSlider } from "./components/ui/argent-loop-infinite-slider";
import { Timeline } from "./components/ui/timeline";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState(0);
  const words = ["DEVELOPER", "DESIGNER", "STUDENT", "CREATIVE", "AMIRTHA"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1;
      });
    }, 120);

    const wordInterval = setInterval(() => {
      setActiveWord(prev => (prev + 1) % words.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[100] bg-brand-red flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Massive Background Progress */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span 
          style={{ opacity: 0.05 }}
          className="text-[40vw] font-display text-white leading-none select-none"
        >
          {Math.min(progress, 100)}
        </motion.span>
      </div>

      {/* Marquee Top */}
      <div className="absolute top-0 left-0 w-full py-4 border-b border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase px-8">
              AMIRTHA A • FULL STACK DEVELOPER • CSE STUDENT • 
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xl px-6">
        {/* The "Running" Dachshund */}
        <div className="w-full h-24 relative mb-12">
          <motion.div 
            style={{ left: `${progress}%` }}
            className="absolute top-0 -translate-x-1/2"
          >
            <div className="relative">
              <div className="w-24 h-10 bg-brand-yellow rounded-full relative">
                {/* Tail */}
                <div className="absolute -left-2 top-2 w-4 h-1 bg-brand-yellow rounded-full -rotate-45" />
                {/* Head */}
                <div className="absolute -right-4 -top-2 w-8 h-8 bg-brand-yellow rounded-full">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-red rounded-full" />
                  <div className="absolute top-4 -right-1 w-4 h-6 bg-brand-yellow rounded-full rotate-12" />
                </div>
              </div>
              {/* Legs */}
              <div className="flex justify-around px-4 mt-[-4px]">
                <motion.div 
                  animate={{ rotate: [0, 30, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="w-1.5 h-4 bg-brand-yellow rounded-full origin-top" 
                />
                <motion.div 
                  animate={{ rotate: [0, -30, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="w-1.5 h-4 bg-brand-yellow rounded-full origin-top" 
                />
                <motion.div 
                  animate={{ rotate: [0, 30, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                  className="w-1.5 h-4 bg-brand-yellow rounded-full origin-top" 
                />
                <motion.div 
                  animate={{ rotate: [0, -30, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                  className="w-1.5 h-4 bg-brand-yellow rounded-full origin-top" 
                />
              </div>
            </div>
          </motion.div>
          
          {/* Progress Line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.span 
              key={activeWord}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-4xl md:text-6xl font-display text-white tracking-tighter"
            >
              {words[activeWord]}
            </motion.span>
          </AnimatePresence>
          
          <div className="flex items-center gap-8 w-full">
            <span className="text-[10px] font-bold text-white/40 tabular-nums">
              {progress.toString().padStart(3, '0')}%
            </span>
            <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-brand-yellow"
              />
            </div>
            <span className="text-[10px] font-bold text-white/40">
              2026
            </span>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 text-white/60 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
      >
        SKIP
      </motion.button>

      {/* Marquee Bottom */}
      <div className="absolute bottom-0 left-0 w-full py-4 border-t border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase px-8">
              K.S. RANGASAMY COLLEGE OF TECHNOLOGY • TAMIL NADU • INDIA • 
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StickyNav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none bg-brand-cream/80 backdrop-blur-md border-b border-brand-red/10"
    >
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-pacifico text-brand-red pointer-events-auto"
      >
        Amirtha A
      </motion.div>

      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-xs font-bold tracking-widest uppercase text-brand-red/60 hover:text-brand-red transition-colors"
          >
            {section.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

const Nav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-pacifico text-brand-red pointer-events-auto"
      >
        Amirtha A
      </motion.div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="min-h-screen pt-24 px-6 flex flex-col relative overflow-hidden bg-brand-cream">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply flex items-center justify-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Amirtha Avatar Background" 
          className="w-full h-full object-cover object-top max-w-none" 
        />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#6B3A2A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-[15%] left-[10%] text-brand-red opacity-60"
        >
          <Star size={48} fill="currentColor" />
        </motion.div>
        
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[20%] right-[15%] text-brand-red opacity-40"
        >
          <Star size={64} fill="currentColor" />
        </motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-32 h-32 border border-brand-red/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[15%] left-[5%] w-48 h-48 border border-brand-red/10 rounded-full"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="flex flex-col items-start md:-ml-12">
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-brand-red text-clamp-huge font-display"
          >
            AMIRTHA<br />A
          </motion.h1>
          <motion.p 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-[10px] font-bold tracking-widest uppercase text-brand-red/60 mt-4 max-w-[300px] ml-12"
          >
               MOTIVATED AND DETAIL-ORIENTED CSE STUDENT!
          </motion.p>
        </div>
        
        <motion.div 
          style={{ y: y2 }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-2xl aspect-square relative"
        >
          <div className="absolute inset-0 bg-brand-pink-light/20 rounded-full blur-3xl animate-pulse"></div>
          {/* Previous image location was here, moved to background */}
        </motion.div>

        <motion.h1 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-brand-red text-clamp-huge md:-mr-12 text-right font-display"
        >
          FULL STACK<br />DEV!
        </motion.h1>
      </div>

      <div className="pb-12 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full border border-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com" target="_blank" className="w-10 h-10 rounded-full border border-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
            <Github size={18} />
          </a>
          <a href="https://leetcode.com" target="_blank" className="w-10 h-10 rounded-full border border-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
            <Code size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 px-6 bg-brand-pink-light relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue rounded-full blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.p 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl md:text-5xl font-display leading-tight text-brand-red"
      >
        MOTIVATED AND DETAIL-ORIENTED COMPUTER SCIENCE AND ENGINEERING STUDENT WITH A STRONG INTEREST IN FULL-STACK DEVELOPMENT. SKILLED IN CREATING RESPONSIVE UIS AND BUILDING SCALABLE BACKEND SYSTEMS.
      </motion.p>

    </div>
  </section>
);

const Skills = () => {
  const timelineData = [
    {
      title: "FRONTEND",
      content: (
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red/70 leading-relaxed">
            Crafting immersive user experiences with modern frameworks and animation libraries.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-brand-pink-light p-6 rounded-3xl border-2 border-brand-red">
              <h4 className="text-xl font-display text-brand-red mb-4">CORE</h4>
              <ul className="text-[10px] font-bold space-y-2 opacity-70">
                <li>• REACT / NEXT.JS</li>
                <li>• TYPESCRIPT</li>
                <li>• TAILWIND CSS</li>
              </ul>
            </div>
            <div className="bg-brand-blue p-6 rounded-3xl border-2 border-brand-red">
              <h4 className="text-xl font-display text-brand-red mb-4">MOTION</h4>
              <ul className="text-[10px] font-bold space-y-2 opacity-70">
                <li>• FRAMER MOTION</li>
                <li>• GSAP</li>
                <li>• THREE.JS</li>
              </ul>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border-2 border-brand-red">
            <img 
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-pink-light/30 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      )
    },
    {
      title: "BACKEND",
      content: (
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red/70 leading-relaxed">
            Building robust server-side architectures and managing complex data flows.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-brand-pink-light p-6 rounded-3xl border-2 border-brand-red">
              <h4 className="text-xl font-display text-brand-red mb-4">STACK</h4>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "Java", "Python", "PostgreSQL", "MongoDB", "Redis"].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/50 rounded-full text-[10px] font-bold border border-brand-red/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border-2 border-brand-red">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-pink-light/30 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      )
    },
    {
      title: "MOBILE",
      content: (
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red/70 leading-relaxed">
            Developing cross-platform applications with native-like performance.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 bg-brand-pink-dark p-6 rounded-3xl border-2 border-brand-red">
              <h4 className="text-xl font-display text-brand-red mb-2">FLUTTER</h4>
              <p className="text-[10px] font-bold opacity-60 uppercase">Dart / State Management</p>
            </div>
            <div className="flex-1 bg-brand-cream p-6 rounded-3xl border-2 border-brand-red">
              <h4 className="text-xl font-display text-brand-red mb-2">REACT NATIVE</h4>
              <p className="text-[10px] font-bold opacity-60 uppercase">Expo / Native Modules</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="skills" className="bg-brand-cream relative">
      <Timeline data={timelineData} />
    </section>
  );
};

const Education = () => {
  const educationData = [
    {
      degree: "B.E. COMPUTER SCIENCE AND ENGINEERING",
      institution: "K.S. RANGASAMY COLLEGE OF TECHNOLOGY",
      period: "2022 - 2026",
      description: "CGPA: 9.12"
    },
    {
      degree: "HSC - STATE BOARD",
      institution: "AVP TRUST MATRIC HR. SEC. SCHOOL",
      period: "2021 - 2022",
      description: "Percentage: 91.1%"
    }
  ];

  return (
    <section id="education" className="py-32 px-6 bg-brand-pink-dark relative overflow-hidden">
      <div className="flex items-start justify-between mb-24">
        <h2 className="text-clamp-huge text-brand-red">EDUCATION</h2>
        <span className="text-clamp-huge text-brand-red opacity-20">04</span>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col md:flex-row gap-8 items-start border-b border-brand-red/20 pb-12"
          >
            <div className="text-brand-red font-display text-4xl md:text-6xl shrink-0">
              {edu.period}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-5xl text-brand-red mb-2">{edu.degree}</h3>
              <p className="text-lg font-bold opacity-70 mb-4">{edu.institution}</p>
              <p className="text-sm leading-relaxed opacity-60">{edu.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <section id="projects" className="relative" ref={sectionRef}>
      <div className="py-24 px-6 bg-brand-cream">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start justify-between mb-12"
        >
          <h2 className="text-clamp-huge text-brand-red">PROJECTS</h2>
          <span className="text-clamp-huge text-brand-red opacity-20">05</span>
        </motion.div>
      </div>
      {/* Increased height to allow for more scroll progress */}
      <div className="h-[500vh] relative">
        <div className="h-screen sticky top-0 overflow-hidden">
          <ArgentLoopSlider targetRef={sectionRef} />
        </div>
      </div>

    </section>
  );
};

const CareSection = () => (
  <section className="py-32 px-6 bg-brand-pink-light relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-bold tracking-widest uppercase mb-4"
      >
        SOLVING PRACTICAL PROBLEMS THROUGH CONTINUOUS LEARNING!
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-clamp-huge text-brand-red"
      >
        BUILDING SCALABLE<br />SYSTEMS!
      </motion.h2>
    </div>
    
    <div className="absolute inset-0 pointer-events-none">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute top-10 left-10 w-48 h-48 border-2 border-white/30 rounded-full"
      ></motion.div>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-20 right-10 w-64 h-64 border-2 border-white/30 rounded-full"
      ></motion.div>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white/30 rounded-full -translate-x-1/2"
      ></motion.div>
    </div>
  </section>
);

const ExtraCurricular = () => {
  const activities = ["NSS", "SERVICE MOTO", "CULTURAL", "BADUGA", "TAMIL"];
  return (
    <section className="py-32 px-6 bg-brand-cream relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">EXTRA-CURRICULAR</span>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between border-b border-brand-red/20 pb-8 mb-16 overflow-x-auto"
        >
          {activities.map((name, idx) => (
            <div key={name} className="flex flex-col items-center gap-2 px-4">
              <span className="text-[10px] font-bold opacity-50">0{idx + 1}</span>
              <span className={`text-xs font-bold tracking-widest ${idx === 2 ? 'text-brand-red' : 'opacity-50'}`}>{name}</span>
              <div className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-brand-red' : 'border border-brand-red'}`}></div>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center gap-8">
          <button className="hidden md:block text-brand-red text-4xl">←</button>
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-bold uppercase leading-tight text-center flex-1"
          >
            "MEMBER OF NSS AND SERVICE MOTO (SM). CULTURAL PERFORMER IN INTER-COLLEGE FESTS AND COLLEGE DAY. FLUENT IN BADUGA, TAMIL, AND ENGLISH."
          </motion.p>
          <button className="hidden md:block text-brand-red text-4xl">→</button>
        </div>
      </div>
    </section>
  );
};

const Languages = () => {
  const langs = [
    { title: "BADUGA", level: "NATIVE", desc: "Mother tongue, fluent speaking and understanding.", id: "01" },
    { title: "TAMIL", level: "FLUENT", desc: "Professional working proficiency.", id: "02" },
    { title: "ENGLISH", level: "FLUENT", desc: "Professional working proficiency.", id: "03" },
  ];

  return (
    <section id="languages" className="py-32 px-6 bg-brand-cream border-t border-brand-red/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
        >
          <div className="max-w-md">
            <span className="text-[10px] font-bold tracking-[0.4em] text-brand-red uppercase mb-4 block">Linguistic Versatility</span>
            <h2 className="text-5xl md:text-7xl font-display text-brand-red leading-none">
              SPEAKING<br />THE WORLD
            </h2>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red/60 max-w-[200px] text-right">
            Bridging cultures through native and professional fluency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-brand-red/10 border-y border-brand-red/10">
          {langs.map((lang, i) => (
            <motion.div 
              key={lang.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(232, 32, 10, 0.03)" }}
              className="group py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-colors px-4"
            >
              <div className="flex items-center gap-12">
                <span className="text-6xl md:text-8xl font-display text-brand-red/10 group-hover:text-brand-red/20 transition-colors">
                  {lang.id}
                </span>
                <div>
                  <h3 className="text-3xl md:text-5xl font-display text-brand-red">{lang.title}</h3>
                  <span className="text-[10px] font-bold tracking-widest text-brand-red/60 uppercase">{lang.level}</span>
                </div>
              </div>
              <p className="text-sm md:text-base font-medium text-brand-red/80 max-w-md md:text-right">
                {lang.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/mnjgdanr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-brand-red text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold tracking-[0.5em] uppercase mb-8 block"
            >
              Available for Opportunities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-display leading-none mb-12"
            >
              LET'S<br />CREATE<br />TOGETHER
            </motion.h2>

            <div className="flex flex-col gap-8 mt-12">
              <div className="space-y-2">
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Direct Contact</p>
                <a href="mailto:aamirtha1804@gmail.com" className="group flex items-center gap-4 text-xl md:text-2xl font-display hover:translate-x-2 transition-transform">
                  <Mail size={20} className="opacity-60" />
                  AAMIRTHA1804@GMAIL.COM
                </a>
                <a href="tel:+916374251433" className="group flex items-center gap-4 text-xl md:text-2xl font-display hover:translate-x-2 transition-transform">
                  <Phone size={20} className="opacity-60" />
                  (+91) 6374251433
                </a>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Socials</p>
                <div className="flex gap-4">
                  {[
                    { icon: <Linkedin size={20} />, url: "https://linkedin.com" },
                    { icon: <Github size={20} />, url: "https://github.com" },
                    { icon: <Code size={20} />, url: "https://leetcode.com" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-red transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-white/10"
            >
              <h3 className="text-3xl font-display mb-8 flex items-center gap-4">
                SEND A MESSAGE <MessageSquare size={24} className="text-brand-yellow" />
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase opacity-60 ml-4">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                      disabled={isSubmitting}
                      className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-white/40 transition-colors placeholder:text-white/20 font-medium disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase opacity-60 ml-4">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      disabled={isSubmitting}
                      className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-white/40 transition-colors placeholder:text-white/20 font-medium disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase opacity-60 ml-4">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    disabled={isSubmitting}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-white/40 transition-colors placeholder:text-white/20 font-medium resize-none disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-5 rounded-2xl font-display text-xl flex items-center justify-center gap-3 transition-all ${
                    isSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'bg-brand-yellow text-brand-red hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : isSuccess ? (
                    <>SENT SUCCESSFULLY!</>
                  ) : (
                    <>SEND MESSAGE <Send size={20} /></>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Location tag floating */}
            <div className="absolute -bottom-6 -right-6 bg-brand-cream text-brand-red px-6 py-4 rounded-2xl border-2 border-brand-red font-bold text-xs flex items-center gap-3 shadow-2xl hidden md:flex">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              TAMIL NADU, INDIA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-cream border-t border-brand-red/10 py-24 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1">
        <Logo />
        <div className="mt-8 text-[10px] font-bold tracking-widest uppercase leading-relaxed">
          K.S. RANGASAMY COLLEGE OF TECHNOLOGY<br />
          TAMIL NADU, INDIA<br />
          <a href="mailto:aamirtha1804@gmail.com" className="mt-4 block hover:opacity-70">AAMIRTHA1804@GMAIL.COM</a>
        </div>
      </div>
      
      <div className="col-span-1"></div>
      
      <div className="col-span-1 flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase">
        <a href="#skills" className="hover:opacity-70">SKILLS</a>
        <a href="#about" className="hover:opacity-70">ABOUT ME</a>
        <a href="#projects" className="hover:opacity-70">PROJECTS</a>
        <a href="#education" className="hover:opacity-70">EDUCATION</a>
        <a href="#contact" className="hover:opacity-70">CONTACTS</a>
      </div>

      <div className="col-span-1 flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase">
        <a href="https://linkedin.com" target="_blank" className="hover:opacity-70">LINKEDIN</a>
        <a href="https://github.com" target="_blank" className="hover:opacity-70">GITHUB</a>
        <a href="https://leetcode.com" target="_blank" className="hover:opacity-70">LEETCODE</a>
        <a href="#" className="hover:opacity-70">RESUME</a>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-brand-red/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest uppercase opacity-50">
      <span>© 2026 AMIRTHA A. ALL RIGHTS RESERVED</span>
      <span>MADE WITH PASSION</span>
    </div>
  </footer>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Nav />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <CareSection />
            <ExtraCurricular />
            <Languages />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

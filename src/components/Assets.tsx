import React from "react";
import { motion } from "motion/react";

export const DogIllustration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Simple hand-drawn style dog placeholder */}
    <path d="M200 100C150 100 120 150 120 200C120 250 150 300 200 300C250 300 280 250 280 200C280 150 250 100 200 100Z" stroke="#6B3A2A" strokeWidth="4" strokeLinecap="round"/>
    <path d="M180 180C180 180 190 170 200 170C210 170 220 180 220 180" stroke="#6B3A2A" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="170" cy="160" r="5" fill="#6B3A2A"/>
    <circle cx="230" cy="160" r="5" fill="#6B3A2A"/>
    {/* Leash */}
    <path d="M200 220C200 220 220 250 250 250C280 250 300 230 300 200" stroke="#E8200A" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

export const SleepingDog = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 250C100 200 150 150 200 150C250 150 300 200 300 250C300 300 250 350 200 350C150 350 100 300 100 250Z" fill="#6B3A2A" opacity="0.8"/>
    <path d="M180 240C180 240 190 235 200 235C210 235 220 240 220 240" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TennisBall = ({ className, style, ...props }: { className?: string; style?: React.CSSProperties; [key: string]: any }) => (
  <div 
    className={`w-12 h-12 bg-brand-yellow rounded-full border-2 border-brand-brown flex items-center justify-center relative overflow-hidden ${className}`}
    style={style}
    {...props}
  >
    <div className="absolute inset-0 border-2 border-white/50 rounded-full scale-75 translate-x-4"></div>
    <div className="absolute inset-0 border-2 border-white/50 rounded-full scale-75 -translate-x-4"></div>
  </div>
);

export const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="w-12 h-6 bg-brand-red relative rounded-full overflow-hidden">
      {/* Simple dachshund silhouette shape */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
      <div className="absolute bottom-1 right-1 w-4 h-1 bg-white rounded-full"></div>
    </div>
    <div className="flex flex-col text-[10px] font-display leading-none text-brand-red">
      <span>AMIRTHA</span>
      <span>A</span>
    </div>
  </div>
);

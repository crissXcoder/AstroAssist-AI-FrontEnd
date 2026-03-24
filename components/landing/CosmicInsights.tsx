"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Orbit, Compass, Globe, ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/ui/section";
import { useTranslations } from "@/components/i18n-provider";

export function CosmicInsights() {
  const t = useTranslations().insights;
  const [activeItem, setActiveItem] = useState(1);

  const insights = [
    {
      id: 1,
      title: t.items[0].title,
      subtitle: t.items[0].subtitle,
      description: t.items[0].description,
      image: "https://imgs.search.brave.com/E4y87XYXy2oOzWR5fuZ-nUwdivjazrB-lLIru3-NKl4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvMTl5Z2F0/ZWtzdzc4MS5qcGc",
      icon: <BookOpen className="w-5 h-5 text-foreground" />
    },
    {
      id: 2,
      title: t.items[1].title,
      subtitle: t.items[1].subtitle,
      description: t.items[1].description,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      icon: <Compass className="w-5 h-5 text-foreground" />
    },
    {
      id: 3,
      title: t.items[2].title,
      subtitle: t.items[2].subtitle,
      description: t.items[2].description,
      image: "https://imgs.search.brave.com/AkeNCGchre1T-GwH5th_aOVSXX1oHKyFw2XZjMTHyxQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5lcy53aXJlZC5j/b20vcGhvdG9zLzY2/YzM4NDJiOTU4MTUy/MTI0MjhkMWEwNy8x/Njo5L3dfNjQwLGNf/bGltaXQvR2V0dHlJ/bWFnZXMtMTE1NTI2/NjA1Ny5qcGc",
      icon: <Orbit className="w-5 h-5 text-foreground" />
    },
    {
      id: 4,
      title: t.items[3].title,
      subtitle: t.items[3].subtitle,
      description: t.items[3].description,
      image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop",
      icon: <Globe className="w-5 h-5 text-foreground" />
    }
  ];

  return (
    <SectionContainer delay={0.2} className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-16 px-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1 h-3 bg-foreground rounded-full" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{t.badge}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05] max-w-xl">
              {t.title_part1} <br className="hidden md:block"/>
              <span className="text-muted-foreground">{t.title_part2}</span>
            </h2>
            <p className="max-w-[500px] text-muted-foreground md:text-lg font-light leading-relaxed mb-2">
              {t.description}
            </p>
          </div>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="flex flex-col lg:flex-row gap-4 h-[70vh] min-h-[500px] max-h-[700px] w-full">
          {insights.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveItem(item.id)}
                onHoverStart={() => setActiveItem(item.id)}
                animate={{
                  flex: isActive ? 4 : 1,
                  opacity: 1,
                }}
                transition={{ 
                  flex: { type: "spring", stiffness: 200, damping: 30, mass: 1 },
                }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group bg-muted border ${isActive ? 'border-border/80 shadow-2xl z-10' : 'border-border/30 z-0'} transition-all duration-500 will-change-transform`}
              >
                {/* Background Image Parallax layer */}
                <motion.div 
                  className="absolute inset-0 z-0 bg-neutral-900"
                  animate={{ 
                    scale: isActive ? 1.02 : 1,
                    filter: isActive ? "grayscale(0%)" : "grayscale(60%)",
                    opacity: isActive ? 0.9 : 0.3
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover mix-blend-screen"
                  />
                  {/* Clean editorial gradient */}
                  <div className={`absolute inset-0 bg-linear-to-t transition-opacity duration-700 ${isActive ? 'from-black/90 via-black/40 to-transparent opacity-100' : 'from-black/80 via-black/60 to-black/40 opacity-100'}`} />
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10 pointer-events-none">
                  
                  {/* Minimal Absolute Floating Icon */}
                  <div className={`absolute top-6 right-6 lg:top-8 lg:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 overflow-hidden shrink-0 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    {item.icon}
                  </div>

                  {/* Vertical Collapsed Typography */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isActive ? 0 : 1, y: isActive ? 20 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-8 left-6 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-max lg:bottom-1/2 lg:translate-y-1/2 lg:-rotate-90 origin-center text-center lg:text-left flex items-center justify-center lg:justify-start"
                    style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                  >
                    <span className="text-sm font-medium tracking-widest text-neutral-400 whitespace-nowrap uppercase">{item.subtitle}</span>
                  </motion.div>

                  {/* Expanded Narrative Payload */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-2 max-w-[420px]"
                      >
                        <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">{item.subtitle}</h4>
                        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-base text-neutral-300 font-light leading-relaxed hidden sm:block">
                          {item.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white group/btn w-fit pointer-events-auto cursor-pointer pb-1">
                          {t.explore} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

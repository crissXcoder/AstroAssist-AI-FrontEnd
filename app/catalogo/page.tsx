"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/landing/ProductCard";
import { catalogData, ProductCategory } from "@/lib/catalog-data";

const CATEGORIES: ("Todos" | ProductCategory)[] = ["Todos", "Telescopios", "Monturas", "Cámaras", "Accesorios"];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | ProductCategory>("Todos");

  const filteredProducts = activeCategory === "Todos" 
    ? catalogData 
    : catalogData.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0A0D14] pt-32 md:pt-40 pb-24 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Immersive Dark Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[50vw] h-[50vw] max-w-[800px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03),transparent_60%)] pointer-events-none blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 min-h-screen">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] w-fit mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-300">Arsenal Óptico</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight md:tracking-[-0.03em] text-white leading-[1.05] mb-8"
          >
            Catálogo <br className="hidden md:block"/>
            <span className="text-neutral-500">Especializado.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl tracking-wide"
          >
            Sistemas calibrados y seleccionados mediante telemetría orbital de AstroAssist. Filtra las ópticas, monturas y accesorios que elevarán tu ecosistema espacial.
          </motion.p>
        </div>

        {/* Dynamic Nav Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-16 md:mb-20"
        >
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-500 outline-none backdrop-blur-md border tracking-wide ${
                activeCategory === category 
                  ? "bg-white text-black border-transparent shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-105"
                  : "bg-white/[0.02] text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Masonry/Grid Engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-[2000px] min-h-[50vh]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                className="h-full"
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Missing Content Fallback */}
          {filteredProducts.length === 0 && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-32 text-center"
             >
                <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-neutral-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Sin sistemas disponibles</h3>
                <p className="text-neutral-500 font-light max-w-sm">
                  Acabamos de agotar los recursos visuales en este sector espacial. Nuestra IA está orbitando por más equipamiento.
                </p>
             </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

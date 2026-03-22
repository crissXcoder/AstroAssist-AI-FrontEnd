"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
  glass?: boolean;
}

export function SectionContainer({ 
  className, 
  children, 
  delay = 0, 
  glass = false,
  ...props 
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay 
      }}
      className={cn(
        "relative w-full overflow-hidden",
        glass && "glass-panel rounded-x3 p-6 md:p-10",
        className
      )}
      {...props}
    >
      {children}
    </motion.section>
  );
}

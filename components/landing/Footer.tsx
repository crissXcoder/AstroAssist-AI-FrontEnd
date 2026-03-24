"use client";

import { Telescope, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations, useLocale } from "@/components/i18n-provider";

export function Footer() {
  const t = useTranslations().footer;
  const locale = useLocale();
  return (
    <footer className="relative border-t border-border/40 bg-background pt-20 pb-10">
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="flex flex-col space-y-6 lg:col-span-2 pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="p-2 bg-accent/10 rounded-xl border border-border/50 group-hover:bg-accent/20 transition-colors">
                <Telescope className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">AstroAssist</span>
            </Link>
            <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-[320px]">
              {t.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
               <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors">
                 <Twitter className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors">
                 <Github className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors">
                 <Linkedin className="w-4 h-4" />
               </a>
            </div>
          </div>

          <div className="flex flex-col space-y-5 lg:col-span-1">
            <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">{t.catalog}</h4>
            <ul className="space-y-4">
              {t.catalog_items.map(item => (
                <li key={item}><Link href={`/${locale}/catalogo`} className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-5 lg:col-span-1">
              <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">{t.resources}</h4>
            <ul className="space-y-4">
              {t.resources_items.map(item => (
                <li key={item}><Link href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-5 lg:col-span-1">
              <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">{t.subscribe}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-1">
              {t.subscribe_desc}
            </p>
            <form className="flex gap-2">
              <Input 
                placeholder="tu@email.com" 
                className="bg-transparent border-border/50 focus-visible:ring-1 focus-visible:ring-foreground rounded-lg h-11"
              />
              <Button size="icon" className="rounded-lg shrink-0 h-11 w-11 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-light tracking-wide">
            © {new Date().getFullYear()} {t.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

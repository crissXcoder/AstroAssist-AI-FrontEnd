import { Hero } from "@/features/landing/components/Hero";
import { FeaturedProducts } from "@/features/landing/components/FeaturedProducts";
import { CosmicInsights } from "@/features/landing/components/CosmicInsights";
import { Benefits } from "@/features/landing/components/Benefits";
import { Gallery } from "@/features/landing/components/Gallery";
import { Testimonials } from "@/features/landing/components/Testimonials";
import { CtaSection } from "@/features/landing/components/CtaSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-hidden selection:bg-primary/30">
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <CosmicInsights />
      <Gallery />
      <Testimonials />
      <CtaSection />
    </main>
  );
}

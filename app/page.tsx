import { ChatWindow } from "@/components/chat/ChatWindow";
import { Telescope } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 overflow-hidden min-h-screen gap-8">
      {/* Hero Section / Landing Info */}
      <section className="flex-1 flex flex-col items-start justify-center text-left space-y-6 max-w-2xl px-4 z-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Telescope className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
          Descubre el Universo con <br className="hidden lg:block"/>
          <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-300">AstroAssist AI</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Tu asistente personal especializado en telescopios, astrofotografía y equipos de observación. 
          Pregunta sobre compatibilidad, elige tu primer equipo o resuelve cualquier duda técnica en tiempo real.
        </p>
      </section>

      {/* Chatbot Section */}
      <section className="w-full lg:w-[450px] xl:w-[500px] h-[600px] max-h-[85vh] shrink-0 z-10 shadow-2xl shadow-primary/5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle glow behind the chat */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse pointer-events-none" />
        <ChatWindow />
      </section>
    </main>
  );
}

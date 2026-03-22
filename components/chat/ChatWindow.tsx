"use client";

import { useChat } from "@/hooks/useChat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { Bot, Sparkles } from "lucide-react";

export function ChatWindow() {
  const { messages, isLoading, sendMessage, clearHistory } = useChat();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-card/80 rounded-t-2xl z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-full relative">
            <Bot className="w-5 h-5 text-primary" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full"></span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-sm">Astro Asistente</h2>
            <p className="text-xs text-muted-foreground">Especialista en Equipos</p>
          </div>
        </div>
        <button 
          onClick={clearHistory}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary/50"
        >
          Limpiar chat
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 z-10">
        <div className="flex flex-col gap-5">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">¡Hola Explorador!</p>
              <p className="text-xs mt-2 max-w-[250px]">
                Soy tu asistente astronómico. ¿Buscas tu primer telescopio o necesitas ayuda con accesorios de astrofotografía?
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <ChatMessage key={msg.id || idx} message={msg} />
            ))
          )}
          {isLoading && (
            <div className="flex w-full gap-3 justify-start items-center p-2 opacity-70">
              <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground flex gap-1 items-center">
                Escribiendo<span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/80 rounded-b-2xl z-20">
        <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

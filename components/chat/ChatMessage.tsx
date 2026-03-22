import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export function ChatMessage({ message }: { message: Message }) {
  const isBot = message.role === "assistant";

  return (
    <div className={cn("flex w-full gap-3", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="w-8 h-8 border border-primary/20 bg-primary/10 mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent"><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={cn(
          "max-w-[80%] text-sm px-4 py-3 rounded-2xl wrap-break-word",
          isBot 
            ? "bg-secondary/70 text-secondary-foreground rounded-tl-sm border border-border/30" 
            : "bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/20"
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className={cn(
          "text-[10px] block mt-1.5 opacity-60 font-mono",
          !isBot && "text-right"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>

      {!isBot && (
        <Avatar className="w-8 h-8 border border-primary/30 bg-primary/20 mt-1 flex items-center justify-center shrink-0">
          <AvatarFallback className="bg-transparent"><User className="w-4 h-4 text-primary-foreground" /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
};

export function MessageInput({ onSendMessage, isLoading }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu consulta astronómica..."
        disabled={isLoading}
        className="flex-1 bg-background/50 border-input rounded-xl focus-visible:ring-primary/50 text-sm"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !input.trim()}
        className="rounded-xl bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all shrink-0"
      >
        <SendHorizontal className="w-5 h-5" />
      </Button>
    </form>
  );
}

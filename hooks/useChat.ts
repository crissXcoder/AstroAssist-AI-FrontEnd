"use client";

import { useState, useEffect } from "react";
import type { Message } from "@/components/chat/ChatMessage";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("astroassist_chat");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing chat history:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage whenever messages change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("astroassist_chat", JSON.stringify(messages));
    }
  }, [messages, isInitialized]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("astroassist_chat");
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Replace with real fetch to /api/chat in the future
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "¡Señal recibida! 🚀 Esta es una respuesta temporal simulada mientras habilitamos la integración real con OpenAI en nuestra ruta API.",
        timestamp: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage, clearHistory };
}

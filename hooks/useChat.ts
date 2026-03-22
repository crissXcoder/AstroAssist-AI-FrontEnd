import { useState, useEffect } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('astroassist_chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, createdAt: new Date(m.createdAt) })));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    } else {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: '¡Hola! Soy AstroAssist. ¿En qué puedo ayudarte a explorar el universo hoy?',
          createdAt: new Date(),
        }
      ]);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('astroassist_chat', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      if (!response.ok) throw new Error('Error en el servidor');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Hubo un problema al conectar con AstroAssist. Intenta de nuevo.');
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un fallo en las comunicaciones cuánticas. Intenta enviar tu mensaje de nuevo.',
        createdAt: new Date()
      }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('astroassist_chat');
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Historial borrado. ¿Qué constelación buscaremos ahora?',
      createdAt: new Date(),
    }]);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    sendMessage,
    clearHistory
  };
}

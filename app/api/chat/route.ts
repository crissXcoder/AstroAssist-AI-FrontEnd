import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const localFAQs = [
  { keywords: ['envio', 'envío', 'tiempo', 'tarda', 'llegar'], response: 'Nuestros envíos terrestres y aéreos tardan entre 3 y 5 días hábiles a nivel mundial. Utilizamos logística asegurada especial para no comprometer la calibración óptica de los telescopios.' },
  { keywords: ['garantia', 'garantía', 'cubre', 'roto'], response: 'Todos nuestros telescopios, monturas y cámaras cuentan con 5 años de garantía extendida contra defectos de fábrica.' },
  { keywords: ['hola', 'buenos dias', 'buenas tardes', 'saludos'], response: '¡Hola! Bienvenido a AstroAssist. Soy tu asistente experto en astronomía. ¿Buscas tu primer telescopio o necesitas ayuda para configurar tu equipo de astrofotografía?' }
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // 1. Detect simple FAQs locally to save resources
    for (const faq of localFAQs) {
      if (faq.keywords.some(keyword => lastMessage.includes(keyword))) {
        // Mock a slight delay to feel natural
        await new Promise(resolve => setTimeout(resolve, 600));
        return NextResponse.json({ 
          role: 'assistant', 
          content: faq.response 
        });
      }
    }

    // 2. Otherwise call OpenAI
    const systemPrompt = "Eres AstroAssist, un asistente virtual experto de una tienda premium de astronomía y astrofotografía. Eres sumamente conocedor, amable y conciso. Ayudas a los clientes a elegir el mejor equipo (telescopios, monturas, cámaras) o resolver dudas técnicas complejas. Mantén un tono entusiasta por la ciencia y el cosmos y usa sintaxis Markdown en tus respuestas cuando sea util.";

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 600,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: 'Error procesando la solicitud con la IA.' }, { status: 500 });
  }
}

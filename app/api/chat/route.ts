import { NextResponse } from 'next/server';
import { GeminiClient } from '@/utils/gemini-client';
import { detectIntent, getProductContext, getSetupContext } from '@/utils/ai-logic';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("❌ [API/Chat] Missing GEMINI_API_KEY");
      return NextResponse.json({ 
        role: 'assistant', 
        content: "Error: No se encontró la API Key en el servidor.",
        status: 'error_auth'
      }, { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;
    const intent = detectIntent(lastUserMessage);
    const productContext = getProductContext(intent, lastUserMessage);
    const setupContext = getSetupContext(lastUserMessage);

    const history = messages.slice(-10); 
    const contents = history.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const systemInstruction = `
Eres AstroAssist, un Asistente Experto en Astronomía y Asesor de Compras Senior.
Tu misión es transformar la curiosidad del usuario en una decisión de compra informada.

### CONTEXTO DEL CATÁLOGO
${productContext}
${setupContext ? `### SETUPS RECOMENDADOS\n${setupContext}` : ""}

### ESTRUCTURA DE RESPUESTA OBLIGATORIA
Debes responder usando EXACTAMENTE estas secciones. Cada sección DEBE estar en su propio párrafo (separadas por dos saltos de línea):

[ENTENDIMIENTO]
Una frase corta demostrando que entiendes la necesidad del usuario.

[RECOMENDACIÓN]
El nombre de un producto del catálogo seguido de su identificador en formato [[PRODUCT:id]]. Ejemplo: "Celestron NexStar 130SLT [[PRODUCT:celestron-130slt]]". Si no tienes una recomendación clara aún, indica que necesitas más información.

[POR QUÉ]
Justificación técnica basada en las características del producto o por qué necesitas más datos.

[PRÓXIMO PASO]
Una pregunta o sugerencia para continuar la exploración.

### REGLAS CRÍTICAS
- **Formato de Encabezados**: Escribe el encabezado al inicio de la línea sin números ni asteriscos (ej: [RECOMENDACIÓN]).
- **Identificadores**: NUNCA inventes un ID. Usa solo los del catálogo.
- **Integridad**: No dejes frases a medias.
`;

    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const client = new GeminiClient(apiKey, modelName);
    const result = await client.generate(lastUserMessage, contents, systemInstruction);

    // If Gemini failed but it's not a config error, we might still want a "soft fallback"
    // However, the user wants TRUTHFUL states. So we fail fast if it's an auth/quota error.
    if (result.status !== 'online') {
      console.warn(`⚠️ [API/Chat] Gemini returned status: ${result.status}`);
      
      const statusCode = result.status === 'error_auth' ? 401 : result.status === 'error_quota' ? 429 : 503;
      
      return NextResponse.json({
        role: 'assistant',
        content: result.errorDetail || "El servicio no está disponible.",
        status: result.status,
        isError: true
      }, { status: statusCode });
    }

    // Basic sanitation
    const sanitizedResponse = result.content
      .replace(/\[object Object\]/g, "")
      .replace(/undefined/g, "")
      .trim();

    return NextResponse.json({ 
      role: 'assistant', 
      content: sanitizedResponse,
      status: 'online'
    });

  } catch (error: any) {
    console.error("🌌 [API/Chat] Fatal Error:", error);
    return NextResponse.json({ 
      role: 'assistant', 
      content: "Error inesperado en el servidor.",
      status: 'offline',
      isError: true
    }, { status: 500 });
  }
}

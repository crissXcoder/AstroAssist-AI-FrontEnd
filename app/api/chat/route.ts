import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // TODO: Integración real con OpenAI
    // const response = await openai.chat.completions.create({...})

    // Respuesta simulada mientras se integra la IA
    return NextResponse.json(
      { 
        message: "¡Conexión API exitosa! Esta es una respuesta desde el Route Handler de Next.js." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Chat Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/ollama";

export async function POST(request) {
  try {
    const body = await request.json();

    const{ message, config } = body;

    const reply = await generateResponse(message, config);

    return NextResponse.json({
      reply,
    });

  } catch(error) {
    console.error("Error en /api/chat:", error);
    const errorMessage = error instanceof Error ? error.message : "Lo siento, ocurrió un error al comunicarme con Ollama.";

    return NextResponse.json(
      {
        reply: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
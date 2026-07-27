import { generateResponse } from "../../../lib/gemini";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, language, level, scenario } = await request.json();

    const systemPrompt = `Eres un asistente conversacional para practicar idiomas.
      Idioma: ${language || 'Inglés'}
      Nivel: ${level || 'B1'}
      Escenario: ${scenario || 'Cafetería'}`;

    const reply = await generateResponse(message, systemPrompt);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en servidor:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
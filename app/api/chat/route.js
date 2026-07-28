import { NextResponse } from 'next/server';
import { generateResponse } from '@/lib/gemini';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, language, level, scenario, roleplay } = body;

    const selectedScenario = scenario || roleplay || 'conversación general';

    const systemPrompt = `Eres un asistente de IA para practicar idiomas llamado LinguaRole AI.
    Debes actuar según el siguiente rol y escenario: ${selectedScenario}.
    El usuario quiere practicar el idioma: ${language || 'Inglés'}.
    El nivel del usuario es: ${level || 'Intermedio'}.
    Instrucciones: Responde dentro del personaje en el idioma seleccionado, corrige suavemente si hay errores graves y mantén la conversación activa.`;

    const reply = await generateResponse(message, systemPrompt);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en servidor:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
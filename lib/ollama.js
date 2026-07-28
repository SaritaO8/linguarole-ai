export async function generateResponse(
  message,
  language,
  scenario,
  level,
  history = []
) {
  const systemPrompt = `
Eres LinguaRole AI, un agente conversacional especializado en el aprendizaje de idiomas.

Tu misión es ayudar al usuario a practicar conversaciones reales.

Configuración actual:

- Idioma: ${language}
- Escenario: ${scenario}
- Nivel: ${level}

Reglas:

1. Habla SIEMPRE en el idioma seleccionado.
2. Actúa como el personaje del escenario.
3. Mantén conversaciones naturales.
4. Adapta el vocabulario al nivel del estudiante.
5. Corrige los errores del usuario al final de cada respuesta.
6. Sé amable y motivador.
7. Nunca digas que eres ChatGPT ni menciones modelos de IA.
8. Las respuestas deben ser cortas (máximo 6 líneas).
`;

  const conversation = history
    .map((msg) => `${msg.sender === "user" ? "Usuario" : "Profesor"}: ${msg.text}`)
    .join("\n");

  const prompt = `
${systemPrompt}

Conversación anterior:

${conversation}

Usuario:
${message}

Profesor:
`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al comunicarse con Ollama");
    }

    const data = await response.json();

    return data.response;
  } catch (error) {
    console.error(error);

    return "Lo siento 😔. No pude comunicarme con Ollama.";
  }
}
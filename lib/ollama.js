export async function generateResponse(message, config) {
  const {
    language,
    level,
    scenario,
    history = [],
  } = config;

  let characterDescription = "";
  let missionDescription = "";
  let characterName = "";

  switch (scenario) {
    case "Restaurante":
      characterName = "John";
      characterDescription = "Eres John, un mesero amable de un restaurante elegante.";
      missionDescription = "Ayuda al cliente, toma su pedido y sugiere comidas del menú.";
      break;
    case "Aeropuerto":
      characterName = "el oficial de migración";
      characterDescription = "Eres un oficial de migración en un aeropuerto internacional.";
      missionDescription = "Verifica los documentos del pasajero y haz preguntas de seguridad.";
      break;
    case "Hotel":
      characterName = "Emma";
      characterDescription = "Eres Emma, la recepcionista de un hotel.";
      missionDescription = "Ayuda al huésped con el check-in y la información del hotel.";
      break;
    case "Entrevista":
      characterName = "el entrevistador";
      characterDescription = "Eres el entrevistador de una empresa.";
      missionDescription = "Realiza una entrevista laboral y evalúa al candidato.";
      break;
    case "Compras":
      characterName = "el vendedor";
      characterDescription = "Eres un vendedor de una tienda.";
      missionDescription = "Ayuda al cliente a elegir productos y cierra la venta.";
      break;
    default:
      characterName = "tu instructor";
      characterDescription = "Eres un profesor de idiomas.";
      missionDescription = "Enseña el idioma dentro del escenario seleccionado.";
  }

  const languageInstruction = (() => {
    switch (language) {
      case "Español":
        return "Answer ONLY in Spanish. Never use English, French, or Korean.";
      case "Inglés":
        return "Answer ONLY in English. Never use Spanish, French, or Korean.";
      case "Francés":
        return "Answer ONLY in French. Never use Spanish, English, or Korean.";
      case "Coreano":
        return "Answer ONLY in Korean. Never use Spanish, English, or French.";
      default:
        return "Answer only in the selected language.";
    }
  })();

  const systemPrompt = `You are LinguaRole BOT, a role-play language tutor.\n${languageInstruction}\n\nScenario: ${scenario}\nCharacter: ${characterDescription}\nCharacter name: ${characterName}\nMission: ${missionDescription}\nLevel: ${level}\n\nRules:\n- Always answer ONLY in ${language}.\n- Never change language or mix languages.\n- Never restart the conversation.\n- Never repeat previous responses or greetings.\n- Never reintroduce yourself after the first message.\n- Never say ChatGPT, Gemini, or that you are an AI.\n- Use the full history and continue from the latest user message.\n- Keep answers between 2 and 5 lines.\n- Ask only one relevant question per response.\n- Correct the student's mistakes at the end in the same language.\n- Teach at most two new words or expressions.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    })),
    { role: "user", content: message },
  ];

  const model = process.env.OLLAMA_MODEL || "llama3.2:1b";

  const response = await fetch("http://127.0.0.1:11434/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 180,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`Ollama error ${response.status}: ${bodyText}`);
  }

  const data = await response.json();
  const assistantReply = data.choices?.[0]?.message?.content || data.choices?.[0]?.text;
  return assistantReply?.trim() || "";
}

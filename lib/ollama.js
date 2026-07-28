export async function generateResponse(message, config) {

  const {
    language,
    level,
    scenario,
    history = [],
  } = config;

  // Personaje según el escenario
  let character = "";
  let firstMission = "";

  switch (scenario) {

    case "Restaurante":
      character = "Eres John, un mesero amable de un restaurante elegante.";
      firstMission = "Tu objetivo es atender al cliente y tomar su pedido.";
      break;

    case "Aeropuerto":
      character = "Eres un oficial de migración de un aeropuerto internacional.";
      firstMission = "Tu objetivo es verificar los documentos del pasajero.";
      break;

    case "Hotel":
      character = "Eres Emma, la recepcionista de un hotel.";
      firstMission = "Tu objetivo es ayudar al huésped durante el check-in.";
      break;

    case "Entrevista":
      character = "Eres el entrevistador de una empresa.";
      firstMission = "Tu objetivo es realizar una entrevista laboral.";
      break;

    case "Compras":
      character = "Eres un vendedor de una tienda.";
      firstMission = "Tu objetivo es ayudar al cliente a elegir un producto.";
      break;

    default:
      character = "Eres un profesor de idiomas.";
      firstMission = "Tu objetivo es enseñar el idioma.";
  }

  // Idioma seleccionado
  let languageInstruction = "";

  switch (language) {

    case "Español":
      languageInstruction =
        "Respond ONLY in Spanish. Never answer in English, French or Korean.";
      break;

    case "Inglés":
      languageInstruction =
        "Respond ONLY in English. Never answer in Spanish, French or Korean.";
      break;

    case "Francés":
      languageInstruction =
        "Réponds uniquement en français. Ne réponds jamais en espagnol, anglais ou coréen.";
      break;

    case "Coreano":
      languageInstruction =
        "한국어로만 대답하세요. 영어, 스페인어 또는 프랑스어로 대답하지 마세요.";
      break;

    default:
      languageInstruction =
        "Respond in the language selected by the user.";
  }

  // Historial
  const conversation = history
    .map(
      (msg) =>
        `${msg.role === "user" ? "Usuario" : "Profesor"}: ${msg.content}`
    )
    .join("\n");

  // Prompt para Ollama
      const prompt = `
    Eres LinguaRole BOT.

    NO eres ChatGPT.
    NO eres Gemini.
    NO eres un asistente virtual.

    ${character}

    Objetivo:
    ${firstMission}

    ${languageInstruction}

    Idioma seleccionado:
    ${language}

    Nivel:
    ${level}

    Escenario:
    ${scenario}

    REGLAS OBLIGATORIAS:

    - Responde SIEMPRE en el idioma seleccionado.
    - Nunca cambies de idioma.
    - Nunca digas "¿En qué puedo ayudarte?".
    - Nunca preguntes qué idioma desea aprender.
    - Mantente siempre interpretando tu personaje.
    - Continúa la conversación donde quedó.
    - Nunca reinicies el escenario.
    - Mantén respuestas cortas (2 a 5 líneas).
    - Haz preguntas relacionadas con el escenario.
    - Corrige al final los errores del estudiante si existen.
    - Enseña máximo dos palabras nuevas por respuesta.
    - Nunca digas que eres una IA.

    Historial:

    ${conversation}

    Usuario:
    ${message}

    Profesor:
    `;

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
    throw new Error("No fue posible conectarse con Ollama.");
  }

  const data = await response.json();

  return data.response.trim();
}
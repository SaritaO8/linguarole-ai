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
          languageInstruction = `
      You MUST answer ONLY in Spanish.
      Never use English, French or Korean.
      `;
          break;

        case "Inglés":
          languageInstruction = `
      You MUST answer ONLY in English.
      Never use Spanish, French or Korean.
      `;
          break;

        case "Francés":
          languageInstruction = `
      You MUST answer ONLY in French.
      Never use Spanish, English or Korean.
      `;
          break;

        case "Coreano":
          languageInstruction = `
      You MUST answer ONLY in Korean.
      Never use Spanish, English or French.
      `;
          break;

        default:
          languageInstruction = `
      Answer in the user's selected language.
      `;
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
    You are LinguaRole BOT.

    ${languageInstruction}

    Character:
    ${character}

    Mission:
    ${firstMission}

    Current language:
    ${language}

    Current level:
    ${level}

    Current scenario:
    ${scenario}

    VERY IMPORTANT RULES:

    1. ALWAYS answer ONLY in ${language}.
    2. NEVER use another language.
    3. NEVER translate your answers.
    4. NEVER repeat your previous response.
    5. Continue naturally from the last message.
    6. Never restart the conversation.
    7. Stay in character.
    8. Keep answers between 1 and 3 short paragraphs.
    9. Ask only ONE question each turn.
    10. Correct the student's mistakes at the end using this format:

    Conversation:

    ${conversation}

    Student:
    ${message}

    ${character}
    `;

  const response = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2:1b",
      prompt,
      stream: false,
      options: {
        num_predict: 180,
        temperature: 0.3,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("No fue posible conectarse con Ollama.");
  }

  const data = await response.json();

  return data.response.trim();
}
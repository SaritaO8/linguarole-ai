"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {

  const searchParams = useSearchParams();

  const language = searchParams.get("language") || "Inglés";
  const scenario = searchParams.get("scenario") || "Restaurante";
  const level = searchParams.get("level") || "Básico";

  function getInitialMessage() {

  let intro = "";

  switch (language) {

    case "Español":

      intro =
        `👋 ¡Hola! Soy LinguaRole BOT 🤖

        Hoy practicaremos Español.

        Escenario: ${scenario}

        ¡Comencemos!

        👨‍🍳 ¡Bienvenido a Bella Italia!

        Mi nombre es John.

        ¿Te gustaría ver el menú?`;

      break;

      case "Inglés":

      intro =
      `👋 Hello! I'm LinguaRole BOT 🤖
          Today we'll practice English.
          Scenario: ${scenario}
          Let's begin!
          👨‍🍳 Welcome to Bella Italia!
          My name is John.
          Would you like to see the menu?`;

            break;

        case "Francés":

      intro =
      `👋 Bonjour ! Je suis LinguaRole BOT 🤖
        Aujourd'hui nous allons pratiquer le français.
        Scénario : ${scenario}
        Commençons !
        👨‍🍳 Bienvenue à Bella Italia !
        Je m'appelle John.
        Voulez-vous voir le menu ?`;

            break;

      case "Coreano":

      intro =
      `👋 안녕하세요! 저는 LinguaRole BOT입니다. 🤖
      오늘은 한국어를 연습해 봅시다.
      상황: ${scenario}
      시작해 봅시다!
      👨‍🍳 Bella Italia에 오신 것을 환영합니다!
      제 이름은 John입니다.
      메뉴를 보시겠어요?`;

            break;

    default:

      intro =
`👋 ¡Hola! Soy LinguaRole BOT 🤖

¡Comencemos!`;
  }

  return intro;
}

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: getInitialMessage(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {

      const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          message: input,

          config: {

            language,

            scenario,

            level,

            history: updatedMessages.map((m) => ({
              role: m.sender,
              content: m.text,
            })),
          },

        }),

      });

      const data = await response.json();
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);

    } catch (error) {

      setLoading(false);
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Error al comunicarse con Ollama.",
        },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex justify-center items-center p-6">

      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-xl h-[85vh] flex flex-col">

        <header className="bg-violet-600 text-white p-5 rounded-t-2xl">

          <h1 className="text-2xl font-bold">
            🤖 LinguaRole AI
          </h1>

          <p className="text-sm">
            {language} | {scenario} | {level}
          </p>

        </header>

        <section className="flex-1 p-5 overflow-y-auto space-y-4">

          {messages.map((message, index) => (

            <div
              key={index}
              className={
                message.sender === "user"
                  ? "bg-violet-600 text-white p-3 rounded-xl ml-auto max-w-sm"
                  : "bg-slate-700 text-white p-3 rounded-xl max-w-sm"
              }
            >
              {message.text}
            </div>

          ))}

        </section>

        <footer className="p-5 border-t border-slate-700 flex gap-3">

          <input
            value={input}
            placeholder="Escribe un mensaje..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 p-3 rounded-lg bg-slate-800 text-white outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-violet-600 hover:bg-violet-700 transition px-6 rounded-lg text-white font-bold"
          >
            Enviar
          </button>

        </footer>

      </div>

    </main>
  );
}
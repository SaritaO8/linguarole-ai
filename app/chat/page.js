"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageBubble from "@/components/chat/MessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";

const getCharacterName = (scenario) => {
  switch (scenario) {
    case "Restaurante":
      return "John";
    case "Hotel":
      return "Emma";
    case "Aeropuerto":
      return "el oficial de migración";
    case "Compras":
      return "el vendedor";
    case "Entrevista":
      return "el entrevistador";
    default:
      return "tu instructor";
  }
};

const getInitialMessage = (language, scenario) => {
  const name = getCharacterName(scenario);

  switch (language) {
    case "Español":
      return `👋 ¡Hola! Soy LinguaRole BOT 🤖\nHoy practicaremos Español.\nEscenario: ${scenario}.\nSoy ${name}.\n¡Comencemos!`;
    case "Inglés":
      return `👋 Hello! I'm LinguaRole BOT 🤖\nToday we'll practice English.\nScenario: ${scenario}.\nI'm ${name}.\nLet's begin!`;
    case "Francés":
      return `👋 Bonjour ! Je suis LinguaRole BOT 🤖\nAujourd'hui nous allons pratiquer le français.\nScénario : ${scenario}.\nSuis ${name}.\nCommençons !`;
    case "Coreano":
      return `👋 안녕하세요! 저는 LinguaRole BOT입니다. 🤖\n오늘은 한국어를 연습해 봅시다.\n상황: ${scenario}.\n저는 ${name}입니다.\n시작해 봅시다!`;
    default:
      return `👋 ¡Hola! Soy LinguaRole BOT 🤖\n¡Comencemos!`;
  }
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const language = searchParams.get("language") || "Inglés";
  const scenario = searchParams.get("scenario") || "Restaurante";
  const level = searchParams.get("level") || "Básico";

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: getInitialMessage(language, scenario),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const resetConversation = () => {
    setMessages([
      {
        sender: "assistant",
        text: getInitialMessage(language, scenario),
      },
    ]);
    setInput("");
    setLoading(false);
  };

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
            history: messages.map((message) => ({
              role: message.sender,
              content: message.text,
            })),
          },
        }),
      });

      const data = await response.json();
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Error al comunicarse con Ollama.",
        },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-xl h-[85vh] flex flex-col">
        <ChatHeader
          language={language}
          scenario={scenario}
          level={level}
          onGoHome={() => router.push("/")}
          onResetConversation={resetConversation}
        />

        <section className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              sender={message.sender}
              text={message.text}
            />
          ))}

          {loading && <TypingIndicator />}
          
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
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 transition px-6 rounded-lg text-white font-bold disabled:cursor-not-allowed disabled:opacity-60"
          >
            Enviar
          </button>
        </footer>
      </div>
    </main>
  );
}

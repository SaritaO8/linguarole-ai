"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 ¡Hola! Soy LinguaRole AI. ¿Cómo estás hoy?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input;

    // Agregar mensaje del usuario
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      // Agregar respuesta de la IA
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Ocurrió un error al comunicarse con el servidor.",
        },
      ]);

      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-xl h-[85vh] flex flex-col">

        {/* Encabezado */}
        <header className="bg-violet-600 text-white p-5 rounded-t-2xl">
          <h1 className="text-2xl font-bold">
            🤖 LinguaRole AI
          </h1>

          <p className="text-sm">
            Practica idiomas mediante conversaciones.
          </p>
        </header>

        {/* Mensajes */}
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

        {/* Caja de texto */}
        <footer className="p-5 border-t border-slate-700 flex gap-3">
          <input
            type="text"
            value={input}
            placeholder="Escribe un mensaje..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
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
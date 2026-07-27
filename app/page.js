"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import LanguageSelector from "../components/LanguageSelector";
import ScenarioSelector from "../components/ScenarioSelector";


export default function Home() {
  const [language, setLanguage] = useState("Inglés");
  const [scenario, setScenario] = useState("Restaurante");
  const [level, setLevel] = useState("Básico");
  const router = useRouter();
  const startConversation = () => {
  router.push("/chat");
};

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8">

        <Header />

        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
        />

        <ScenarioSelector
          scenario={scenario}
          setScenario={setScenario}
        />

        {/* Nivel */}
        <div className="mb-8">
          <label className="block text-white font-semibold mb-2">
            📈 Nivel
          </label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          >
            <option>Básico</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
        </div>

        <button
          onClick={startConversation}
          className="w-full bg-violet-600 hover:bg-violet-700 transition rounded-lg p-3 font-bold text-white"
        >
          Comenzar conversación
        </button>

      </div>
    </main>
  );
}
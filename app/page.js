import Header from "../components/Header";
import LanguageSelector from "../components/LanguageSelector";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8">

        <Header />

        {/* Idioma */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2">
            🌎 Idioma
          </label>

          <select className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700">
            <option>🇺🇸 Inglés</option>
            <option>🇫🇷 Francés</option>
            <option>🇰🇷 Coreano</option>
          </select>
        </div>

        {/* Escenario */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2">
            🎭 Escenario
          </label>

          <select className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700">
            <option>☕ Restaurante</option>
            <option>✈️ Aeropuerto</option>
            <option>🏨 Hotel</option>
            <option>💼 Entrevista</option>
            <option>🛍️ Compras</option>
          </select>
        </div>

        {/* Nivel */}
        <div className="mb-8">
          <label className="block text-white font-semibold mb-2">
            📈 Nivel
          </label>

          <select className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700">
            <option>🟢 Básico</option>
            <option>🟡 Intermedio</option>
            <option>🔴 Avanzado</option>
          </select>
        </div>

        <button className="w-full bg-violet-600 hover:bg-violet-700 transition rounded-lg p-3 font-bold text-white">
          Comenzar conversación
        </button>

      </div>
    </main>
  );
}
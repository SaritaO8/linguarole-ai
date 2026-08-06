export default function LevelSelector() {
  return (
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
  );
}
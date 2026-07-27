export default function ScenarioSelector({ scenario, setScenario }) {
  return (
    <div className="mb-5">
      <label className="block text-white font-semibold mb-2">
        🎭 Escenario
      </label>

      <select
        value={scenario}
        onChange={(e) => setScenario(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
      >
        <option>Restaurante</option>
        <option>Aeropuerto</option>
        <option>Hotel</option>
        <option>Entrevista</option>
        <option>Compras</option>
      </select>
    </div>
  );
}
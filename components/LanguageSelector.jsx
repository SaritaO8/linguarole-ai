export default function LanguageSelector() {
  return (
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
  );
}
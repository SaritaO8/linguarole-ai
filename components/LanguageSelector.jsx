export default function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="mb-5">
      <label className="block text-white font-semibold mb-2">
        🌎 Idioma
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
      >
        <option>Inglés</option>
        <option>Francés</option>
        <option>Coreano</option>
      </select>
    </div>
  );
}
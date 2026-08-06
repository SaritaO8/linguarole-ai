export default function ChatHeader({
  language,
  scenario,
  level,
  onGoHome,
  onResetConversation,
}) {
  return (
    <header className="bg-violet-600 text-white p-5 rounded-t-2xl flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">
          🤖 LinguaRole AI
        </h1>

        <p className="text-sm">
          {language} | {scenario} | {level}
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={onGoHome}
          className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg font-semibold transition"
        >
          🏠 Volver al inicio
        </button>

        <button
          onClick={onResetConversation}
          className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg font-semibold transition"
        >
          🔄 Reiniciar conversación
        </button>

      </div>

    </header>
  );
}
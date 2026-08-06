export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-700 text-white px-4 py-3 rounded-xl flex items-center gap-2">

        <span className="animate-bounce">●</span>
        <span className="animate-bounce [animation-delay:150ms]">●</span>
        <span className="animate-bounce [animation-delay:300ms]">●</span>

        <span className="ml-2 text-sm">
          LinguaRole AI está escribiendo...
        </span>

      </div>
    </div>
  );
}
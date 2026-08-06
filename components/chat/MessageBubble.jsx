export default function MessageBubble({ sender, text }) {
    const isUser = sender == "user";

    return (
    <div
      className={
        isUser
          ? "bg-violet-600 text-white p-3 rounded-xl ml-auto max-w-sm whitespace-pre-line"
          : "bg-slate-700 text-white p-3 rounded-xl max-w-sm whitespace-pre-line"
      }>
        
      {text}
    </div>
  );
}
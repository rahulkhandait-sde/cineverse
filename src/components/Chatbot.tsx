"use client";

import { generateContent } from "@/services/gemini";
import { useEffect, useMemo, useRef, useState } from "react";

// Markdown formatting function
function formatMarkdown(text: string): string {
  return text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded text-xs">$1</code>')
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    // Lists
    .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    // Wrap consecutive list items in ul tags (avoid dotAll flag)
    .replace(/(<li class="ml-4">[\s\S]*?<\/li>)/g, '<ul class="list-disc list-inside space-y-1">$1</ul>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph tags if not already wrapped
    .replace(/^(?!<[h1-6]|<ul|<pre|<p)(.*)$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline hover:no-underline" target="_blank" rel="noopener noreferrer">$1</a>');
}

type ChatEntry = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<string | "auto">("auto");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the CineVerse assistant. Ask me for movie tips, features, or help—in your language.",
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const preferredLanguage = useMemo(() => {
    if (language !== "auto") return language;
    if (typeof navigator !== "undefined") {
      return navigator.language || navigator.languages?.[0] || undefined;
    }
    return undefined;
  }, [language]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setIsSending(true);
    const nextMessages: ChatEntry[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");

    try {
      const instruction = preferredLanguage
        ? `Respond in ${preferredLanguage}. `
        : "Detect the user's language and respond accordingly. ";
      const lastUser = nextMessages.filter((m) => m.role === "user").slice(-1)[0]?.content || "";
      const system =
        "You are CineVerse's multilingual assistant for cinematic topics ONLY. Stay strictly within movies, TV shows, actors/actresses, genres, filmography, recommendations, movie comparisons, and CineVerse feature help (watchlist, favorites, search, filters). If the user asks about anything outside cinema (e.g., coding, math, politics, health, finance, general knowledge), politely refuse and guide them back to movie-related assistance. Be concise, friendly, and actionable.";
      const prompt = `${system}\n\n${instruction}\n\nUser: ${lastUser}`;

      const text = await generateContent(prompt);
      const reply: string = text || "";
      setMessages((prev) => [...prev, { role: "assistant", content: reply || "(no response)" }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Sorry, I hit an error: ${msg}` },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) sendMessage();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-[min(92vw,400px)] h-[520px] bg-gradient-to-br from-white via-red-50/30 to-orange-50/50 dark:from-gray-900 dark:via-red-950/20 dark:to-gray-900 border border-red-200/50 dark:border-red-900/30 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="px-6 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900 text-white flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-sm font-bold">🎬</span>
              </div>
              <div>
                <div className="text-sm font-semibold">CineVerse Assistant</div>
                <div className="text-xs text-white/80">Movie recommendations & help</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                className="text-xs bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/20 transition-all duration-200"
                value={language}
                onChange={(e) => setLanguage(e.target.value as string)}
              >
                <option value="auto" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">Auto</option>
                <option value="en" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">English</option>
                <option value="es" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">Español</option>
                <option value="fr" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">Français</option>
                <option value="de" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">Deutsch</option>
                <option value="hi" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">हिन्दी</option>
                <option value="ja" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">日本語</option>
                <option value="ko" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">한국어</option>
                <option value="pt" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">Português</option>
                <option value="ru" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">Русский</option>
                <option value="zh" className="text-gray-900 dark:text-gray-100 dark:bg-gray-800">中文</option>
              </select>
              <button
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-2 duration-200 prose prose-sm " +
                    (m.role === "user"
                      ? "bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 text-white rounded-br-md shadow-red-500/25 dark:shadow-red-800/40 prose-invert prose-headings:text-white prose-p:text-white prose-strong:text-white prose-code:text-white prose-code:bg-white/20 prose-pre:bg-white/10"
                      : "bg-white/80 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 border border-gray-200/50 dark:border-gray-600/50 rounded-bl-md prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-800 dark:prose-p:text-gray-100 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-red-600 dark:prose-code:text-red-400 prose-code:bg-red-50 dark:prose-code:bg-red-950/30 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-a:text-red-600 dark:prose-a:text-red-400")
                  }
                  dangerouslySetInnerHTML={{
                    __html: m.role === "assistant" 
                      ? formatMarkdown(m.content)
                      : m.content
                  }}
                >
                </div>
              </div>
            ))}
            {isSending && (
              <div className="text-left">
                <div className="inline-block bg-white/80 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg backdrop-blur-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-4 border-t border-red-200/30 dark:border-red-900/20 bg-white/50 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-red-200/50 dark:border-gray-600/50 rounded-xl p-2 focus-within:ring-2 focus-within:ring-red-500/50 dark:focus-within:ring-red-400/50 focus-within:border-red-500/50 dark:focus-within:border-red-400/50 transition-all duration-200 shadow-lg">
              <input
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ask about movies, shows, actors..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSending}
              />
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg ${
                  isSending || input.trim().length === 0
                    ? "bg-gray-300/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 hover:from-red-700 hover:to-red-800 dark:hover:from-red-800 dark:hover:to-red-900 text-white shadow-red-500/25 dark:shadow-red-800/40 hover:shadow-red-500/40 dark:hover:shadow-red-800/60 transform hover:scale-105"
                }`}
                onClick={sendMessage}
                disabled={isSending || input.trim().length === 0}
              >
                {isSending ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={`rounded-full h-16 w-16 shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 ${
          isOpen 
            ? "bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white rotate-45 focus:ring-red-500/50 dark:focus:ring-red-400/50" 
            : "bg-gradient-to-r from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900 hover:from-red-700 hover:via-red-800 hover:to-red-900 dark:hover:from-red-800 dark:hover:via-red-900 dark:hover:to-red-950 text-white focus:ring-red-500/50 dark:focus:ring-red-400/50"
        }`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open chatbot"
      >
        {isOpen ? "✕" : "💬"}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-800 dark:from-red-700 dark:to-red-900 animate-ping opacity-20"></div>
        )}
      </button>
    </div>
  );
}



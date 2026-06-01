"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, User, Sparkles, Maximize2 } from "lucide-react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "What's your current focus?",
  "Tell me about Bright&Devs",
  "What tech stack do you prefer?",
  "Are you open to freelance work?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full"
          style={{ width: 6, height: 6, background: "var(--cyan)" }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

export default function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const userMsg: Message = { role: "user", content: userText };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    setStreamingContent("");

    // 45-second timeout so a slow provider doesn't silently stall forever
    const timeout = setTimeout(() => abortRef.current?.abort(), 45000);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => `HTTP ${res.status}`);
        throw new Error(errText);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";

      if (!reader) throw new Error("No response body");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              full += delta;
              setStreamingContent(full);
            }
          } catch { /* partial chunk */ }
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: full || "I received an empty response — please try again." },
      ]);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // Only show error if it wasn't a manual reset
        if (loading) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Response timed out — the model took too long. Please try again." },
          ]);
        }
        return;
      }
      console.error("[DigitalTwin] chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong on my end. Please try again.",
        },
      ]);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
      setStreamingContent("");
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setLoading(false);
    setStreamingContent("");
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm shadow-2xl"
        style={{
          background: "var(--cyan)",
          color: "#000",
          boxShadow: "0 0 30px var(--cyan-glow), 0 8px 32px rgba(0,0,0,0.4)",
          display: open ? "none" : "flex",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
      >
        <Sparkles size={16} />
        Chat with my Digital Twin
        <motion.span
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ background: "#22c55e" }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: "min(420px, calc(100vw - 24px))",
              height: "min(600px, calc(100vh - 80px))",
              background: "var(--surface)",
              border: "1px solid var(--border-bright)",
              boxShadow:
                "0 0 0 1px rgba(0,212,255,0.08), 0 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background: "var(--surface-2)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--cyan)", color: "#000" }}
                >
                  BA
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                  style={{
                    background: "#22c55e",
                    borderColor: "var(--surface-2)",
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  Bright&apos;s Digital Twin
                </p>
                <p className="text-xs" style={{ color: "var(--cyan)" }}>
                  AI · Online now
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href="/twin"
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200"
                  style={{ color: "var(--muted)" }}
                  title="Open full page"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
                  }
                >
                  <Maximize2 size={14} />
                </Link>
                <button
                  onClick={reset}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200"
                  style={{ color: "var(--muted)" }}
                  title="Reset chat"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
                  }
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
                  }
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ scrollbarWidth: "thin" }}
            >
              {/* Welcome state */}
              {messages.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-6 gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                    style={{
                      background: "var(--cyan-dim)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "var(--cyan)",
                    }}
                  >
                    BA
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ color: "var(--foreground)" }}
                    >
                      Hey, I&apos;m Bright&apos;s Digital Twin
                    </p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      Ask me anything about my career, skills, projects, or availability.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full mt-2">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-left text-sm px-3 py-2 rounded-lg transition-all duration-200"
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          color: "var(--muted-2)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(0,212,255,0.3)";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--foreground)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "var(--border)";
                          (e.currentTarget as HTMLElement).style.color =
                            "var(--muted-2)";
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={
                      msg.role === "assistant"
                        ? { background: "var(--cyan)", color: "#000" }
                        : { background: "var(--surface-2)", border: "1px solid var(--border)" }
                    }
                  >
                    {msg.role === "assistant" ? (
                      <span className="text-xs font-bold">BA</span>
                    ) : (
                      <User size={12} style={{ color: "var(--muted-2)" }} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "var(--cyan)",
                            color: "#000",
                            borderRadius: "16px 4px 16px 16px",
                          }
                        : {
                            background: "var(--surface-2)",
                            color: "var(--muted-2)",
                            border: "1px solid var(--border)",
                            borderRadius: "4px 16px 16px 16px",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Streaming response */}
              {loading && streamingContent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 flex-row"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "var(--cyan)", color: "#000" }}
                  >
                    <span className="text-xs font-bold">BA</span>
                  </div>
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--muted-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px 16px 16px 16px",
                    }}
                  >
                    {streamingContent}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      style={{ color: "var(--cyan)" }}
                    >
                      ▋
                    </motion.span>
                  </div>
                </motion.div>
              )}

              {/* Typing indicator (before any content streams) */}
              {loading && !streamingContent && (
                <div className="flex gap-2 flex-row">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "var(--cyan)", color: "#000" }}
                  >
                    <span className="text-xs font-bold">BA</span>
                  </div>
                  <div
                    className="rounded-xl"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px 16px 16px 16px",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 pb-3 pt-2 shrink-0"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-bright)",
                }}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm resize-none outline-none leading-relaxed"
                  style={{
                    color: "var(--foreground)",
                    maxHeight: "120px",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{
                    background: input.trim() && !loading ? "var(--cyan)" : "var(--border)",
                    color: input.trim() && !loading ? "#000" : "var(--muted)",
                    cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
              <p
                className="text-center text-xs mt-2"
                style={{ color: "var(--muted)" }}
              >
                Powered by AI · Enter to send · Shift+Enter for newline
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

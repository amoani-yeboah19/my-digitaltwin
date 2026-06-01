"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  RotateCcw,
  User,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What are you currently working on?",
  "Tell me about your experience at Payaza",
  "What's your preferred tech stack?",
  "Are you open to new opportunities?",
  "What makes you different as a developer?",
  "How did you get into fintech?",
];

const QUICK_FACTS = [
  { icon: <MapPin size={13} />, text: "Accra, Ghana" },
  { icon: <Briefcase size={13} />, text: "Founder @ Bright&Devs" },
  { icon: <GraduationCap size={13} />, text: "BSc Stats + CS · UG" },
  { icon: <Mail size={13} />, text: "bamoaniyeboah@gmail.com" },
];

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

export default function TwinChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = useCallback(
    async (text?: string) => {
      const userText = (text ?? input).trim();
      if (!userText || loading) return;

      const userMsg: Message = { role: "user", content: userText };
      const history = [...messages, userMsg];
      setMessages(history);
      setInput("");
      setLoading(true);
      setStreamingContent("");

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
            } catch {
              /* partial chunk */
            }
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: full || "Sorry, I couldn't generate a response.",
          },
        ]);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong — try again in a moment.",
          },
        ]);
      } finally {
        setLoading(false);
        setStreamingContent("");
      }
    },
    [input, loading, messages]
  );

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setLoading(false);
    setStreamingContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── LEFT PANEL ── */}
      <aside
        className="hidden lg:flex flex-col w-80 xl:w-96 shrink-0 h-full overflow-y-auto"
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Back link */}
        <div className="px-6 pt-6 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
            }
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </Link>
        </div>

        {/* Avatar + name */}
        <div className="px-6 pb-6 flex flex-col items-start gap-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                color: "#000",
              }}
            >
              BA
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{
                background: "#22c55e",
                borderColor: "var(--surface)",
              }}
            />
          </div>

          <div>
            <h1
              className="text-xl font-bold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              Bright Amoani-Yeboah
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--cyan)" }}>
              AI Digital Twin · Online
            </p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--muted-2)" }}>
              I&apos;m an AI trained on Bright&apos;s career, skills, and personality. Ask me
              anything — I&apos;ll answer as him.
            </p>
          </div>

          {/* Quick facts */}
          <div className="flex flex-col gap-2 w-full">
            {QUICK_FACTS.map((f) => (
              <div key={f.text} className="flex items-center gap-2.5">
                <span style={{ color: "var(--muted)" }}>{f.icon}</span>
                <span className="text-sm" style={{ color: "var(--muted-2)" }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/bright-amoani-yeboah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--muted-2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted-2)";
              }}
            >
              <LinkedInIcon size={13} />
              LinkedIn
              <ExternalLink size={11} />
            </a>
            <a
              href="mailto:bamoaniyeboah@gmail.com"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--muted-2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted-2)";
              }}
            >
              <Mail size={13} />
              Email
            </a>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)", margin: "0 24px" }} />

        {/* Conversation starters */}
        <div className="px-6 py-5 flex flex-col gap-2">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "var(--muted)" }}
          >
            Suggested questions
          </p>
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              disabled={loading}
              className="text-left text-sm px-3 py-2.5 rounded-lg transition-all duration-200"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--muted-2)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted-2)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-auto px-6 pb-6">
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            This AI twin is powered by OpenRouter. Responses reflect Bright&apos;s real
            background but are AI-generated.
          </p>
        </div>
      </aside>

      {/* ── RIGHT PANEL: CHAT ── */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Mobile back + identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="lg:hidden flex items-center gap-1 text-sm transition-colors duration-200 mr-1"
              style={{ color: "var(--muted)" }}
            >
              <ArrowLeft size={16} />
            </Link>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                color: "#000",
              }}
            >
              BA
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Bright&apos;s Digital Twin
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  AI · Responds instantly
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              title="Clear conversation"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-bright)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <RotateCcw size={13} />
              <span className="hidden sm:block">Clear</span>
            </button>
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: "var(--cyan)",
                color: "#000",
                fontWeight: 700,
              }}
            >
              View Portfolio
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col gap-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Empty state */}
          {messages.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center h-full gap-5 max-w-md mx-auto"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{
                  background: "var(--cyan-dim)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "var(--cyan)",
                }}
              >
                BA
              </div>
              <div>
                <h2
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Ask me anything
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  I&apos;m Bright&apos;s Digital Twin — an AI with full knowledge of his career,
                  projects, skills, and availability. What would you like to know?
                </p>
              </div>
              {/* Mobile starters */}
              <div className="lg:hidden flex flex-col gap-2 w-full">
                {STARTERS.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-sm px-4 py-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--muted-2)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Message list */}
          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={
                    msg.role === "assistant"
                      ? {
                          background:
                            "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                          color: "#000",
                        }
                      : {
                          background: "var(--surface-2)",
                          border: "1px solid var(--border-bright)",
                        }
                  }
                >
                  {msg.role === "assistant" ? (
                    <span className="text-xs font-bold">BA</span>
                  ) : (
                    <User size={13} style={{ color: "var(--muted-2)" }} />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className="max-w-[75%] px-4 py-3 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          background: "var(--cyan)",
                          color: "#000",
                          borderRadius: "18px 4px 18px 18px",
                          fontWeight: 500,
                        }
                      : {
                          background: "var(--surface-2)",
                          color: "var(--muted-2)",
                          border: "1px solid var(--border)",
                          borderRadius: "4px 18px 18px 18px",
                        }
                  }
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {/* Streaming */}
            {loading && streamingContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 flex-row"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                    color: "#000",
                  }}
                >
                  <span className="text-xs font-bold">BA</span>
                </div>
                <div
                  className="max-w-[75%] px-4 py-3 text-sm leading-relaxed"
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--muted-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px 18px 18px 18px",
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

            {/* Typing indicator */}
            {loading && !streamingContent && (
              <div className="flex gap-3 flex-row">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                    color: "#000",
                  }}
                >
                  <span className="text-xs font-bold">BA</span>
                </div>
                <div
                  className="rounded-xl"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px 18px 18px 18px",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div
          className="px-4 sm:px-8 py-4 shrink-0"
          style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="flex items-end gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-bright)",
              }}
              onFocusCapture={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.4)")
              }
              onBlurCapture={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-bright)")
              }
            >
              <textarea
                ref={inputRef}
                rows={1}
                placeholder="Ask me anything about my career, skills, or availability..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                }}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent text-sm resize-none outline-none leading-relaxed"
                style={{
                  color: "var(--foreground)",
                  maxHeight: "160px",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                style={{
                  background:
                    input.trim() && !loading ? "var(--cyan)" : "var(--border)",
                  color: input.trim() && !loading ? "#000" : "var(--muted)",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                }}
              >
                <Send size={15} />
              </button>
            </div>
            <p
              className="text-center text-xs mt-2"
              style={{ color: "var(--muted)" }}
            >
              Enter to send · Shift+Enter for newline · AI-generated responses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, User } from "lucide-react";

const mockMessages = [
  {
    role: "user",
    text: "Are you available for freelance work?",
  },
  {
    role: "assistant",
    text: "Yes — I'm currently open to freelance projects. Whether it's a custom React app, a WordPress site, or an AI-powered solution, I'm ready to build. What do you have in mind?",
  },
  {
    role: "user",
    text: "What's your rate for a full web app?",
  },
  {
    role: "assistant",
    text: "For a full web application I start at $1,500. Share your scope and I can give you a precise quote — reach out via the contact form.",
  },
];

function MockBubble({
  msg,
  index,
  inView,
}: {
  msg: (typeof mockMessages)[0];
  index: number;
  inView: boolean;
}) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.18, ease: "easeOut" }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={
          isUser
            ? { background: "var(--surface)", border: "1px solid var(--border-bright)" }
            : { background: "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)", color: "#000" }
        }
      >
        {isUser ? (
          <User size={12} style={{ color: "var(--muted-2)" }} />
        ) : (
          <span style={{ fontSize: "9px", fontWeight: 700 }}>BA</span>
        )}
      </div>
      <div
        className="max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed"
        style={
          isUser
            ? {
                background: "var(--cyan)",
                color: "#000",
                fontWeight: 500,
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
        {msg.text}
      </div>
    </motion.div>
  );
}

export default function TwinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="twin"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: "32px", height: "2px", background: "var(--cyan)" }} />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--cyan)" }}
                >
                  Digital Twin
                </span>
              </div>

              <h2
                className="font-bold leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Can&apos;t reach me?{" "}
                <span className="gradient-text">Talk to my AI.</span>
              </h2>

              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--muted-2)" }}
              >
                My Digital Twin is an AI trained on my career, projects, skills, and
                pricing. It answers in my voice — honestly and directly — 24/7.
              </p>

              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Ask about availability, rates, past work, or anything else you&apos;d ask me
                in person. If it can&apos;t answer, it&apos;ll point you straight to my inbox.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  "Answers about my work",
                  "Knows my rates",
                  "Available 24/7",
                  "Responds in seconds",
                ].map((f) => (
                  <span
                    key={f}
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border-bright)",
                      color: "var(--muted-2)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <Link
                href="/twin"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
                style={{
                  background: "var(--cyan)",
                  color: "#000",
                  boxShadow: "0 0 24px var(--cyan-glow)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px var(--cyan-glow)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px var(--cyan-glow)";
                }}
              >
                <Sparkles size={16} />
                Open Full Chat
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Mock chat UI ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Outer card glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 60%)",
                transform: "translateY(-8px) scale(1.02)",
                filter: "blur(16px)",
              }}
            />

            {/* Chat card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-bright)",
                boxShadow: "0 0 0 1px rgba(0,212,255,0.06), 0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="relative shrink-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                      color: "#000",
                    }}
                  >
                    BA
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "#22c55e", borderColor: "var(--surface)" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    Bright&apos;s Digital Twin
                  </p>
                  <p className="text-xs" style={{ color: "var(--cyan)" }}>
                    AI · Online now
                  </p>
                </div>
                {/* Fake window dots */}
                <div className="ml-auto flex items-center gap-1.5">
                  {["#f87171", "#facc15", "#4ade80"].map((c) => (
                    <span
                      key={c}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: c, opacity: 0.6 }}
                    />
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="px-4 py-5 flex flex-col gap-3">
                {mockMessages.map((msg, i) => (
                  <MockBubble key={i} msg={msg} index={i} inView={inView} />
                ))}

                {/* Blinking cursor to imply it's live */}
                <motion.div
                  className="flex gap-2.5 flex-row"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%)",
                      color: "#000",
                    }}
                  >
                    <span style={{ fontSize: "9px", fontWeight: 700 }}>BA</span>
                  </div>
                  <div
                    className="px-3.5 py-2.5 rounded-xl flex items-center gap-1"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px 16px 16px 16px",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="block rounded-full"
                        style={{ width: 5, height: 5, background: "var(--cyan)" }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Fake input bar */}
              <div
                className="px-4 pb-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 mt-3"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-bright)",
                  }}
                >
                  <span className="text-sm flex-1" style={{ color: "var(--muted)" }}>
                    Ask me anything...
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--cyan)", color: "#000" }}
                  >
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

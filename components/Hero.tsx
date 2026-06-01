"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "WordPress Expert",
  "AI Solutions Builder",
  "Fintech Enthusiast",
  "Founder @ Bright&Devs",
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TypewriterText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 65);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 35);
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, index, texts]);

  return (
    <span style={{ color: "var(--cyan)" }}>
      {displayed}
      <span
        style={{
          borderRight: "2px solid var(--cyan)",
          marginLeft: "2px",
          animation: "blink 0.8s step-end infinite",
        }}
      />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-16"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
            animation: "pulse-glow 5s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Decorative geometric elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.12 }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            right: "6%",
            width: "90px",
            height: "90px",
            border: "1px solid var(--cyan)",
            borderRadius: "4px",
            transform: "rotate(15deg)",
            animation: "spin-slow 20s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: "60px",
            height: "60px",
            border: "1px solid var(--purple)",
            borderRadius: "50%",
            animation: "spin-slow 15s linear infinite reverse",
          }}
        />
      </div>

      {/* Content — pt-24 ensures content always clears the fixed 64px navbar */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
            style={{
              background: "var(--cyan-dim)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "var(--cyan)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--cyan)",
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}
            />
            Available for work · Accra, Ghana
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-bold leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          <span style={{ color: "var(--foreground)" }}>Bright</span>
          <br />
          <span className="gradient-text">Amoani-Yeboah</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="text-xl md:text-2xl font-medium mb-6"
          style={{ minHeight: "2rem", color: "var(--muted-2)" }}
        >
          <TypewriterText texts={roles} />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          style={{ color: "var(--muted)" }}
        >
          I build modern, responsive web & mobile apps — blending sharp
          engineering with AI-enhanced solutions. Founder of{" "}
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
            Bright&Devs
          </span>
          , crafting digital products that move fast and look exceptional.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#portfolio"
            className="px-7 py-3 rounded-lg text-sm font-bold btn-primary"
            style={{ letterSpacing: "0.05em" }}
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-lg text-sm font-semibold btn-outline"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <a
            href="https://www.linkedin.com/in/bright-amoani-yeboah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
            }
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:bamoaniyeboah@gmail.com"
            className="flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
            }
          >
            <Mail size={18} />
            <span>Email</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — sits below content in flow, not absolutely positioned */}
      <motion.div
        className="flex flex-col items-center gap-2 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--cyan)" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

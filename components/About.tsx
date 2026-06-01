"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Globe, Brain, Code2 } from "lucide-react";

const highlights = [
  {
    icon: <Code2 size={20} />,
    title: "Frontend Engineering",
    desc: "React, Next.js, TypeScript — pixel-perfect interfaces built for performance.",
  },
  {
    icon: <Globe size={20} />,
    title: "WordPress Expert",
    desc: "Custom themes, plugins, and scalable CMS solutions tailored to any business.",
  },
  {
    icon: <Brain size={20} />,
    title: "AI-Enhanced Solutions",
    desc: "Integrating AI tools to automate workflows and add intelligent features.",
  },
  {
    icon: <Zap size={20} />,
    title: "Agentic Engineering",
    desc: "Building autonomous systems and smart apps that work while you sleep.",
  },
];

const stats = [
  { value: "1+", label: "Year Freelancing" },
  { value: "10+", label: "Projects Shipped" },
  { value: "2", label: "Companies Founded" },
  { value: "∞", label: "Lines of Code" },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "var(--cyan)",
              }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--cyan)" }}
            >
              About Me
            </span>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <FadeInSection delay={0.1}>
              <h2
                className="font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                I turn ideas into{" "}
                <span className="gradient-text-cyan">digital reality</span>.
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <p
                className="text-base leading-relaxed mb-5"
                style={{ color: "var(--muted-2)" }}
              >
                I&apos;m a Frontend and WordPress Developer based in{" "}
                <strong style={{ color: "var(--foreground)" }}>Accra, Ghana</strong> — combining deep technical skill with a passion for innovative technology. I don&apos;t just write code; I craft experiences that are fast, beautiful, and built to last.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--muted-2)" }}
              >
                As the founder of{" "}
                <strong style={{ color: "var(--cyan)" }}>Bright&Devs</strong>, I lead web and mobile projects end-to-end. I&apos;m particularly passionate about{" "}
                <strong style={{ color: "var(--foreground)" }}>fintech</strong> and the intersection of AI with everyday software — building systems that are as smart as they are elegant.
              </p>
            </FadeInSection>

            {/* Stats */}
            <FadeInSection delay={0.4}>
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--cyan)" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--muted)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>

          {/* Right: Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <FadeInSection key={h.title} delay={0.15 + i * 0.1}>
                <div
                  className="card-glass p-5 rounded-xl group cursor-default transition-all duration-300"
                  style={{ height: "100%" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(13,14,26,0.8)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: "var(--cyan-dim)",
                      color: "var(--cyan)",
                      border: "1px solid rgba(0,212,255,0.2)",
                    }}
                  >
                    {h.icon}
                  </div>
                  <h3
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {h.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {h.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

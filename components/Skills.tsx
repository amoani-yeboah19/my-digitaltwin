"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    name: "Frontend",
    color: "var(--cyan)",
    dim: "var(--cyan-dim)",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "HTML & CSS", level: 95 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    name: "WordPress",
    color: "#a78bfa",
    dim: "rgba(167,139,250,0.12)",
    skills: [
      { name: "Theme Development", level: 92 },
      { name: "Plugin Development", level: 80 },
      { name: "WooCommerce", level: 75 },
      { name: "Elementor & Gutenberg", level: 85 },
      { name: "SEO Optimization", level: 88 },
    ],
  },
  {
    name: "AI & Tools",
    color: "#34d399",
    dim: "rgba(52,211,153,0.1)",
    skills: [
      { name: "AI Integration", level: 78 },
      { name: "Agentic Systems", level: 72 },
      { name: "Git & GitHub", level: 85 },
      { name: "Figma", level: 75 },
      { name: "REST APIs", level: 82 },
    ],
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3",
  "Tailwind CSS", "WordPress", "PHP", "MySQL", "Git", "Figma",
  "Node.js", "Python", "AI/LLMs", "Framer Motion",
];

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: "var(--muted-2)" }}>
          {name}
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--border-bright)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}

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

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeInSection>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "32px", height: "2px", background: "var(--cyan)" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--cyan)" }}
            >
              Skills & Tech
            </span>
          </div>
          <h2
            className="font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            The stack I ship with
          </h2>
          <p className="text-base mb-16 max-w-xl" style={{ color: "var(--muted)" }}>
            Tools and technologies I reach for when building production-grade products.
          </p>
        </FadeInSection>

        {/* Skill bars */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, ci) => (
            <FadeInSection key={cat.name} delay={ci * 0.1}>
              <div
                className="p-6 rounded-xl card-glass"
                style={{ height: "100%" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: cat.color,
                      boxShadow: `0 0 8px ${cat.color}`,
                    }}
                  />
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: cat.color }}
                  >
                    {cat.name}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {cat.skills.map((s, si) => (
                    <SkillBar
                      key={s.name}
                      name={s.name}
                      level={s.level}
                      color={cat.color}
                      delay={si * 0.08}
                    />
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Tech tag cloud */}
        <FadeInSection delay={0.2}>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ color: "var(--muted)" }}
          >
            Full tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium cursor-default transition-all duration-200"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--muted-2)",
                }}
                whileHover={{
                  borderColor: "rgba(0,212,255,0.4)",
                  color: "var(--cyan)",
                  background: "var(--cyan-dim)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

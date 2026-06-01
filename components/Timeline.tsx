"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

type Entry = {
  type: "work" | "edu";
  company: string;
  role: string;
  period: string;
  location?: string;
  desc?: string;
  highlight?: boolean;
};

const entries: Entry[] = [
  {
    type: "work",
    company: "Bright&Devs",
    role: "Founder",
    period: "May 2026 — Present",
    location: "Accra, Ghana",
    desc: "Founded and lead a web & mobile development studio. Overseeing client projects, product strategy, and engineering direction.",
    highlight: true,
  },
  {
    type: "work",
    company: "Fiverr",
    role: "Freelance Web Developer",
    period: "Jul 2025 — Present",
    desc: "Delivering responsive, SEO-optimized sites using WordPress, React/Next.js, HTML, and CSS. Built a trusted personal brand through consistent quality.",
    highlight: true,
  },
  {
    type: "work",
    company: "Payaza",
    role: "Engineering Intern",
    period: "Mar 2025 — Dec 2025",
    location: "Greater Accra, Ghana",
    desc: "Hands-on engineering internship at a fintech company — bridging academic learning with real-world product development.",
  },
  {
    type: "work",
    company: "Theme Wire",
    role: "WordPress Developer",
    period: "Sep 2025 — Nov 2025",
    location: "Accra",
    desc: "Developed and customized WordPress themes and solutions for client projects.",
  },
  {
    type: "work",
    company: "IPMC Ghana",
    role: "IT Support Technician",
    period: "Mar 2024 — Apr 2024",
    location: "Circle, Accra",
    desc: "Troubleshooting hardware, software, and network issues. System maintenance, software installations, and user training.",
  },
  {
    type: "edu",
    company: "University of Ghana",
    role: "BSc Statistics with Computer Science",
    period: "Jan 2023 — Sep 2026",
    desc: "Combining statistical analysis with computer science fundamentals — building a strong technical foundation.",
  },
  {
    type: "edu",
    company: "Presbyterian Boys' Senior High School",
    role: "General Science",
    period: "Sep 2019 — Sep 2022",
  },
];

function TimelineItem({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex gap-6"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div
          className="flex items-center justify-center rounded-full z-10 shrink-0"
          style={{
            width: "40px",
            height: "40px",
            background: entry.highlight ? "var(--cyan)" : "var(--surface-2)",
            border: entry.highlight
              ? "none"
              : "1px solid var(--border-bright)",
            color: entry.highlight ? "#000" : "var(--muted-2)",
            boxShadow: entry.highlight ? "0 0 16px var(--cyan-glow)" : "none",
          }}
        >
          {entry.type === "work" ? (
            <Briefcase size={16} />
          ) : (
            <GraduationCap size={16} />
          )}
        </div>
        {/* Connector line */}
        <div
          style={{
            width: "1px",
            flexGrow: 1,
            marginTop: "8px",
            background:
              "linear-gradient(to bottom, var(--border-bright), transparent)",
            minHeight: "24px",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-10 rounded-xl p-5 mb-0 transition-all duration-300 group"
        style={{
          background: entry.highlight ? "rgba(0,212,255,0.03)" : "var(--surface-2)",
          border: `1px solid ${entry.highlight ? "rgba(0,212,255,0.15)" : "var(--border)"}`,
          marginTop: "0",
          transform: "translateY(0)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.25)";
          (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = entry.highlight
            ? "rgba(0,212,255,0.15)"
            : "var(--border)";
          (e.currentTarget as HTMLElement).style.background = entry.highlight
            ? "rgba(0,212,255,0.03)"
            : "var(--surface-2)";
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div>
            <span
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: entry.highlight ? "var(--cyan)" : "var(--purple)" }}
            >
              {entry.company}
            </span>
            <h3
              className="font-semibold text-base mt-0.5"
              style={{ color: "var(--foreground)" }}
            >
              {entry.role}
            </h3>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full shrink-0"
            style={{
              background: "var(--border)",
              color: "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            {entry.period}
          </span>
        </div>

        {entry.location && (
          <div
            className="flex items-center gap-1 text-xs mb-2"
            style={{ color: "var(--muted)" }}
          >
            <MapPin size={11} />
            {entry.location}
          </div>
        )}

        {entry.desc && (
          <p
            className="text-sm leading-relaxed mt-2"
            style={{ color: "var(--muted-2)" }}
          >
            {entry.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="journey"
      className="relative py-24 md:py-32"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "32px", height: "2px", background: "var(--cyan)" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--cyan)" }}
            >
              Career Journey
            </span>
          </div>
          <h2
            className="font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            The road so far
          </h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            From IT support to founding my own studio — every step sharpened the edge.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col gap-2">
          {entries.map((entry, i) => (
            <TimelineItem key={`${entry.company}-${i}`} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

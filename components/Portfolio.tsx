"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Lock, Sparkles } from "lucide-react";

const placeholderProjects = [
  {
    tag: "Fintech",
    title: "Payment Gateway UI",
    desc: "A sleek, enterprise-grade payment flow interface built with Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    status: "coming-soon",
    color: "var(--cyan)",
  },
  {
    tag: "SaaS",
    title: "AI Content Dashboard",
    desc: "Real-time content management with AI-powered writing assistance baked in.",
    tech: ["React", "OpenAI API", "Node.js"],
    status: "coming-soon",
    color: "#a78bfa",
  },
  {
    tag: "WordPress",
    title: "E-Commerce Platform",
    desc: "Custom WooCommerce store with advanced filtering, performance optimization, and SEO.",
    tech: ["WordPress", "PHP", "WooCommerce"],
    status: "coming-soon",
    color: "#34d399",
  },
  {
    tag: "Web App",
    title: "Portfolio Generator",
    desc: "A tool that generates beautiful developer portfolios from a GitHub profile in seconds.",
    tech: ["Next.js", "GitHub API", "Framer"],
    status: "coming-soon",
    color: "#fb923c",
  },
  {
    tag: "Mobile",
    title: "Fintech Mobile App",
    desc: "Cross-platform financial tracking app with real-time analytics and budgeting tools.",
    tech: ["React Native", "Expo", "Supabase"],
    status: "coming-soon",
    color: "#f472b6",
  },
  {
    tag: "AI",
    title: "Agentic Workflow Builder",
    desc: "Drag-and-drop builder for creating autonomous AI agent workflows and pipelines.",
    tech: ["Next.js", "LangChain", "Python"],
    status: "coming-soon",
    color: "#facc15",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof placeholderProjects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-xl card-glass transition-all duration-300"
      style={{ minHeight: "220px" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${project.color}44`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${project.color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Color accent top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      <div className="p-6">
        {/* Tag */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.tag}
          </span>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--muted)" }}
          >
            <Lock size={11} />
            <span>Coming soon</span>
          </div>
        </div>

        <h3
          className="font-semibold text-lg mb-2 transition-colors duration-200"
          style={{ color: "var(--foreground)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
          {project.desc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "var(--surface)",
                color: "var(--muted-2)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(5,6,15,0.7)", backdropFilter: "blur(4px)" }}
      >
        <div className="text-center">
          <Sparkles
            size={28}
            style={{ color: project.color, margin: "0 auto 8px" }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Case study dropping soon
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Portfolio in progress
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
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
              Portfolio
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2
                className="font-bold leading-tight mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Work in progress
              </h2>
              <p className="text-base max-w-xl" style={{ color: "var(--muted)" }}>
                Case studies and projects are being documented. Here&apos;s a preview of
                what&apos;s coming — real work, real results.
              </p>
            </div>
            <div
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg shrink-0"
              style={{
                background: "var(--cyan-dim)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "var(--cyan)",
              }}
            >
              <ExternalLink size={14} />
              <span className="font-medium">6 projects planned</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {placeholderProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Want to see my Fiverr work or discuss a project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold btn-outline"
          >
            Let&apos;s talk
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

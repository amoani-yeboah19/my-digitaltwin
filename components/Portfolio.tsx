"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Clock, ArrowUpRight } from "lucide-react";

type Project = {
  tag: string;
  title: string;
  desc: string;
  tech: string[];
  color: string;
  status: "live" | "coming-soon";
  live?: string;
  github?: string;
};

const projects: Project[] = [
  // ── Web & Mobile Apps ──────────────────────────────────
  {
    tag: "Web App",
    title: "ShopHant",
    desc: "All-in-one platform merging e-commerce with an apprenticeship marketplace for skilled trades — plumbing, electricals and more — in one seamless experience.",
    tech: ["Next.js", "React", "shadcn/ui", "Supabase", "Framer Motion"],
    color: "#60a5fa",
    status: "live",
    live: "https://v0-shop-hant-e-commerce-platform.vercel.app/",
    github: "https://github.com/amoani-yeboah19/shophant-e-commerce-platform",
  },
  {
    tag: "Mobile App",
    title: "InternLink",
    desc: "A mobile platform bridging the gap between students and internship opportunities — students discover and apply for roles, companies post and manage listings, all in one app.",
    tech: ["React Native", "Expo", "Mobile"],
    color: "#f472b6",
    status: "coming-soon",
  },
  // ── Coming Soon ────────────────────────────────────────
  {
    tag: "Web App",
    title: "closr",
    desc: "A smart proposal generator for freelancers, agencies, and business owners — create polished, professional billing proposals in minutes, not hours.",
    tech: ["Next.js", "React", "TypeScript", "AI"],
    color: "#a78bfa",
    status: "coming-soon",
  },
  {
    tag: "Web App",
    title: "AI Kanban",
    desc: "An AI-assisted Kanban board that intelligently prioritises tasks, suggests workflows, and adapts to how you work — productivity meets automation.",
    tech: ["Next.js", "React", "AI/LLMs", "TypeScript"],
    color: "#facc15",
    status: "coming-soon",
  },
  {
    tag: "SaaS",
    title: "Legal Doc Assistant",
    desc: "An AI-powered SaaS that drafts professional legal documents — consulting agreements, NDAs, contracts — in minutes, with clean PDF export.",
    tech: ["Next.js", "AI/LLMs", "PDF Generation", "TypeScript"],
    color: "#60a5fa",
    status: "coming-soon",
  },
  {
    tag: "Capstone",
    title: "Trading Workstation",
    desc: "A realtime trading workstation with live market data, virtual trade execution, portfolio tracking, and an AI assistant for analysis and strategy.",
    tech: ["Next.js", "WebSockets", "AI/LLMs", "Real-time Data"],
    color: "#4ade80",
    status: "coming-soon",
  },
  // ── Freelance & WordPress ──────────────────────────────
  {
    tag: "Freelance",
    title: "Philiatek Digital Solutions",
    desc: "Professional website for a software company specialising in building advanced systems-level software and enterprise-grade solutions.",
    tech: ["Vite", "React", "CSS"],
    color: "#8b5cf6",
    status: "live",
    live: "https://philiatek-website-three.vercel.app/",
    github: "https://github.com/amoani-yeboah19/philiatek-website",
  },
  {
    tag: "Freelance",
    title: "SeluxOrganics",
    desc: "E-commerce store for organic products featuring a monthly subscription model — customers can browse, purchase, and subscribe to recurring deliveries.",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    color: "#34d399",
    status: "live",
    live: "https://seluxorganics-website-19i.vercel.app/subscriptions",
    github: "https://github.com/amoani-yeboah19/seluxorganics-website",
  },
  {
    tag: "Freelance",
    title: "Mansaray Landscape",
    desc: "Professional website for a landscaping company — showcasing services and portfolio with fluid scroll animations and a strong visual identity built to convert.",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    color: "#4ade80",
    status: "live",
    live: "https://mansaray-website-eta.vercel.app/",
    github: "https://github.com/amoani-yeboah19/mansaray-website",
  },
  {
    tag: "WordPress",
    title: "PizzaKing Ghana",
    desc: "Full restaurant website with integrated e-commerce for a Ghanaian pizza brand — online ordering, menu management, and a branded experience on WordPress.",
    tech: ["WordPress", "WooCommerce", "PHP", "Custom Theme"],
    color: "#fb923c",
    status: "live",
    live: "https://pizzakinggh.com/",
  },
  {
    tag: "WordPress",
    title: "Dealogic Computers",
    desc: "E-commerce store for computers and accessories serving the Ghanaian tech market — product catalogue, filters, and a full shopping experience on WooCommerce.",
    tech: ["WordPress", "WooCommerce", "PHP", "Custom Theme"],
    color: "var(--cyan)",
    status: "live",
    live: "https://dealogiccomputers.com/",
  },
];

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLive = project.status === "live";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col rounded-xl card-glass transition-all duration-300"
      style={{ minHeight: "240px" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${project.color}55`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${project.color}12`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          borderRadius: "12px 12px 0 0",
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shrink-0"
            style={{
              background: `${project.color}18`,
              color: project.color,
              border: `1px solid ${project.color}35`,
            }}
          >
            {project.tag}
          </span>
          {isLive ? (
            <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#4ade80" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              Live
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
              <Clock size={11} />
              In dev
            </span>
          )}
        </div>

        <h3 className="font-bold text-base mb-2" style={{ color: "var(--foreground)" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: "var(--surface)", color: "var(--muted-2)", border: "1px solid var(--border)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ background: project.color, color: "#000" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <ArrowUpRight size={13} />
              Live Site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border-bright)", color: "var(--muted-2)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted-2)")}
            >
              <GitHubIcon />
              GitHub
            </a>
          )}
          {!isLive && (
            <span
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              Coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <section id="portfolio" className="relative py-24 md:py-32" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "32px", height: "2px", background: "var(--cyan)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--cyan)" }}>
              Portfolio
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-bold leading-tight mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Selected work
              </h2>
              <p className="text-base max-w-xl" style={{ color: "var(--muted)" }}>
                Real projects — shipped for clients and built for scale. More on the way as I push deeper into AI engineering.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
                style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span className="font-semibold">{liveCount} live</span>
              </div>
              <a
                href="https://github.com/amoani-yeboah19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-all duration-200"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted-2)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--muted-2)";
                }}
              >
                <GitHubIcon />
                GitHub
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

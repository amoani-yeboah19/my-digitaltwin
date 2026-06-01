"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "bamoaniyeboah@gmail.com",
    href: "mailto:bamoaniyeboah@gmail.com",
    color: "var(--cyan)",
  },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    value: "bright-amoani-yeboah",
    href: "https://www.linkedin.com/in/bright-amoani-yeboah",
    color: "#a78bfa",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+233 20 108 8496",
    href: "tel:+233201088496",
    color: "#34d399",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:bamoaniyeboah@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    background: "var(--surface-2)",
    border: "1px solid var(--border-bright)",
    color: "var(--foreground)",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "var(--font-space-grotesk)",
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 grid-bg"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "32px", height: "2px", background: "var(--cyan)" }} />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--cyan)" }}
            >
              Contact
            </span>
          </div>
          <h2
            className="font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Let&apos;s build something{" "}
            <span className="gradient-text-cyan">exceptional</span>.
          </h2>
          <p className="text-base mb-16 max-w-xl" style={{ color: "var(--muted)" }}>
            Open to freelance projects, full-time opportunities, and exciting collaborations.
            Drop me a line — I usually respond within 24 hours.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="flex flex-col gap-4">
            {contactLinks.map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.1}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl card-glass group transition-all duration-300"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${c.color}44`;
                    (e.currentTarget as HTMLElement).style.background = `${c.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(13,14,26,0.8)";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `${c.color}15`,
                      border: `1px solid ${c.color}30`,
                      color: c.color,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase mb-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {c.label}
                    </p>
                    <p
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: "var(--muted-2)" }}
                    >
                      {c.value}
                    </p>
                  </div>
                </a>
              </FadeIn>
            ))}

            <FadeIn delay={0.35}>
              <div
                className="mt-4 p-5 rounded-xl"
                style={{
                  background: "var(--cyan-dim)",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--cyan)" }}
                >
                  Availability
                </p>
                <p className="text-sm" style={{ color: "var(--muted-2)" }}>
                  Currently available for{" "}
                  <strong style={{ color: "var(--foreground)" }}>
                    freelance projects
                  </strong>{" "}
                  and{" "}
                  <strong style={{ color: "var(--foreground)" }}>
                    full-time roles
                  </strong>
                  . Based in Accra — working globally.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Contact form */}
          <FadeIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor = "var(--cyan)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor = "var(--border-bright)")
                  }
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor = "var(--cyan)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor = "var(--border-bright)")
                  }
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) =>
                    ((e.target as HTMLTextAreaElement).style.borderColor = "var(--cyan)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLTextAreaElement).style.borderColor = "var(--border-bright)")
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg text-sm font-bold flex items-center justify-center gap-2 btn-primary"
                style={{ letterSpacing: "0.05em" }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} />
                    Opening Email Client...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Mail, ArrowUp } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded"
              style={{ background: "var(--cyan)", color: "#000" }}
            >
              BA
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Bright Amoani-Yeboah
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Frontend Developer · Founder
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/bright-amoani-yeboah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:bamoaniyeboah@gmail.com"
              aria-label="Email"
              className="transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright + scroll-to-top */}
          <div className="flex items-center gap-4">
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              © {new Date().getFullYear()} Bright&Devs. All rights reserved.
            </p>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)";
                (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

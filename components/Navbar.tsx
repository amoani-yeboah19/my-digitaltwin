"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? "rgba(5, 6, 15, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <span
            className="font-bold text-base tracking-tight"
            style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
          >
            bright<span style={{ color: "var(--cyan)" }}>.</span>dev
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--muted-2)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--cyan)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted-2)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/twin"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              background: "var(--cyan-dim)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "var(--cyan)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--cyan-dim)";
            }}
          >
            <Sparkles size={13} />
            Digital Twin
          </Link>
          <a
            href="#contact"
            className="hidden md:block text-xs font-bold px-4 py-2 rounded btn-primary"
            style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Hire Me
          </a>
          <button
            className="md:hidden p-1"
            style={{ color: "var(--muted-2)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(5, 6, 15, 0.97)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-1"
                  style={{ color: "var(--muted-2)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/twin"
                className="flex items-center gap-2 text-sm font-semibold py-1"
                style={{ color: "var(--cyan)" }}
                onClick={() => setMenuOpen(false)}
              >
                <Sparkles size={14} />
                Digital Twin
              </Link>
              <a
                href="#contact"
                className="text-xs font-bold px-4 py-2 rounded btn-primary inline-block text-center"
                style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
                onClick={() => setMenuOpen(false)}
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

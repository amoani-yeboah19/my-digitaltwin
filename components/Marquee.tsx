"use client";

const items = [
  "Frontend Development",
  "WordPress Expert",
  "Next.js",
  "React",
  "AI Solutions",
  "Agentic Engineering",
  "Fintech",
  "UI/UX",
  "TypeScript",
  "Mobile Apps",
  "Bright&Devs",
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{
        background: "var(--cyan)",
        borderTop: "none",
        borderBottom: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0",
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs font-bold tracking-widest uppercase"
            style={{
              color: "#000",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ opacity: 0.4, fontSize: "8px" }}>✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

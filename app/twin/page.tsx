import type { Metadata } from "next";
import TwinChat from "./TwinChat";

export const metadata: Metadata = {
  title: "Digital Twin — Bright Amoani-Yeboah",
  description:
    "Chat with Bright's AI Digital Twin. Ask about his career, skills, projects, and availability.",
};

export default function TwinPage() {
  return <TwinChat />;
}

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bright Amoani-Yeboah — Frontend Developer & Founder",
  description:
    "Frontend Developer, WordPress Expert, and Founder of Bright&Devs. Building modern web & mobile apps with AI-enhanced solutions from Accra, Ghana.",
  keywords: [
    "Frontend Developer",
    "WordPress Developer",
    "Next.js",
    "React",
    "Web Developer Ghana",
    "Bright Amoani-Yeboah",
  ],
  authors: [{ name: "Bright Amoani-Yeboah" }],
  openGraph: {
    title: "Bright Amoani-Yeboah — Frontend Developer & Founder",
    description: "Building modern web & mobile apps with AI-enhanced solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}

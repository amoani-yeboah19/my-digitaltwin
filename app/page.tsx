import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import TwinSection from "@/components/TwinSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DigitalTwin from "@/components/DigitalTwin";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Timeline />
        <Skills />
        <Portfolio />
        <TwinSection />
        <Contact />
      </main>
      <Footer />
      <DigitalTwin />
    </>
  );
}

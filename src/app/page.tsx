import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Playbook from "@/components/Playbook";
import Blog from "@/components/Blog";
import Now from "@/components/Now";
import Contact from "@/components/Contact";
import Particles from "@/components/Particles";
import LoadingScreen from "@/components/LoadingScreen";
import BackToTop from "@/components/BackToTop";
import SectionRail from "@/components/SectionRail";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <a href="#main" className="skip-link">Skip to content</a>
      <Particles />
      <Navbar />
      <SectionRail />
      {/* tabIndex -1 so the skip link actually moves focus here, not just the
          scroll position — otherwise a screen-reader user hears nothing move. */}
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Playbook />
        <Blog />
        <Now />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}

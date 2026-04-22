import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import ResearchAreas from "../sections/ResearchAreas";
import Papers from "../sections/Papers";
import PublicationsTimeline from "../sections/PublicationsTimeline";
import Career from "../sections/Career";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ResearchAreas />
      <Papers />
      <PublicationsTimeline />
      <Career />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
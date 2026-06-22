import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Marquee from './sections/Marquee';
import About from './sections/About';
import Leadership from './sections/Leadership';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  useLenis();

  return (
    <div className="bg-void min-h-[100dvh]">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

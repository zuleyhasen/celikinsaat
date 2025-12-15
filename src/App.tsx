import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import Vision from './components/sections/Vision';
import Projects from './components/sections/Projects';
import Why from './components/sections/Why';
import International from './components/sections/International';
import CTA from './components/sections/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <SmoothScroll>
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Vision />
          <Projects />
          <Why />
          <International />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;

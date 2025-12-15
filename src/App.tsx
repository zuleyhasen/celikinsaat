import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/sections/Hero';
import Vision from './components/sections/Vision';
import Projects from './components/sections/Projects';
import Why from './components/sections/Why';
import International from './components/sections/International';
import Contact from './components/sections/Contact';
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
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;

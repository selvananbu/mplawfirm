import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import FloatingContactFab from './components/FloatingContactFab';
import { useI18n } from './i18n/useI18n';

function MainShell() {
  const { locale } = useI18n();

  return (
    <AnimatePresence mode="wait">
      <Motion.div
        key={locale}
        role="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <TrustBar />
        <About />
        <PracticeAreas />
        <WhyChooseUs />
        <Testimonials />
        <ContactCTA />
        <Footer />
      </Motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [introReady, setIntroReady] = useState(false);
  const handleLoaderDone = useCallback(() => setIntroReady(true), []);

  useEffect(() => {
    document.body.style.backgroundColor = introReady ? '#ffffff' : '#070a0f';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [introReady]);

  return (
    <div
      className={`min-h-screen transition-colors duration-[680ms] ease-out ${
        introReady ? 'bg-white' : 'bg-navy-950'
      }`}
    >
      <PageLoader onExitComplete={handleLoaderDone} />
      <div
        className="relative min-h-screen"
        style={{ pointerEvents: introReady ? 'auto' : 'none' }}
      >
        <Navbar />
        <MainShell />
        <FloatingContactFab />
      </div>
    </div>
  );
}

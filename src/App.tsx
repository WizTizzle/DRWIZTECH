import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { HardDriveRecovery } from './pages/services/HardDriveRecovery';
import { SSDRecovery } from './pages/services/SSDRecovery';
import { RAIDRecovery } from './pages/services/RAIDRecovery';
import { FlashRecovery } from './pages/services/FlashRecovery';
import { ServerRecovery } from './pages/services/ServerRecovery';
import { RecoveryAssessment } from './components/RecoveryAssessment';
import { AssessmentProvider } from './contexts/AssessmentContext';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { SupportPage } from './pages/SupportPage';

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false, duration: 1.2 });
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      scrollToTop();
    }
  }, [location.pathname, scrollToTop]);

  return (
    <AssessmentProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/hard-drive" element={<HardDriveRecovery />} />
          <Route path="/services/ssd" element={<SSDRecovery />} />
          <Route path="/services/raid" element={<RAIDRecovery />} />
          <Route path="/services/flash" element={<FlashRecovery />} />
          <Route path="/services/server" element={<ServerRecovery />} />
          <Route path="/assessment" element={<RecoveryAssessment />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </Layout>
    </AssessmentProvider>
  );
}

export default App;
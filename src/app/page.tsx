'use client';

import { useEffect } from 'react';

import { scrollToSection } from '@/utils';

import Hero from '@/components/Hero';
import ScrollIndicatorButton from '@/components/ScrollIndicatorButton';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    if (document.getElementById(hash)) scrollToSection(hash);
    history.replaceState(null, '', '/');
  }, []);

  return (
    <>
      <Hero />
      <ScrollIndicatorButton />
      <About />
      <Skills />
      <Certifications />
      <Education />
      <Projects />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
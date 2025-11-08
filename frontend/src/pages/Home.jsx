// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Templates from '../components/Templates';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <About />
      <CTA />
      <Contact />
    </>
  );
};

export default Home;
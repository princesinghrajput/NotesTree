import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { Stats } from './Stats';
import { HowItWorks } from './HowItWorks';
// import { TrustedBy } from './TrustedBy';
import { FAQ } from './FAQ';
import { CTASection } from './CTASection';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const LandingPage = () => (
  <div className="min-h-screen bg-black">
    <Navbar />
    <Hero />
    {/* <TrustedBy /> */}
    <Features />
    <HowItWorks />
    <Stats />
    <Testimonials />
    <Pricing />
    <FAQ />
    <CTASection />
    <Footer />
  </div>
); 
import React, { useState, useEffect } from 'react';
import { LandingContainer } from '../styled/home/LandingPageStyles';
import About from './AboutSection';
import HeroSection from './HeroSection';
import Footer from './Footer';

const LandingPage = () => {
    return(
        <LandingContainer className="landing-wrapper">
            <HeroSection />
            <About />
            {/* <div>Testimonial Section here post launch</div>     */}
            <Footer />
        </LandingContainer>
    )
}

export default LandingPage;
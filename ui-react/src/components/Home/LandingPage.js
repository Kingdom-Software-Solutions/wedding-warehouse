import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HeroContainer, HeroImage, HeroText, HeroTextDiv, LandingContainer } from '../styled/LandingPageStyles';
import { Button } from '@material-ui/core';
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
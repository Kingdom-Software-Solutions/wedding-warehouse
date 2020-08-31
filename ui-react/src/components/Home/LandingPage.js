import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HeroContainer, HeroImage, HeroText, HeroTextDiv, LandingContainer } from '../styled/LandingPageStyles';
import { Button } from '@material-ui/core';
import About from './AboutSection';
import HeroSection from './HeroSection';

const LandingPage = () => {
    const history = useHistory()

    return(
        <LandingContainer className="landing-wrapper">
            <HeroSection />
            <About />
            {/* <div>Testimonial Section here post launch</div>     */}
            <footer>
                <div>Logo Here</div>
                <div>Social Icons Here</div>
                <button>Login | Signup</button>
            </footer>
        </LandingContainer>
    )
}

export default LandingPage;
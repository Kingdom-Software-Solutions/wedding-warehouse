import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HeroContainer, HeroImage, HeroText, HeroTextDiv, LandingContainer } from '../styled/LandingPageStyles';
import { Button } from '@material-ui/core';

const LandingPage = () => {
    const history = useHistory()

    return(
        <LandingContainer className="landing-wrapper">
            <HeroContainer className="hero-container">
                <HeroImage className="hero-img" src="https://images.unsplash.com/photo-1521459444000-c2192d774976?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="wedding aisle" />
                <HeroTextDiv className="hero-details" >
                <HeroText className="tag-line" >Facilitate the perfect day</HeroText>
                <Button className="hero-cta" 
                size="large"
                onClick={()=>{
                    history.push("/inventory")
                }}
                >Find Items</Button>
                </HeroTextDiv>
            </HeroContainer>
            <div>
                <h3>About Here</h3>
            </div>
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
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HeroContainer, HeroImage, HeroText, HeroTextDiv } from '../styled/home/LandingPageStyles';
import { Button } from '@material-ui/core';

const HeroSection = () => {
    const history = useHistory()

    return(
        <HeroContainer className="hero-container">
            <HeroImage className="hero-img" src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="wedding aisle" />
            <HeroTextDiv className="hero-details" >
            <HeroText className="tag-line" >Facilitate the perfect day</HeroText>
            <p>Browse through our inventory of beautiful wedding props and decor. Find all the items you need, schedulte the time you'll need them, and return them when you're through.</p>
            <Button className="hero-cta" 
            size="large"
            onClick={()=>{
                history.push("/inventory")
            }}
            >View Inventory</Button>
            </HeroTextDiv>
        </HeroContainer>
    );
};

export default HeroSection;
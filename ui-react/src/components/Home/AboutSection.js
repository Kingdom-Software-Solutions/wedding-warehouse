import React from 'react';
import { useHistory } from 'react-router-dom';
import { Logo } from '../component-library/logo';
import { Button } from '@material-ui/core';
import { AboutContainer } from '../styled/LandingPageStyles';

const About = () => {
    const history = useHistory();
    return(
        <AboutContainer id="about">
            <Logo />
            <h3>About</h3>
            <p>At Mel's Warehouse you'll find a plethora of high-quality wedding props and decor that suit just about any need. From centerpieces or chalk boards, we have it all... at a very affordable price.</p>
            <div>
                <h4>Quality Items</h4>
                <p>It's all about the details. Finding the right item makes all the difference. Some of our stock is even customizable.</p>
                <Button onClick={() => history.push("/inventory")}>View Inventory</Button>
            </div>
            <div>
                <h4>Affordable prices</h4>
                <p>Rent specific items you need at a reasonable price, instead of buying something you'll never need again.</p>
                <Button disabled>Shop By Price</Button>
            </div>
            {/* Uncomment after testimonials exist
            <div>
                <h4>Unbeatable Service</h4>
                <p>We believe our reputation speaks for itself. Read what our client's have to say about their experience with Mel's Warehouse</p>
                <Button disabled>Read More</Button>
            </div> */}
        </AboutContainer>
    );
};

export default About;
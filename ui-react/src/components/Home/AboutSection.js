import React from 'react';
import { useHistory } from 'react-router-dom';
import { Logo } from '../component-library/logo';
import { Button } from '@material-ui/core';
import { AboutContainer, SubSectionDiv, AboutTitle, AboutText, SectionTitleDiv, FeatureBox, FeatureTitle, FeatureText } from '../styled/home/AboutStyles';
import GradeIcon from '@material-ui/icons/Grade';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';

const About = () => {
    const history = useHistory();
    return(
        <AboutContainer id="about">
            <SectionTitleDiv>
                <Logo className="logo-about" />
                <AboutTitle>About</AboutTitle>
                <AboutText>At Mel's Warehouse you'll find a plethora of high-quality wedding props and decor that suit just about any need. From centerpieces or chalk boards, we have it all... at a very affordable price.</AboutText>
            </SectionTitleDiv>
            <SubSectionDiv>
                <FeatureBox>
                    <GradeIcon style={{ fontSize: 40 }}  />
                    <FeatureTitle>Quality Items</FeatureTitle>
                    <FeatureText>It's all about the details and finding the right item makes all the difference. Some of our stock is even customizable.</FeatureText>
                    <Button className="about-cta" onClick={() => history.push("/inventory")}>View Inventory</Button>
                </FeatureBox>
                <FeatureBox>
                    <AttachMoneyOutlinedIcon style={{ fontSize: 40 }} />
                    <FeatureTitle>Affordable prices</FeatureTitle>
                    <FeatureText>Rent specific items you need at a reasonable price, instead of buying something you'll never need again.</FeatureText>
                    <Button className="about-cta" disabled>Shop By Price</Button>
                </FeatureBox>
                {/* Uncomment after testimonials exist
                <div>
                    <h4>Unbeatable Service</h4>
                    <EmojiEmotionsSharpIcon />
                    <p>We believe our reputation speaks for itself. Read what our client's have to say about their experience with Mel's Warehouse</p>
                    <Button disabled>Read More</Button>
                </div> */}
            </SubSectionDiv>
        </AboutContainer>
    );
};

export default About;
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@material-ui/core';
import { Logo } from '../component-library/logo';
import { StyledFooter, FooterContainer, SocialDiv } from '../styled/home/FooterStyles';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    const { authState, authService } = useOktaAuth();
    const login = () => authService.login("/inventory")

    return(
        <FooterContainer>
            <StyledFooter>
                <Logo />
                <SocialDiv>
                    <InstagramIcon />
                </SocialDiv>
                <Button className="okta-cta" onClick={login}>Login | Signup</Button>
            </StyledFooter>
        </FooterContainer>
    );
};

export default Footer;
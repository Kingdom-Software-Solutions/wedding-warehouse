import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@material-ui/core';

// styles
import { NavContainer, NavWrapper, NavTitle , StyledLink} from './styled/NavStyles';
import { Logo } from './component-library/logo';

// IF YOU DISCOVER YOU NEED TO SIGN USERS OUT OF OKTA, REFERENCE HERE: https://developer.okta.com/docs/guides/sign-users-out/react/sign-out-of-okta/

// WHEN USERS LOGIN, FIND THEM BY GETTING FROM "USERNAME" IN DB

const NavBar = () => {
    console.log('okta hook', useOktaAuth)
    const history = useHistory();
    const { authState, authService } = useOktaAuth();
    const login = () => authService.login("/inventory")
    const logout = async () => {
        authService.logout('/');
    };

    return(
        <NavContainer>
            <Logo />
            <NavWrapper>
                <StyledLink href="/">Home</StyledLink>
                <StyledLink href="#about">About</StyledLink>
                <StyledLink href="/inventory">Inventory</StyledLink>
            </NavWrapper>
                {/* Need a better way to verify a user is logged in */}
                { authState.isPending ?
                    <div>Loading authentication</div>
                :
                ( !authState.isAuthenticated ? 
                    <div>
                        <Button onClick={login}>Login | Signup</Button>
                    </div>
                    :
                    <>
                    <StyledLink href="/profile">Profile</StyledLink>
                    <Button onClick={logout}>Logout</Button>
                    </>
                )
                }
        </NavContainer>
    )
}

export default NavBar; 
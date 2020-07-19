import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { AuthBtn } from '../components/material-ui/AuthBtn';

// styles
import { NavContainer, NavWrapper, NavTitle , StyledLink} from './styled/NavStyles';

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
            <NavTitle onClick={()=> history.push("/")}>Mel's 👰 Warehouse</NavTitle>
            <NavWrapper>
                <StyledLink href="/">Home</StyledLink>
                <StyledLink href="/inventory">Inventory</StyledLink>
                {/* Need a better way to verify a user is logged in */}
                { authState.isPending ?
                    <div>Loading authentication</div>
                :
                ( !authState.isAuthenticated ? 
                    <div>
                        <AuthBtn onClick={login}>Login/Register</AuthBtn>
                    </div>
                    :
                    <>
                    <StyledLink href="/profile">Profile</StyledLink>
                    <AuthBtn onClick={logout}>Logout</AuthBtn>
                    </>
                )
                }
            </NavWrapper>
        </NavContainer>
    )
}

export default NavBar; 
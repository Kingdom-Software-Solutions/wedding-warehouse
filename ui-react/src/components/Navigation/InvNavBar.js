import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@material-ui/core';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import { Logo } from '../component-library/logo';
import { StyledLink } from '../styled/NavStyles';

const InvNav = () => {
    const history = useHistory();
    const { authState, authService } = useOktaAuth();
    const login = () => authService.login("/inventory")
    const logout = async () => {
        authService.logout('/');
    };
    return(
        <div>
            <a href="/">
                <Logo  />
            </a>
            <ShoppingCartSharpIcon />
                {/* Need a better way to verify a user is logged in */}
                { authState.isPending ?
                    <div>Loading authentication</div>
                :
                ( !authState.isAuthenticated ? 
                    <div>
                        <Button className="okta-cta" onClick={login}>Login | Signup</Button>
                    </div>
                    :
                    <>
                    <StyledLink href="/profile">Profile</StyledLink>
                    <Button className="okta-cta" onClick={logout}>Logout</Button>
                    </>
                )
                }
        </div>
    );
};

export default InvNav;
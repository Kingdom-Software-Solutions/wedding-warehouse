import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@material-ui/core';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Badge from '@material-ui/core/Badge';
import { Logo } from '../component-library/logo';
import { StyledLink } from '../styled/navigation/NavStyles';
import { InvNavContainer, UserActionDiv, LogoDiv } from '../styled/navigation/InvNavStyles';
import Cart from './Cart';



const InvNav = () => {
    const history = useHistory();
    const [openCart, setOpenCart] = useState(false)
    const { authState, authService } = useOktaAuth();
    const login = () => authService.login("/inventory")
    const logout = async () => {
        authService.logout('/');
    };

    const handleOpenCart = e => {
        e.preventDefault();
        setOpenCart(true)
    }
    return(
        <InvNavContainer>
            <LogoDiv onClick={() => history.push("/")}>
                <Logo  />
            </LogoDiv>
            <UserActionDiv>
            {openCart ?
                <Cart openCart={openCart} setOpenCart={setOpenCart} />
                :
                <Badge badgeContent={0} color="primary">
                    <ShoppingCartSharpIcon
                    className="cart-icon"
                    onClick={handleOpenCart} />
                </Badge>
            }
                {/* Need a better way to verify a user is logged in? */}
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
            </UserActionDiv>
        </InvNavContainer>
    );
};

export default InvNav;
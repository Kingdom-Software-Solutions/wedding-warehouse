import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@material-ui/core';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Badge from '@material-ui/core/Badge';
import { Logo } from '../component-library/logo';
import {ProfileNavContainer, LinksDiv, StyledLink, UserActionDiv, LogoDiv, CartDiv } from '../styled/navigation/ProfileNavStyles';
import Cart from './Cart';
import { cartReducer } from '../../redux/reducers/cartReducer';



const ProfileNav = () => {
    const history = useHistory();
    const badgeCount = useSelector(state => state.cartReducer.items.length)
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

    // component uses recyled inventory navigation styles
    return(
        <ProfileNavContainer>
            <LogoDiv onClick={() => history.push("/")}>
                <Logo  />
            </LogoDiv>
            <UserActionDiv>
                <LinksDiv>
                    <Button className="okta-cta" href="/">Home</Button>
                    <Button className="okta-cta" href="/inventory">Inventory</Button>
                </LinksDiv>
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
                        <Button className="okta-cta" onClick={logout}>Logout</Button>
                        </>
                    )
                    }
                <CartDiv>
                {openCart ?
                <Cart className="cart-icon" openCart={openCart} setOpenCart={setOpenCart} />
                :
                <Badge badgeContent={badgeCount} color="primary">
                    <ShoppingCartSharpIcon
                    className="cart-icon"
                    onClick={handleOpenCart} />
                </Badge>
                }
                </CartDiv>
            </UserActionDiv>
        </ProfileNavContainer>
    );
};

export default ProfileNav;
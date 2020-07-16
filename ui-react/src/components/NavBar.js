import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { AuthBtn } from '../components/material-ui/AuthBtn';

// styles
import { NavContainer, NavWrapper, NavTitle , StyledLink} from './styled/NavStyles';

const NavBar = () => {
    const history = useHistory();
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userId');
        history.push('/');
      };

    return(
        <NavContainer>
            <NavTitle>Mel's 👰 Warehouse</NavTitle>
            <NavWrapper>
                <StyledLink href="/">Home</StyledLink>
                <StyledLink href="/inventory">Inventory</StyledLink>
                {/* Need a better way to verify a user is logged in */}
                {!!localStorage.getItem("token") ? 
                <AuthBtn onClick={logout}>Logout</AuthBtn>
                :
                <>
                <StyledLink href="/login">Log In</StyledLink>
                <StyledLink href="/register">Sign Up</StyledLink>
                </>
                }
            </NavWrapper>
        </NavContainer>
    )
}

export default NavBar; 
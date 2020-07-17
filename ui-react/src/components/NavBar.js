import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { AuthBtn } from '../components/material-ui/AuthBtn';

// styles
import { NavContainer, NavWrapper, NavTitle , StyledLink} from './styled/NavStyles';

const NavBar = () => {
    const history = useHistory();
    const { loginWithRedirect } = useAuth0(); // Auth0 login hook
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userId');
        history.push('/');
      };

    return(
        <NavContainer>
            <NavTitle onClick={()=> history.push("/")}>Mel's 👰 Warehouse</NavTitle>
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
                {/* Will replace normal login/signup when configured */}
                <AuthBtn onClick={()=>{
                loginWithRedirect();
                }}>Auth0 Log In</AuthBtn>
                </>
                }
            </NavWrapper>
        </NavContainer>
    )
}

export default NavBar; 
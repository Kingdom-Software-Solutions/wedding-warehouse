import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { AuthBtn } from '../components/material-ui/AuthBtn';

// styles
import { NavContainer, NavWrapper, NavTitle , StyledLink} from './styled/NavStyles';

const NavBar = () => {
    const history = useHistory();
    const { authState, authService } = useOktaAuth();
    const login = () => authService.login("/inventory")

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
                        <AuthBtn onClick={login}>Login</AuthBtn>
                    </div>
                    :
                    null
                )
                }
            </NavWrapper>
        </NavContainer>
    )
}

export default NavBar; 
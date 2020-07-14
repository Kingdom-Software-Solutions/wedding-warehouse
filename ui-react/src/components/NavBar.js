import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { AuthBtn } from '../components/material-ui/AuthBtn'

const NavBar = () => {
    const history = useHistory();
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userId');
        history.push('/');
      };

    return(
        <nav>
            <h1>Mel's Wedding Warehouse</h1>
            <Link to="/">
                <HomeIcon />
            </Link>
            <Link to="/inventory">Inventory</Link>
            {/* Need a better way to verify a user is logged in */}
            {!!localStorage.getItem("token") ? 
            <AuthBtn onClick={logout}>Logout</AuthBtn>
            :
            <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
            </>
            }
        </nav>
    )
}

export default NavBar; 
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const NavBar = () => {

    return(
        <nav>
            <h1>Mel's Wedding Warehouse</h1>
            <Link to="/">
                <HomeIcon />
            </Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
        </nav>
    )
}

export default NavBar; 
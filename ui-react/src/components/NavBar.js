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
        </nav>
    )
}

export default NavBar; 
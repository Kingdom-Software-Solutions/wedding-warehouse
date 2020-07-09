import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return(
        <nav>
            <h1>Mel's Wedding Warehouse</h1>
            <Link to="/inventory">Inventory</Link>
        </nav>
    )
}

export default NavBar; 
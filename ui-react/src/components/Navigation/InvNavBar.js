import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@material-ui/core';
import { Logo } from '../component-library/logo';

const InvNav = () => {
    return(
        <div>
            <Logo />
            <div>Inventory Nav</div>
            <div>Cart Component</div>
        </div>
    );
};

export default InvNav;
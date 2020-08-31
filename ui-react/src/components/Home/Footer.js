import React from 'react';
import { useHistory } from 'react-router-dom';
import { Logo } from '../component-library/logo';

const Footer = () => {
    return(
        <footer>
            <Logo />
            <div>Social Icons Here</div>
            <button>Login | Signup</button>
        </footer>
    );
};

export default Footer;
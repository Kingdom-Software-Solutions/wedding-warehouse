import React from 'react';
import Profile from '../Users/AuthOProfile';
import OktaProfile from '../Users/OktaProfile';
// SHOULD THIS JUST BE AN INVENTORY PAGE?

const LandingPage = () => {

    return(
        <div>
            <h1>🚧 Landing Page 🚧</h1>
            {/* WILL BE MOVED TO ITS OWN ROUTE
            ONLY HERE FOR VISIBILITY */}
            {/* <Profile /> */}
            <OktaProfile />
        </div>
    )
}

export default LandingPage;
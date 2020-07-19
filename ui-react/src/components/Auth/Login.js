import React, { useState, useEffect } from 'react';
// commented to clean build log of warnings, 
// might be able to yeet this file/component
// import { Redirect } from 'react-router-dom';
// import OktaSignInWidget from './OktaSignInWidget';
// import { useOktaAuth } from '@okta/okta-react';


const Login = () => {
    // const { authState, authService } = useOktaAuth();
    // const [ userInfo, setUserInfo ] = useState(null);
    
    return(
        <>
        <div>Work in progress <span role="img" aria-label="construction-worker">👷🏾‍♂️</span></div>
        <form >

        <div className="form-element">
          <label>Username:</label>
          <input
            id="username"
            type="text"

          />
        </div>

        <div className="form-element">
          <label>Password:</label>
          <input
            id="password"
            type="password"

          />
        </div>
        <input id="submit" type="submit" value="Submit" />
      </form>
      </>
    )
};

export default Login;

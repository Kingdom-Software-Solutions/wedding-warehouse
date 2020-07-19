import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';


const Login = () => {
    const { authState, authService } = useOktaAuth();
    const [ userInfo, setUserInfo ] = useState(null);
    console.log(authService)
    return(
        <>
        <div>Work in progress 👷🏾‍♂️</div>
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

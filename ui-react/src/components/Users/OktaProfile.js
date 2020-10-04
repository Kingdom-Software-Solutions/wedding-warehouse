import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { parseJwt } from '../../utils/parseJwt';

const OktaProfile = () => { 
    
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // parse the token to get the scoped information
      authService.getAccessToken()
      .then((token) => {
          let user = parseJwt(token)
          setUserInfo(user) 
      });
    }
  }, [authState, authService]); // Update if authState changes

  console.log(`This user: ${userInfo}`)
  // add an action to get this users reservations
  
  return (
    <div>
      { userInfo && 
        <div>
          <p>Welcome back, {userInfo.name}!</p>
          <div>This page is still a work in progress. In the meantime, take a look at what's in stock <a href="/inventory">here</a>!
          </div>
        </div>
      }
    </div>
  );
};

export default OktaProfile;
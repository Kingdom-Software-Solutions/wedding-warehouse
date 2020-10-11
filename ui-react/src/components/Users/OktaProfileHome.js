import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { parseJwt } from '../../utils/parseJwt';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from '../Navigation/NavBar';
import { ProfileContainer } from '../styled/profile/ProfileMainStyles';
import ProfileEdit from './OktaProfileEdit';

const OktaProfile = () => { 
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false)

  const toggleEdit = () => {
    setShowEdit(!showEdit)
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      // parse the token to get the scoped information
      authService.getIdToken()
      .then((token) => {
          let user = parseJwt(token)
          console.log(user)
          setUserInfo(user) 
      });
    }
  }, [authState, authService]); // Update if authState changes

  console.log(`This user: ${userInfo}`, userInfo)
  // edit profile component handled with state
  // route to my reservations page
  
  return (
    <div>
      {/* create another navigation component for profile */}
      <NavBar />
      { userInfo ?
        <ProfileContainer>
          <div className="sidebar">
            <span>Put navigations to sub profile pages here</span>
            <a href="/profile">My Profile</a>
            <a href="#">My Reservations</a>
          </div> 
          
          {!showEdit ?
            // {/* pull this into its own component? 👇 */}
            <div>
              <p>Welcome back, {userInfo.first_name}!</p>
              <div>This page is still a work in progress. In the meantime, take a look at what's in stock <a href="/inventory">here</a>!
              </div>
              <button onClick={()=> toggleEdit()}>Edit Profile</button>
            </div>
          :
          // dont forget to pass down boolean state (showEdit)
            <ProfileEdit toggle={toggleEdit}  showEdit={showEdit} />
          }
        </ProfileContainer>
        :
        <CircularProgress />
      }
    </div>
  );
};

export default OktaProfile;
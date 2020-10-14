import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { parseJwt } from '../../utils/parseJwt';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from '../Navigation/NavBar';
import { ProfileContainer, Sidebar } from '../styled/profile/ProfileMainStyles';
import ProfileEdit from './OktaProfileEdit';
import ProfileSideDrawer from './ProfileSideDrawer';
import InvNav from '../Navigation/InvNavBar';
import ProfileNav from '../Navigation/ProfileNavBar';

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
    <>
      <ProfileNav />
      { userInfo ?
        <ProfileContainer> 
          <Sidebar className="sidebar">
            <ProfileSideDrawer />
          </Sidebar> 
          
          {!showEdit ?
            // {/* pull this into its own component? 👇 */}
            <div>
              <p>Welcome, {userInfo.first_name}!</p>
              <p>It's great to see you, take a look at your past, current or upcoming reservations by clicking "My Reservations". Or take a look at what we have for your event <a href="/inventory">here</a>!
              </p>
              {/* UNCOMMENT IF WORKING ON OKTA STRETCH */}
              {/* <button onClick={()=> toggleEdit()}>Edit Profile</button> */}
            </div>
          :
          // dont forget to pass down boolean state (showEdit)
            <ProfileEdit toggle={toggleEdit}  showEdit={showEdit} />
          }
        </ProfileContainer>
        :
        <CircularProgress />
      }
    </>
  );
};

export default OktaProfile;
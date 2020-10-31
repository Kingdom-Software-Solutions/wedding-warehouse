import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Route } from "react-router";
import { parseJwt } from '../../utils/parseJwt';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProfileContainer, Sidebar } from '../styled/profile/ProfileMainStyles';
import ProfileEdit from './OktaProfileEdit';
import ProfileSideDrawer from './ProfileSideDrawer';
import ProfileNav from '../Navigation/ProfileNavBar';
import ProfileDetails from './ProfileDetails';
import UpcomingReservations from './ProfileUpcomingReservations';
import PastReservations from './ProfilePastReservations';
import ProfileFavorites from './ProfileFavorites';
import ProfileAdmin from './ProfileAdmin';

const OktaProfile = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showHome, setShowHome] = useState(true) // needs to be like this unfortunately
  const [showUpcoming, setShowUpcoming] = useState(false)
  const [showPast, setShowPast] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [superUser, setSuperUser] = useState(false)
  

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
          setSuperUser(user.SuperUser)
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
            <ProfileSideDrawer
            admin={superUser}
            setHome={setShowHome}
            setUpcoming={setShowUpcoming} 
            />
          </Sidebar>
          {showHome ?
            <ProfileDetails userInfo={userInfo} />
          :
            null
          }
          {showUpcoming ? 
            <UpcomingReservations userInfo={userInfo} />
          :
            null
          }
          {showPast ? 
            <PastReservations userInfo={userInfo} />
          :
            null
          }
          {/* Uncomment when favorite functionality is built */}
          {/* {showFavorites ? 
            <ProfileFavorites userInfo={userInfo} />
          :
            null
          } */}
          {showAdmin ? 
            <ProfileAdmin userInfo={userInfo} />
          :
            null
          }
          
        </ProfileContainer>
        :
        <CircularProgress />
      }
    </>
  );
};

export default OktaProfile;
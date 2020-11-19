import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Route, withRouter } from "react-router";
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
            />
          </Sidebar>
          {/* Use SecureRoute after I get this working */}
          <ProfileDetails userInfo={userInfo} />
          {/* <Route path={"/"} exact component={<ProfileDetails userInfo={userInfo} />} /> */}
          <Route path={"/-/upcoming-reservations"}>
            <UpcomingReservations userInfo={userInfo} />
          </Route>
          <Route path={"/reservation-history"}>
            <PastReservations userInfo={userInfo} />
          </Route>
          <Route path={"/favorites"}>
            <ProfileFavorites userInfo={userInfo} />
          </Route>
          <Route path={"/admin"}>
            <ProfileAdmin userInfo={userInfo} />
          </Route>
        </ProfileContainer>
        :
        <CircularProgress />
      }
    </>
  );
};

export default OktaProfile;
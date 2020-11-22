import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from 'react-router-dom';
import { parseJwt } from '../../utils/parseJwt';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProfileContainer, Sidebar } from '../styled/profile/ProfileMainStyles';
import ProfileEdit from './OktaProfileEdit';
import ProfileNav from '../Navigation/ProfileNavBar';
import ProfileDetails from './ProfileDetails';
import UpcomingReservations from './ProfileUpcomingReservations';
import PastReservations from './ProfilePastReservations';
import ProfileFavorites from './ProfileFavorites';
import ProfileAdmin from './admin/ProfileAdmin';

const OktaProfile = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [superUser, setSuperUser] = useState(false);

  let { path, url } = useRouteMatch()
  

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
            <Link to={`${url}`}>Profile</Link>
            <Link to={`${url}/future-reservations`}>Future Reservations</Link>
            <Link to={`${url}/past-reservations`}>Past Reservations</Link>
            {/* should always be the bottom link */}
            {superUser ? 
              <Link to={`${url}/admin`}>Admin</Link>
            :
              null
            }
            
          </Sidebar>
          <Switch>
            <Route exact path={path}>
              <ProfileDetails userInfo={userInfo} />
            </Route>
            <Route path={`${path}/future-reservations`}>
              <UpcomingReservations userInfo={userInfo} />
            </Route>
            <Route path={`${path}/past-reservations`}>
              <PastReservations userInfo={userInfo} />
            </Route>
            {/* should always be the bottom link */}
            <Route path={`${path}/admin`}>
              <ProfileAdmin userInfo={userInfo} />
            </Route>
          </Switch>
        </ProfileContainer>
        :
        <CircularProgress />
      }
    </>
  );
};

export default OktaProfile;
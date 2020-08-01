import React, { useEffect } from 'react';
import { Route } from "react-router";
import { parseJwt } from './utils/parseJwt';
import './App.css';
import { LoginCallback, SecureRoute, useOktaAuth } from '@okta/okta-react';
// secure route eliminates the need for Private Route
import NavBar from './components/NavBar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import LandingPage from './components/Home/LandingPage';
import InventoryPage from './components/Inventory/InventoryPage';
import ItemPage from './components/Inventory/ItemPage';
import AddInventory from './components/Inventory/AddInventory';
import OktaProfile from './components/Users/OktaProfile';

function App() {
  const { authState, authService } = useOktaAuth();
  // set active user when app mounts
  useEffect(()=>{
    authService.getAccessToken().then(access => console.log("access token", parseJwt(access)))
  }, [authState.accessToken]);

  // console.log("parsed json", parseJwt())
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/">
        <LandingPage />
      </Route>
      {/* Okta Path */}
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/inventory" component={InventoryPage} />
      {/* Uncomment when auth flow works */}
      {/* <SecureRoute exact path="/inventory/addItem" component={AddInventory} /> */}
      <Route exact path="/inventory/addItem">
        <AddInventory />
      </Route>
      <Route exact path="/inventory/item/:id">
        <ItemPage />
      </Route>
      <SecureRoute exact path="/profile" component={OktaProfile} />
    </div>
  );
}

export default App;

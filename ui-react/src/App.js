import React, { useEffect } from 'react';
import { Route } from "react-router";
import { parseJwt } from './utils/parseJwt';
import './App.css';
// secure route eliminates the need for Private Route!!
import { LoginCallback, SecureRoute, useOktaAuth } from '@okta/okta-react';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import LandingPage from './components/Home/LandingPage';
import InventoryPage from './components/Inventory/InventoryPage';
import ItemPage from './components/Inventory/ItemPage';
import AddInventory from './components/Inventory/AddInventory';
import OktaProfile from './components/Users/OktaProfileHome';
import Checkout from './components/Inventory/reservations/Checkout';
import { AppWrapper } from './components/styled/AppStyles';
import UpcomingReservations from './components/Users/ProfileUpcomingReservations';

function App() {
  // for Route, can't use exact with nested routes?
  return (
    <AppWrapper className="App">
      <Route exact path="/" component={LandingPage} />
      {/* Okta Path 👇 */}
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/inventory" component={InventoryPage} />
      <SecureRoute exact path="/inventory/addItem" component={AddInventory} />
      <Route exact path="/inventory/item/:id" component={ItemPage} />
      <Route path="/checkout" component={Checkout} />
      <SecureRoute path="/profile" component={OktaProfile} />
    </AppWrapper>
  );
}

export default App;

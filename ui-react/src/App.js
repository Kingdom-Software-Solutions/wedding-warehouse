import React from 'react';
import { Route } from "react-router";
import './App.css';
import NavBar from './components/NavBar';
import LandingPage from './components/Home/LandingPage';
import InventoryPage from './components/Inventory/InventoryPage';
import ItemPage from './components/Inventory/ItemPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/inventory">
        <InventoryPage />
      </Route>
      <Route path="/inventory/:id">
        <ItemPage />
      </Route>
    </div>
  );
}

export default App;

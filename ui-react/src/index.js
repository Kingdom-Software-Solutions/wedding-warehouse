import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorker from './serviceWorker';

// If you are using a custom domain with Auth0, the value of the domain prop is the value of your custom domain instead of the value reflected in the "Settings" tab. <= in Auth0

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0Provider
          domain="kss-wedding-warehouse.us.auth0.com"
          clientId="Fh4cxtgUlxUE4KCCLSaYm9qDMXUke19z"
          redirectUri={window.location.origin}
          // Audience is the identifer of the API set up through AUTH0
          audience="https://mels-warehouse-auth"
          scope="read:current_user update:current_user_metadata"
        >
          <App />
        </Auth0Provider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

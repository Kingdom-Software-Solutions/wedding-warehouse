import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Security } from '@okta/okta-react';
import { configOkta } from './okta/config-okta';
import * as serviceWorker from './serviceWorker';

const config = configOkta;


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
          <PersistGate persistor={persistor}>
            <Security {...config}>
              <App />
            </Security>
          </PersistGate>
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

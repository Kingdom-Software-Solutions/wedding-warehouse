const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID
const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN
const CALLBACK_PATH = '/implicit/callback';

// need to figure out if I need to set the host dynamically

export const configOkta = {
    clientId: `${CLIENT_ID}`,
    issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `http://localhost:8080/${CALLBACK_PATH}`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  };
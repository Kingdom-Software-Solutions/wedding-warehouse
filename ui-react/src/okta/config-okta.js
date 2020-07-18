const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID
const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN

export const configOkta = {
    clientId: `${CLIENT_ID}`,
    issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  };
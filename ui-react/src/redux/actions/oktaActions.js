import { axiosWithOkta } from '../../utils/axiosWithOkta';
// VERY IMPORTANT: Use the POST method for partial updates. Unspecified properties are set to null with PUT.
// update user information
export const OKTA_UPDATE_START = 'OKTA_UPDATE_START';
export const OKTA_UPDATE_SUCCESS = 'OKTA_UPDATE_SUCCESS';
export const OKTA_UPDATE_FAILURE = 'OKTA_UPDATE_FAILURE';

export const updateUserProfile = (updates) => dispatch => {
    // example profile object:
    ```
    {
        "profile": {
          "login": "isaac.brock@example.com",
          "firstName": "Isaac",
          "lastName": "Brock",
          "nickName": "issac",
          "displayName": "Isaac Brock",
          "email": "isaac.brock@example.com",
          "secondEmail": "isaac@example.org",
          "profileUrl": "http://www.example.com/profile",
          "preferredLanguage": "en-US",
          "userType": "Employee",
          "organization": "Okta",
          "title": "Director",
          "division": "R&D",
          "department": "Engineering",
          "costCenter": "10",
          "employeeNumber": "187",
          "mobilePhone": "+1-555-415-1337",
          "primaryPhone": "+1-555-514-1337",
          "streetAddress": "301 Brannan St.",
          "city": "San Francisco",
          "state": "CA",
          "zipCode": "94107",
          "countryCode": "US"
        }
      }
    ```
    dispatch({type: OKTA_UPDATE_START});
    // there are a few endpoints we could use, depends on if they need to crud credentials or not. At first I say no and will go with the current user endpoint
    axiosWithOkta().post("api/v1/users/me", updates)
    .then(res => {
        console.log(`Updated user response: ${res}`)
        dispatch({type: OKTA_UPDATE_SUCCESS});
    })
    .catch(error =>{
        console.log(`Update User Error: ${error}`);
        dispatch({type: OKTA_UPDATE_FAILURE});
    })
};
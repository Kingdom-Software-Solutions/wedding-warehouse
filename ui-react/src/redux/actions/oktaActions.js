import { axiosWithOkta } from '../../utils/axiosWithOkta';
// VERY IMPORTANT: Use the POST method for partial updates. Unspecified properties are set to null with PUT. DO NOT USE PUT UNLESS YOU KNOW WHAT YOU'RE DOING
// update user information
export const OKTA_UPDATE_START = 'OKTA_UPDATE_START';
export const OKTA_UPDATE_SUCCESS = 'OKTA_UPDATE_SUCCESS';
export const OKTA_UPDATE_FAILURE = 'OKTA_UPDATE_FAILURE';

export const updateUserProfile = (updates) => dispatch => {

    dispatch({type: OKTA_UPDATE_START});
    // there are a few endpoints we could use, depends on if they need to crud credentials or not. At first I say no and will go with the current user endpoint in the okta docs
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
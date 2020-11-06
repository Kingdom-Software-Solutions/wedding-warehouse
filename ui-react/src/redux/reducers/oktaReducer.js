import {
    OKTA_UPDATE_START,
    OKTA_UPDATE_SUCCESS,
    OKTA_UPDATE_FAILURE
} from '../actions/oktaActions';

const initialState = {
    isUpdating: false
}

export const oktaReducer = (state = initialState, action) =>{
    switch (action.type) {
        default:
          return state
    }    
}
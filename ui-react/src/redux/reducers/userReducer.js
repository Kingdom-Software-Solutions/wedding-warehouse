// This reducer handles user state
import {
    SET_ERROR,
    REGISTER_USER,
    REGISTER_FAILED,
    USER_CREATED,
    USER_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    // GET_USER,
    // GET_USER_SUCCESS,
    // GET_USER_FAILURE,
    // UPDATE_USER,
    // UPDATE_USER_SUCCESS,
    // UPDATE_USER_FAILURE,
    // DEL_USER,
    // USER_DELETED,
} from '../actions/userActions'
import { initialState } from './userInitialState';

export const userReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: "Oof, something went wrong!"
            };
        case REGISTER_USER:
            return {
                ...state,
                isPosting: true
            }
        case USER_CREATED:
            return {
                ...state,
                activeUserId: action.payload,
                isPosting: false,
            };
        case REGISTER_FAILED:
            return {
                ...state,
                error: "Registration failed",
                isPosting: false
            };
        case USER_LOGIN:
            return {
                ...state,
                isPosting: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                activeUserId: action.payload,
                isPosting: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: "Error logging in 😬",
                isPosting: false
            }
        default:
          return state
    }    
}
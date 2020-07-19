// import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { axiosWithEnv } from '../../utils/axiosWithEnv';

// error
export const SET_ERROR = 'SET_ERROR';

// register user actions
export const REGISTER_USER = 'REGISTER_USER';
export const USER_CREATED = 'USER_CREATED';
export const REGISTER_FAILED = 'REGISTER_FAILED'

export const registerUser = credentials => dispatch => {
    dispatch({ type: REGISTER_USER });
    axiosWithEnv().post('/api/auth/register', credentials)
    .then(res => {
        console.log('Register Response', res);
        dispatch({ type: USER_CREATED, payload: res.data.id })
        // dispatch get user by id and save that user to state?
    })
    .catch(error => {
        console.log('ERROR', error);
        dispatch({ type: REGISTER_FAILED })
    });
};
// log user in
export const USER_LOGIN = 'USER_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginUser = credentials => dispatch => {
    dispatch({ type: USER_LOGIN });
    axiosWithEnv().post('/api/auth/login', credentials)
    .then(res => {
        console.log('Login Response', res.data);
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userId", res.data.id)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.id })
        // dispatch get user by id and save active user to state?
        // storing it and state will keep it from breaking with funky storage from other sites and can return isAdmin?
    })
    .catch(error => {
        console.log('ERROR', error);
        dispatch({ type: LOGIN_FAILURE })
    });
};

// get user
export const GET_USER = 'GET_USER_DATA';
export const GET_USER_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_DATA_FAILURE';

// update user
export const UPDATE_USER = 'UPDATE_USER_DATA';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_DATA_FAILURE';

// delete user
export const DEL_USER = 'DEL_USER';
export const USER_DELETED = 'USER_DELETED';
// add user favorites
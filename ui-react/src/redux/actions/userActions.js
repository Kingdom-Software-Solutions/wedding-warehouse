import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { axiosWithEnv } from '../../utils/axiosWithEnv';

// error
export const SET_ERROR = 'SET_ERROR';

// register user actions
export const POST_USER = 'POST_USER';
export const USER_CREATED = 'USER_CREATED';

// log user in
export const USER_LOGIN = 'USER_LOGIN';
export const LOGGED_IN= 'LOGGED_IN';

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
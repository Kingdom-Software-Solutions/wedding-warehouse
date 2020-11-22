import { axiosWithEnv } from "../../utils/axiosWithEnv";

// reserve an item
export const RESERVE_ITEM_START = 'RESERVE_ITEM_START';
export const RESERVE_ITEM_SUCCESS = 'RESERVE_ITEM_SUCCESS';
export const RESERVE_ITEM_FAILURE = 'RESERVE_ITEM_FAILURE';

export const reserveItems = (newReservation) => dispatch =>{
    dispatch({ type: RESERVE_ITEM_START });
    axiosWithEnv().post('/api/reservations', newReservation)
    .then(res => {
        dispatch({ type: RESERVE_ITEM_SUCCESS, payload: newReservation });        
    })
    .catch(err => {
        dispatch({ type: RESERVE_ITEM_FAILURE });        
    })
};

// set reservation dates
export const SET_DATES = 'SET_DATES';

export const setReserveDates = (reserveStart, reserveEnd) => dispatch => {
    // pass this action an object of start and end dates
    const daterange ={ start: reserveStart , end: reserveEnd }
    dispatch({ type: SET_DATES, payload: daterange });
}

// check item availability
export const CHECK_AVAILABILITY_START = 'CHECK_AVAILABILITY_START';
export const CHECK_AVAILABILITY_SUCCESS = 'CHECK_AVAILABILITY_SUCCESS';
export const CHECK_AVAILABILITY_FAILURE = 'CHECK_AVAILABILITY_FAILURE';

export const checkAvailability = (dateStart, dateEnd) => dispatch => {
    const daterange = {
        rentDate: dateStart,
        returnDate: dateEnd
    };
    dispatch({ type: CHECK_AVAILABILITY_START });
    axiosWithEnv().post('/api/reservations/availability/all', daterange)
    .then(res => {
        dispatch({ type: CHECK_AVAILABILITY_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: CHECK_AVAILABILITY_FAILURE})
    })
}

// get all reservations (admin)
export const GET_ALL_RESERVATIONS_START = 'GET_ALL_RESERVATIONS_START';
export const GET_ALL_RESERVATIONS_SUCCESS = 'GET_ALL_RESERVATIONS_SUCCESS';
export const GET_ALL_RESERVATIONS_FAILURE = 'GET_ALL_RESERVATIONS_FAILURE';

export const getAllReservations = () => dispatch => {
    dispatch({ type: GET_ALL_RESERVATIONS_START });
    axiosWithEnv().get('/api/reservations/')
    .then(res => {
        dispatch({ type: GET_ALL_RESERVATIONS_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: GET_ALL_RESERVATIONS_FAILURE })
    })
}

// get all reservations by user email (admin) ? can filter it in ui

// get all reservations by daterange (admin) ? can filter it in UI?

// get upcoming reservations
export const GET_UPCOMING_START = 'GET_UPCOMING_START';
export const GET_UPCOMING_SUCCESS = 'GET_UPCOMING_SUCCESS';
export const GET_UPCOMING_FAILURE = 'GET_UPCOMING_FAILURE';

export const getUpcomingReservations = (email) => dispatch => {
    let renterEmail = {
        email: email
    }
    dispatch({type: GET_UPCOMING_START});
    axiosWithEnv().post('/api/reservations/upcoming', renterEmail)
    .then(res => {
        console.log(res.data)
        dispatch({ type: GET_UPCOMING_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({ type: GET_UPCOMING_FAILURE })
    });
};

// get past reservations
export const GET_PAST_START = 'GET_PAST_START';
export const GET_PAST_SUCCESS = 'GET_PAST_SUCCESS';
export const GET_PAST_FAILURE = 'GET_PAST_FAILURE';

export const getPastReservations = (email) => dispatch => {
    let renterEmail = {
        // email: 'brothervoodoo@marvel.com' 
        // for testing delete after mvp ☝️
        email: email
    }
    dispatch({type: GET_PAST_START });
    axiosWithEnv().post('/api/reservations/past', renterEmail )
    .then(res => {
        dispatch({ type: GET_PAST_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({ type: GET_PAST_FAILURE })
        console.log(err)
    });
};
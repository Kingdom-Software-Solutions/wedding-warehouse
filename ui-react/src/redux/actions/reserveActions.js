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
    const daterange ={ start: reserveStart , end: reserveEnd}
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
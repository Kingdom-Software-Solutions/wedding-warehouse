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
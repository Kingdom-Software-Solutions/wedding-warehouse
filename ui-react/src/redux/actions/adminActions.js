// Filter Reservations
export const RESERVATION_FILTER_START = 'RESERVATION_FILTER_START';
export const RESERVATION_FILTER_SUCCESS = 'RESERVATION_FILTER_SUCCESS';
export const RESERVATION_FILTER_FAILURE = 'RESERVATION_FILTER_FAILURE';

export const filterReservations = (filteredArray) => dispatch => {
    // dispatch({type: RESERVATION_FILTER_START});
    console.log(filteredArray,'<= Array passed to actions')
    dispatch({type: RESERVATION_FILTER_SUCCESS, payload: filteredArray})
    // dispatch({ type: RESERVATION_FILTER_FAILURE })
};

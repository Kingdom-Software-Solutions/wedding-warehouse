import {
    RESERVE_ITEM_START,
    RESERVE_ITEM_SUCCESS,
    RESERVE_ITEM_FAILURE,
    SET_DATES,
    RESERVE_AVAILABILITY_START,
    RESERVE_AVAILABILITY_SUCCESS,
    RESERVE_AVAILABILITY_FAILURE
} from '../actions/reserveActions';

const initialState = {
    isReserving: false,
    isChecking: false,
    // state for inventory modal
    dates: {
        pickUp: new Date().toISOString().split('T')[0],
        returnal: new Date().toISOString().split('T')[0] 
    },
    conflicts: [],
    error: ""

};

export const reserveReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case RESERVE_ITEM_START:
            return {
                ...state,
                isReserving: true
            };
        case RESERVE_ITEM_SUCCESS:
            return {
                ...state,
                isReserving: false
            }
        case RESERVE_ITEM_FAILURE:
            return {
                ...state,
                isReserving: false
            }
        case SET_DATES:
            let { start, end } = payload;
            return {
                ...state,
                pickUp: start,
                returnal: end
            }
        case RESERVE_AVAILABILITY_START:
            return {
                ...state,
                isChecking: true
            }
        case RESERVE_AVAILABILITY_SUCCESS:
            return {
                ...state,
                isChecking: false,
                conflicts: payload
            }
        case RESERVE_AVAILABILITY_FAILURE:
            return {
                ...state,
                isChecking: false,
                error: "Error checking availability"
            }
        default:
            return state
    }
}
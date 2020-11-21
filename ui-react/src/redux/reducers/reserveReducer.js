import {
    RESERVE_ITEM_START,
    RESERVE_ITEM_SUCCESS,
    RESERVE_ITEM_FAILURE,
    SET_DATES,
    CHECK_AVAILABILITY_START,
    CHECK_AVAILABILITY_SUCCESS,
    CHECK_AVAILABILITY_FAILURE,
    GET_UPCOMING_START,
    GET_UPCOMING_SUCCESS,
    GET_UPCOMING_FAILURE,
    GET_PAST_START,
    GET_PAST_SUCCESS,
    GET_PAST_FAILURE
} from '../actions/reserveActions';

const initialState = {
    isReserving: false,
    isChecking: false,
    isCalling: false,
    // state for inventory modal
    dates: {
        pickUp: new Date().toISOString().split('T')[0],
        returnal: new Date().toISOString().split('T')[0] 
    },
    conflicts: [],
    reservations: [], 
    error: ""

};

export const reserveReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log(type)
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
        case CHECK_AVAILABILITY_START:
            return {
                ...state,
                isChecking: true
            }
        case CHECK_AVAILABILITY_SUCCESS:
            return {
                ...state,
                isChecking: false,
                conflicts: payload
            }
        case CHECK_AVAILABILITY_FAILURE:
            return {
                ...state,
                isChecking: false,
                error: "Error checking availability"
            }
        case GET_UPCOMING_START:
            return {
                ...state,
                isCalling: true
            }
        case GET_UPCOMING_SUCCESS:
            return {
                ...state,
                isCalling: false,
                reservations: payload
            }
        case GET_UPCOMING_FAILURE:
        return {
            ...state,
            isCalling: false,
            error: "Error getting upcoming reservations"
        }
        case GET_PAST_START:
            return {
                ...state,
                isCalling: true
            }
        case GET_PAST_SUCCESS:
            return {
                ...state,
                isCalling: false,
                reservations: payload
            }
        case GET_PAST_FAILURE:
        return {
            ...state,
            isCalling: false,
            error: "Error getting past reservations"
        }
        default:
            return state
    }
}
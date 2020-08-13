import {
    RESERVE_ITEM_START,
    RESERVE_ITEM_SUCCESS,
    RESERVE_ITEM_FAILURE
} from '../actions/reserveActions';

const initialState = {
    isReserving: false
};

export const reserveReducer = (state = initialState, action) => {
    switch(action){
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
        default:
            return state
    }
}
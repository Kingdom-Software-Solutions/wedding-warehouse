import {
    ADD_ITEM,
    REMOVE_ITEM,
    CLEAR_CART
} from '../actions/cartActions';

import { initialState } from './cartInitialState';

export const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;
    const { items } = state;
    switch(type){
        case ADD_ITEM:
            items.push(payload)
        case REMOVE_ITEM:
            // should be handled in action or no? Start with this
            const updated = items.filter(item => item.id !== payload)
            return {
                ...state,
                items: updated
            }
        case CLEAR_CART:
            return{
                ...state,
                items: []
            }
        default:
            return state
    }
}


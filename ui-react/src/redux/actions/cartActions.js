// import { axiosWithEnv } from "../../utils/axiosWithEnv";

// add item to cart
export const ADD_ITEM = 'ADD_ITEM';
// export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
// export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

// pass an object with all the item
export const addToCart = (item) => dispatch =>{
    dispatch({ type: ADD_ITEM , payload: item });
    // dispatch({ type: ADD_ITEM_SUCCESS, payload: item });       
};

// remove item from cart
export const REMOVE_ITEM = 'REMOVE_ITEM';
// export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
// export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

// takes an item id
export const removeFromCart = (id) => dispatch =>{
    dispatch({ type: REMOVE_ITEM, payload: id });
    // dispatch({ type: REMOVE_ITEM_SUCCESS});        
    // dispatch({ type: ADD_ITEM_FAILURE });        
};

// clear cart
export const CLEAR_CART = 'CLEAR_CART';

export const clearCart = () => dispatch => {
    dispatch({type: CLEAR_CART })
}
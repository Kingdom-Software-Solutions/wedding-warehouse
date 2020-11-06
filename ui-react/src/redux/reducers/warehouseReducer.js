// Warehouse State
import {
    ADD_DEPT_START,
    ADD_DEPT_SUCCESS,
    ADD_DEPT_FAILURE,
    // UPDATE_DEPT_START,
    // UPDATE_DEPT_SUCCESS,
    // UPDATE_DEPT_FAILURE,
    GET_ALL_DEPT,
    GET_ALL_DEPT_SUCCESS,
    GET_ALL_DEPT_FAILURE,
    GET_DEPT,
    GET_DEPT_SUCCESS,
    GET_DEPT_FAILURE,
    ADD_ITEM_START,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    UPDATE_ITEM_START,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    DELETE_ITEM_START,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
    GET_ALL_ITEMS,
    GET_ALL_ITEMS_SUCCESS,
    GET_ALL_ITEMS_FAILURE,
    GET_ITEM,
    GET_ITEM_SUCCESS,
    GET_ITEM_FAILURE
} from '../actions/warehouseActions'
import { initialState } from './warehouseInitial';

export const warehouseReducer = (state = initialState, action) =>{
    // console.log("PAYLOAD TO REDUCER", action.payload)
    switch (action.type) {
        // dept start
        case ADD_DEPT_START:
            return {
                ...state,
                isPosting: true
            }
        case ADD_DEPT_SUCCESS:
            return {
                ...state,
                isPosting: false
            }
        case ADD_DEPT_FAILURE:
            return {
                ...state,
                error: "Error Adding Department",
                isPosting: false
            };
        case GET_ALL_DEPT:
            return {
                ...state,
                isFetching: true
            }
        case GET_ALL_DEPT_SUCCESS:
            return {
                ...state,
                departments: action.payload,
                isFetching: false
            }
        case GET_ALL_DEPT_FAILURE:
            return {
                ...state,
                error: "Error Getting Departments",
                isFetching: false
            };
        case GET_DEPT:
            return {
                ...state,
                isFetching: true
            }
        case GET_DEPT_SUCCESS:
            return {
                ...state,
                singleDept: action.payload,
                isFetching: false
            }
        case GET_DEPT_FAILURE:
            return {
                ...state,
                error: "Error Getting This Department",
                isFetching: false
            }        
        // item start
        case ADD_ITEM_START:
            return {
                ...state,
                isPosting: true
            }
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                isPosting: false
            }
        case ADD_ITEM_FAILURE:
            return {
                ...state,
                error: "Error Adding Item",
                isPosting: false
            }
        case GET_ALL_ITEMS:
            return {
                ...state,
                isPosting: true
            }
        case GET_ALL_ITEMS_SUCCESS:
            return {
                ...state,
                items: [...action.payload],
                isPosting: false
            }
        case GET_ALL_ITEMS_FAILURE:
            return {
                ...state,
                error: "Error Getting Items",
                isPosting: false
            };

        case GET_ITEM:
            return {
                ...state,
                isPosting: true
            }
        case GET_ITEM_SUCCESS:
            return {
                ...state,
                singleItem: action.payload,
                isPosting: false
            }
        case GET_ITEM_FAILURE:
            return {
                ...state,
                error: "Error Getting Item",
                isPosting: false
            };
        case DELETE_ITEM_START:
            return{
                ...state,
                isDeleting: true
            }
        case DELETE_ITEM_SUCCESS:
            return{
                ...state,
                message: "Item successfully deleted!",
                isDeleting: false
            }
        case DELETE_ITEM_FAILURE:
            return{
                ...state,
                error: "Error deleting message",
                isDeleting: false
            }
        case UPDATE_ITEM_START:
            return{
                ...state,
                isUpdating: true
            }
        case UPDATE_ITEM_SUCCESS:
            return{
                ...state,
                message: "Item successfully updated!",
                isUpdating: false
            }
        case UPDATE_ITEM_FAILURE:
            return{
                ...state,
                error: "Error updating message",
                isUpdating: false
            }
        default:
          return state
    }    
}
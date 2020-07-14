// Warehouse State
import {
    ADD_DEPT_START,
    ADD_DEPT_SUCCESS,
    ADD_DEPT_FAILURE,
    UPDATE_DEPT_START,
    UPDATE_DEPT_SUCCESS,
    UPDATE_DEPT_FAILURE,
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
    GET_ITEM_SUCESS,
    GET_ITEM_FAILURE
} from '../actions/warehouseActions'
import { initialState } from './warehouseInitial';

export const warehouseReducer = (state = initialState, action) =>{
    switch (action.type) {
        default:
          return state
    }    
}
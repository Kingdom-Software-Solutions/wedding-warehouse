import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { axiosWithEnv } from '../../utils/axiosWithEnv';

// create a department
export const ADD_DEPT_START = 'ADD_DEPT_START';
export const ADD_DEPT_SUCCESS = 'ADD_DEPT_SUCCESS';
export const ADD_DEPT_FAILURE = 'ADD_DEPT_FAILURE';

export const addDept = newDept => dispatch => {
    dispatch({ type: ADD_DEPT_START});
    axiosWithAuth().post("/api/deptartments")
    .then(res => {
        console.log('Add dept res', res);
        dispatch({ type: ADD_DEPT_SUCCESS });
    })
    .catch(error => {
        console.log('Add dept error', error);
        dispatch({ type: ADD_DEPT_FAILURE});
    })
};

// update a department
export const UPDATE_DEPT_START = 'UPDATE_DEPT_START';
export const UPDATE_DEPT_SUCCESS = 'UPDATE_DEPT_SUCCESS';
export const UPDATE_DEPT_FAILURE = 'UPDATE_DEPT_FAILURE';

export const updateDept = (id, updatedDept) => dispatch => {

};

// add item to inventory
export const ADD_ITEM_START = 'ADD_ITEM_START';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const addItem = newItem => dispatch => {

};

// update an item
export const UPDATE_ITEM_START = 'UPDATE_ITEM_START';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const updateItem = (id, updatedItem) => dispatch => {

}

// delete an item
export const DELETE_ITEM_START = 'DELETE_ITEM_START';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

// get all items: Should these be handled here or in component?
export const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
export const GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS';
export const GET_ALL_ITEMS_FAILURE = 'GET_ALL_ITEMS_FAILURE';

// get a single item
export const GET_ITEM = 'GET_ITEM';
export const GET_ITEM_SUCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';
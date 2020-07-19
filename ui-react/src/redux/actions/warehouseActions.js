import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { axiosWithEnv } from '../../utils/axiosWithEnv';


// create a department
export const ADD_DEPT_START = 'ADD_DEPT_START';
export const ADD_DEPT_SUCCESS = 'ADD_DEPT_SUCCESS';
export const ADD_DEPT_FAILURE = 'ADD_DEPT_FAILURE';

export const addDept = newDept => dispatch => {
    dispatch({ type: ADD_DEPT_START});
    axiosWithAuth().post("/api/departments", newDept)
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

export const updateDept = (id, deptChanges) => dispatch => {
    dispatch({ type: UPDATE_DEPT_START });
    axiosWithAuth().put(`/api/departments/${id}`)
    .then(res => {
        console.log('Update dept res', res);
        dispatch({ type: UPDATE_DEPT_SUCCESS, payload: deptChanges });
    })
    .catch(error => {
        console.log('Update dept error', error);
        dispatch({ type: UPDATE_DEPT_FAILURE });
    })
};

// get all departments
export const GET_ALL_DEPT = 'GET_ALL_DEPT';
export const GET_ALL_DEPT_SUCCESS = 'GET_ALL_DEPT_SUCCESS'
export const GET_ALL_DEPT_FAILURE = 'GET_ALL_DEPT_FAILURE'

export const getAllDepts = () => dispatch =>{
    dispatch({ type: GET_ALL_DEPT });
    axiosWithEnv().get("/api/departments")
    .then(res => {
        console.log('Get all dept res', res)
        dispatch({type: GET_ALL_DEPT_SUCCESS, payload: res.data })
    })
    .catch(error => {
        console.log('Get all dept error', error)
        dispatch({type: GET_ALL_DEPT_FAILURE})
    })
}

// get a single department
export const GET_DEPT = 'GET_DEPT';
export const GET_DEPT_SUCCESS = 'GET_DEPT_SUCCESS'
export const GET_DEPT_FAILURE = 'GET_DEPT_FAILURE'

export const getDept = (id) => dispatch => {
    dispatch({ type: GET_DEPT });
    axiosWithEnv().get(`/api/departments/${id}`)
    .then(res => {
        console.log('Get dept res', res)
        dispatch({type: GET_DEPT_SUCCESS, payload: res.data })
    })
    .catch(error => {
        console.log('Get dept error', error)
        dispatch({type: GET_DEPT_FAILURE})
    })
}

// add item to inventory
export const ADD_ITEM_START = 'ADD_ITEM_START';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const addItem = (newItem, token) => dispatch => {
    console.log(newItem, token)
    dispatch({ type: ADD_ITEM_START });
    axiosWithAuth(token).post('/api/inventory', newItem)
    .then(res => {
        console.log('Add item res', res);
        dispatch({ type: ADD_ITEM_SUCCESS, payload: newItem });
    })
    .catch(error => {
        console.log('Add item error', error);
        dispatch({ type: ADD_ITEM_FAILURE });
    });
};

// update an item
export const UPDATE_ITEM_START = 'UPDATE_ITEM_START';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const updateItem = (id, updatedItem) => dispatch => {
    dispatch({ type: UPDATE_ITEM_START });
    axiosWithAuth().put(`/api/inventory/${id}`)
    .then(res => {
        console.log('Update inventory res', res);
        dispatch({ type: UPDATE_ITEM_SUCCESS, payload: updatedItem });
    })
    .catch(error => {
        console.log('Update inventory error', error);
        dispatch({ type: UPDATE_ITEM_FAILURE });
    })
}

// delete an item
export const DELETE_ITEM_START = 'DELETE_ITEM_START';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const deleteItem = (id) => dispatch => {
    dispatch({ type: DELETE_ITEM_START });
    axiosWithAuth().delete(`/api/inventory/${id}`)
    .then(res => {
        console.log('Delete item res', res);
        dispatch({ type: DELETE_ITEM_SUCCESS });
    })
    .catch(error => {
        console.log('delete item error', error);
        dispatch({ type: DELETE_ITEM_FAILURE });
    });
}


// get all items: Should these be handled here or in component?
export const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
export const GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS';
export const GET_ALL_ITEMS_FAILURE = 'GET_ALL_ITEMS_FAILURE';

export const getAllItems = () => dispatch => {
    dispatch({ type: GET_ALL_ITEMS });
    axiosWithEnv().get("/api/inventory")
    .then(res => {
        console.log('Get all items res', res)
        dispatch({type: GET_ALL_ITEMS_SUCCESS , payload: res.data })
    })
    .catch(error => {
        console.log('Get all items error');
        dispatch({ type: GET_ALL_ITEMS_FAILURE })
    });
}

// get a single item
export const GET_ITEM = 'GET_ITEM';
export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';

export const getItem = (id) => dispatch => {
    dispatch({ type: GET_ITEM });
    axiosWithEnv().get(`/api/inventory/${id}`)
    .then(res => {
        console.log('Get item res', res)
        dispatch({type: GET_ITEM_SUCCESS , payload: res.data })
    })
    .catch(error => {
        console.log('Get item error');
        dispatch({ type: GET_ITEM_FAILURE })
    });
}
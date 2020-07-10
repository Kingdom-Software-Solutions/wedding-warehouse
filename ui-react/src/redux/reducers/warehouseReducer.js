// Warehouse State
const initialState = {
    isFetching: false,
    isPosting: false,
    readyToMount: false,
    items: [],
    singleItem: {
        id: 0,
        itemName: "",
        description: ""
    }
}

export const warehouseReducer = (state, action) =>{
    switch (action.type) {
        default:
          return state
    }    
}
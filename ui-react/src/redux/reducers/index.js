import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { warehouseReducer } from './warehouseReducer';
import { reserveReducer } from './reserveReducer';
import { cartReducer } from './cartReducer'

export const rootReducer = combineReducers({
    userReducer,
    warehouseReducer,
    reserveReducer,
    cartReducer
});
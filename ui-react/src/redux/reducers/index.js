import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { warehouseReducer } from './warehouseReducer';
import { reserveReducer } from './reserveReducer'

export const rootReducer = combineReducers({
    userReducer,
    warehouseReducer,
    reserveReducer
});